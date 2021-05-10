<template>
  <div>
    <canvas width="400" height="400" ref="game"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: 16,
      snake: {
        x: 160,
        y: 160,
        dx: 16,
        dy: 0,
        cells: [],
        maxCells: 4,
      },
      count: 0,
      apple: {
        x: 320,
        y: 320,
      },
    };
  },
  methods: {
    main() {
      const that = this;
      document.addEventListener("keydown", function (e) {
        if (e.code === "ArrowLeft" && that.snake.dx === 0) {
          that.snake.dx = -that.grid;
          that.snake.dy = 0;
        } else if (e.code === "ArrowUp" && that.snake.dy === 0) {
          that.snake.dy = -that.grid;
          that.snake.dx = 0;
        } else if (e.code === "ArrowRight" && that.snake.dx === 0) {
          that.snake.dx = that.grid;
          that.snake.dy = 0;
        } else if (e.code === "ArrowDown" && that.snake.dy === 0) {
          that.snake.dy = that.grid;
          that.snake.dx = 0;
        }
      });
      
      window.requestAnimationFrame(this.loop);

    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    loop() {
      window.requestAnimationFrame(this.loop);
      var canvas = this.$refs.game;
      var ctx = canvas.getContext("2d");

      if (++this.count < 4) {
        return;
      }

      this.count = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.snake.x += this.snake.dx;
      this.snake.y += this.snake.dy;

      if (this.snake.x < 0) {
        this.snake.x = canvas.width - this.grid;
      } else if (this.snake.x >= canvas.width) {
        this.snake.x = 0;
      }

      if (this.snake.y < 0) {
        this.snake.y = canvas.height - this.grid;
      } else if (this.snake.y >= canvas.height) {
        this.snake.y = 0;
      }

      this.snake.cells.unshift({
        x: this.snake.x,
        y: this.snake.y,
      });

      if (this.snake.cells.length > this.snake.maxCells) {
        this.snake.cells.pop();
      }

      ctx.fillStyle = "red";
      ctx.fillRect(
        this.apple.x,
        this.apple.y,
        this.grid - 1,
        this.grid - 1
      );

      ctx.fillStyle = "green";
      const that = this;
      this.snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, that.grid - 1, that.grid - 1);

        if (cell.x === that.apple.x && cell.y === that.apple.y) {
          that.snake.maxCells++;

          that.apple.x = that.getRandomInt(0, 25) * that.grid;
          that.apple.y = that.getRandomInt(0, 25) * that.grid;
        }

        for (var i = index + 1; i < that.snake.cells.length; i++) {
          if (
            cell.x === that.snake.cells[i].x &&
            cell.y === that.snake.cells[i].y
          ) {
            that.snake.x = 160;
            that.snake.y = 160;
            that.snake.cells = [];
            that.snake.maxCells = 4;
            that.snake.dx = that.grid;
            that.snake.dy = 0;

            that.apple.x = that.getRandomInt(0, 25) * that.grid;
            that.apple.y = that.getRandomInt(0, 25) * that.grid;
          }
        }
      });
    },
  },
  mounted() {
    if (process.browser) this.main();
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

body {
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  border: 1px solid white;
}
</style>