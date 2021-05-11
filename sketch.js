var PLAY = 1;
var END = 0;
var gameState = PLAY;
var swimmer;
var invisibleGround;
var sharksGroup,stonesGroup,octopusGroup;
var octopus,shark,stone;
var score=0;
var gameOver, restart;

function preload(){
    swimmerImage = loadImage("swimmer.png");
    octopusImage = loadImage("octopus.png");
    sharkImage = loadImage("shark.png");
    stoneImage = loadImage("stone 1.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
    waterImg = loadImage("water.png")
  }

  function setup() {
    createCanvas(600, 300);
    swimmer = createSprite(70,180,20,50);
    swimmer.addImage(swimmerImage);
    swimmer.scale = 0.5;
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    gameOver.visible = false;
    restart.visible = false;
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    invisibleGround.x = invisibleGround.width /2;
    invisibleGround.velocityX = -(6 + 3*score/100);
    sharksGroup = new Group();
    stonesGroup = new Group();
    octopusGroup = new Group();
    score = 0;
  }
  
  function draw() {
    background(waterImg);
    fill("black")
    stroke(15)
    textSize(18)
    text("Score: "+ score, 500,50);
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      invisibleGround.velocityX = -(6 + 3*score/100);
      if(keyDown("space")) {
        swimmer.velocityY = -12;
      }
      swimmer.velocityY = swimmer.velocityY + 0.8
      if (invisibleGround.x < 0){
        invisibleGround.x = invisibleGround.width/2;
      }
      //swimmer.collide(invisibleGround);
      spawnOctopus();
      spawnShark();
      spawnStone();
      if(octopusGroup.isTouching(swimmer)){
       gameState = END;
      }
      
      if(stonesGroup.isTouching(swimmer)){
        gameState = END;
       }

       if(sharksGroup.isTouching(swimmer)){
        gameState = END;
       }
    }
    else if (gameState === END) {
      invisibleGround.velocityX = 0;
      swimmer.velocityY = 0;
      octopusGroup.setVelocityXEach(0);
      sharksGroup.setVelocityXEach(0);
      stonesGroup.setVelocityXEach(0);
      octopusGroup.setLifetimeEach(-1);
      sharksGroup.setLifetimeEach(-1);
      stonesGroup.setLifetimeEach(-1);
      reset();
      }
    drawSprites();
  }

  function spawnShark() {
    if (frameCount % 120 === 0) {
    var shark = createSprite(600,100,40,10);
    shark.y = Math.round(random(50,250));
    shark.addImage(sharkImage);
    shark.scale = 0.3;
    shark.velocityX = -3;
    shark.lifetime = 200;
    shark.depth = swimmer.depth;
    swimmer.depth = swimmer.depth + 1;
    sharksGroup.add(shark);
    }
  }

  function spawnStone() {
    if (frameCount % 160 === 0) {
    var stone = createSprite(600,200,40,10);
    stone.y = Math.round(random(50,250));
    stone.addImage(stoneImage);
    stone.scale = 0.5;
    stone.velocityX = -3;
    stone.lifetime = 200;
    stone.depth = swimmer.depth;
    swimmer.depth = swimmer.depth + 1;
    stonesGroup.add(stone);
    }
  }

  function spawnOctopus() {
    if (frameCount % 200 === 0) {
    var octopus = createSprite(600,300,40,10);
    octopus.y = Math.round(random(50,250));
    octopus.addImage(octopusImage);
    octopus.scale = 0.5;
    octopus.velocityX = -3;
    octopus.lifetime = 200;
    octopus.depth = swimmer.depth;
    swimmer.depth = swimmer.depth + 1;
    octopusGroup.add(octopus);
    }
  }

  function reset(){
    fill("black")
    stroke(20)
    textSize(25)
    text("Swimmer touching monster",50,50)
    text("Game Over,Reload tab to play again",50,80)
    text("Reload tab to play again",50,110)
    }