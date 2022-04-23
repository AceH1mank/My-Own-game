var hotAirBallon, hotAirBallonImg
var bgImg
var bg
var invisibleGround
var obsBottom1Img, obsBottom2Img, obsBottom3Img, obsTop1Img, obsTop2Img
var gameOverImg, ResetImg
var gameOver, Reset
var PLAY=1
var END = 0
var gameState = PLAY
var topObsGrp
var bottomObsgrp
var score = 0
 
function preload() {
bgImg = loadImage("assets/bg.png")
hotAirBallonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsBottom1Img = loadImage("assets/obsBottom1.png")
obsBottom2Img = loadImage("assets/obsBottom2.png")
obsBottom3Img = loadImage("assets/obsBottom3.png")
obsTop1Img = loadImage("assets/obsTop1.png")
obsTop2Img = loadImage("assets/obsTop2.png")
gameOverImg=loadImage("assets/gameOver.png")
ResetImg = loadImage("assets/restart.png")
}

function setup(){
createCanvas(1200,600)
bg = createSprite(300,490,40,40)
bg.addImage(bgImg)
bg.scale = 1.5

hotAirBallon = createSprite(50,510,20,60)
hotAirBallon.addAnimation("balloonRotate", hotAirBallonImg)
hotAirBallon.scale = 0.3

Reset = createSprite(600,200)
Reset.addImage(ResetImg)
Reset.visible = false

gameOver = createSprite(600,300)
gameOver.addImage(gameOverImg)
gameOver.visible = false



invisibleGround = createSprite(300,590,width,3)
invisibleGround.visible = false

topObsGrp = new Group()
bottomObsgrp = new Group()

}



function draw(){

background("yellow")

if(gameState === PLAY){
     hotAirBallon.collide(invisibleGround)
     hotAirBallon.depth += 1

     score = score+Math.round(frameCount/600)
    
    if(keyDown("SPACE")){
       hotAirBallon.velocityY = -5
    }
    
    hotAirBallon.velocityY = hotAirBallon.velocityY+1
     spawnObsTop()
     spawnBbottomObs()
    if(topObsGrp.isTouching(hotAirBallon) || bottomObsgrp.isTouching(hotAirBallon) ){
      gameState = END
    }
}

if(gameState === END){
  Reset.visible = true
  gameOver.visible = true

  gameOver.depth = gameOver.depth+1
  Reset.depth = Reset.depth+1

  

  topObsGrp.setVelocityXEach(0)
  bottomObsgrp.setVelocityXEach(0)
  hotAirBallon.visible = false
  topObsGrp.setLifetimeEach(-1)
  bottomObsgrp.setLifetimeEach(-1)

  if(mousePressedOver(Reset)){
    reset();
  }
}


drawSprites()

fill("red")
textSize (34)
text ("score : "+ score,1000,200)


}

function spawnObsTop(){
 if(frameCount%100 === 0){
  var Obstop = createSprite(1210,random(10,100),40,50)
  Obstop.velocityX =- 4
  Obstop.scale = 0.12
  var ran = Math.round(random(1,2))

   if(ran === 1){
     Obstop.addImage(obsTop1Img)

     
   }
   else{
     Obstop.addImage(obsTop2Img)
   }

   Obstop.lifetime = 500
   topObsGrp.add(Obstop)

 }
}

function spawnBbottomObs(){
  if( frameCount%110 === 0){
    var bottomObs = createSprite(1210,480,40,50)
    bottomObs.velocityX = -4
    bottomObs.scale = 0.12
   var ranbottom = Math.round(random(1,3))

   if( ranbottom === 1){
     bottomObs.addImage(obsBottom1Img)
     
   }
   else if(ranbottom === 2){
     bottomObs.addImage(obsBottom2Img)
   }
   else{
     bottomObs.addImage(obsBottom3Img)
   }
   bottomObs.lifetime = 500
   bottomObsgrp.add(bottomObs)
  }
}

function reset(){
  gameState = PLAY
  hotAirBallon.visible = true
  Reset.visible = false
  gameOver.visible = false
  
  score = -0

  topObsGrp.destroyEach()
  bottomObsgrp.destroyEach()
}
