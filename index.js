const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const sclaedCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      //draw a block
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36));
}

const platformCollisionBLocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      //draw a block
      platformCollisionBLocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});

const gravity = 0.5;

const player = new Player({
  position: { x: 100, y: 300 },
  collisionBlocks,
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: "./img/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Run: {
      imageSrc: "./img/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "./img/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 5,
    },
    Fall: {
      imageSrc: "./img/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: "./img/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: "./img/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    JumpLeft: {
      imageSrc: "./img/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 5,
    },
    FallLeft: {
      imageSrc: "./img/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 5,
    },
  },
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + sclaedCanvas.height);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });
  platformCollisionBLocks.forEach((block) => {
    block.update();
  });

  player.update();

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 2;
    player.lastDirection = "right";
  } else if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.velocity.x = -2;
    player.lastDirection = "left";
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") player.switchSprite("Idle");
    else player.switchSprite("IdleLeft");
  }

  if (player.velocity.y < 0) {
    if (player.lastDirection === "right") player.switchSprite("Jump");
    else player.switchSprite("JumpLeft");
  } else if (player.velocity.y > 0) {
    if (player.lastDirection === "right") player.switchSprite("Fall");
    else player.switchSprite("FallLeft");
  }

  c.restore();
}

animate();

window.addEventListener("keydown", (event) => {
  console.log(event);
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -8;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  console.log(event);
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
