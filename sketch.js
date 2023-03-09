var trex, trexImg;
var chao;
var chaoImg;
var chaoFake;
var nuvem, nuvemImage;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  //carrega imagens, animações, sons etc...
  trexImg = loadAnimation("trex3.png", "trex4.png");
  chaoImg = loadImage("ground2.png");
  nuvemImage = loadImage("cloud.png");

  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
}

function setup() {
  //função de configuração
  createCanvas(600, 200);

  trex = createSprite(50, 170, 30, 30);
  trex.addAnimation("running", trexImg);
  trex.scale = 0.5;

  chao = createSprite(300, 190, 600, 20);
  chao.addImage(chaoImg);
  chao.velocityX = -5;

  chaoFake = createSprite(300, 200, 600, 20);
  chaoFake.visible = false;

  // var rand = Math.round(random(1, 10));
  // console.log(rand);
}

function draw() {
  background("white");

  textFont("fantasy");
  textSize(20);
  text("Score: " + score, 480, 30);

  if (gameState === PLAY) {
    score = score + Math.round(frameCount / 60);

    if (keyDown("space") && trex.isTouching(chao)) {
      trex.velocityY = -13;
    }
  } else if (gameState === END) {
  }

  //gravidade
  trex.velocityY = trex.velocityY + 0.9;

  //chao infinito
  if (chao.x < 0) {
    chao.x = chao.width / 2;
  }

  gerarNuvens();

  obstacles();

  trex.collide(chaoFake);

  drawSprites();
}

function gerarNuvens() {
  if (frameCount % 60 === 0) {
    nuvem = createSprite(620, Math.round(random(50, 150)), 10, 10);
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImage);
    nuvem.scale = 0.5;
    nuvem.lifetime = 220;

    //depth significa camada
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}

function obstacles() {
  if (frameCount % 60 === 0) {
    cacto = createSprite(620, 175, 30, 30);
    cacto.velocityX = -5;

    var num = Math.round(random(1, 6));

    switch (num) {
      case 1:
        cacto.addImage(obs1);
        break;
      case 2:
        cacto.addImage(obs2);
        break;
      case 3:
        cacto.addImage(obs3);
        break;
      case 4:
        cacto.addImage(obs4);
        break;
      case 5:
        cacto.addImage(obs5);
        break;
      case 6:
        cacto.addImage(obs6);
        break;
    }

    cacto.scale = 0.5;
  }
}
