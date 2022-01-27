const express = require('express');
const fs = require('file-system');
const apicache = require('apicache');
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require('helmet');
const Gameboy = require('serverboy');

// Create Api instance
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy({
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["*"],
        "script-src": ["'self'", "*.jsdelivr.net", "*.scarvite.de", "scarvite.de", "'unsafe-eval'", "'unsafe-inline'"],
        "img-src": ["'self'", "*.jsdelivr.net", "*.scarvite.de", "scarvite.de", "'unsafe-eval'", "'unsafe-inline'"],
    },
})
);

app.use(cors());
app.use(express.static('../../files'));

// Socket.Io

io.on('connection', socket => {
    console.log(`conn-main id: ${socket.id}`);
    socket.on('init', () => {
        console.log("init")
    })

    socket.on('disconnect', () => {
        console.log(`disco-main id: ${socket.id}`);
    });

})

// Gameboy

const gameboyIO = io.of("/gameboy");
let sessions = {};

gameboyIO.on('connection', socket => {
    console.log("conn-gameboy");
    socket.on('init', msg => {
        console.log("init")
        if (!sessions[socket.id]) {
            sessions[socket.id] = {};
            sessions[socket.id].gameboy = new Gameboy();
            let rom = fs.readFileSync("../../files/gb/pk-blue.gb"); //This Rom is just for Educational Purposes and will be removed later
            sessions[socket.id].gameboy.loadRom(rom);
            socket.emit("ready", { success: true })
            sessions[socket.id].interval = setInterval(() => {
                sessions[socket.id].gameboy.doFrame();
                sessions[socket.id].gameboy.doFrame();
                sessions[socket.id].gameboy.doFrame();
                sessions[socket.id].gameboy.doFrame();

                var nextscreen = sessions[socket.id].gameboy.getScreen();
                if(socket.screen !== nextscreen){
                    if(socket.screen) {
                        for (let index = 0; index < nextscreen.length; index++) {
                            const currentpixel = socket.screen[index]
                            const nextpixel = nextscreen[index];
                            if(currentpixel && currentpixel == nextpixel) nextscreen[index] = -1;
                        }
                    }
                    socket.screen = nextscreen;
                    socket.emit('image', socket.screen);
                }
            }, 1000 / 60)
        } else {
            //io.to(socket.id).emit("")
        }
    })

    socket.on('keyPress', key => {
        if (sessions[socket.id]) {
            sessions[socket.id].gameboy.pressKey(key);
        }
    })

    socket.on('saveFile', () => {
        if (sessions[socket.id]) {
            io.to(socket.id).emit('saveFile', sessions[socket.id].gameboy.getSaveData());
        }
    })

    socket.on('disconnect', () => {
        console.log(sessions)
        if (sessions[socket.id]){
            clearInterval(sessions[socket.id].interval); 
            delete sessions[socket.id];
         }
        console.log(sessions)
    });
})


// Require API routes
const authRoute = require('./routes/auth');
const projectRoute = require('./routes/projects');

// Import API Routes

app.use('/auth', authRoute);
app.use('/project', projectRoute);

app.get('/status', (req, res) => {
    res.sendStatus(200);
});

app.get('/cache/performance', (req, res) => {
    res.json(apicache.getPerformance())
});


// Export express app
module.exports = app