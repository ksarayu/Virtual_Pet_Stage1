//Create variables here
var dog, happyDog;
var foodStock;
var foodS = 0;
var database;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  foodStock = database.ref("Food/foodLeft");
  foodStock.on("value", readStock);
  
  dog = createSprite(250, 320, 25, 25);
  dog.addImage(dogImage);
  dog.scale = 0.3;
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();

  fill("white");
  textSize(20);
  text("Food remaining: " + foodS, 160, 190);
  text("Note: Click on the up arrow to feed the dog", 60, 50)

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  var databaseRef = database.ref("Food");
  databaseRef.update({foodLeft : x});
}


