const { Router } = require('express');
const apicache = require('apicache');

let cache = apicache.middleware;

const router = Router();

router.get('/all', cache('60 minutes'), (req, res) => {
    res.send("all-projects");
})

router.get('/:id([0-9]+)', cache('60 minutes'), (req, res) => {
    res.send(req.params.id);
})

module.exports = router;