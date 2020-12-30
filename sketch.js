//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feedPet;
var addFood;
var fedTime;
var lastFed;
var foodObj;
var feedDog;
var addFoods;

function preload()
{
  //load images here
  dogImage=loadImage("dogImg.png");
  dogImage1=loadImage("dogImg1.png");
  happyDog=loadImage("dogImg copy.png");
  milkImage=loadImage("Milk.png");
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();

  dog=createSprite(700,300,5,5);
  dog.addImage(dogImage);
  dog.scale=0.2;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  for (var i = 40; i < 350; i=i+40) {
    var Milk = createSprite(i,200,10,30);
    Milk.addImage(milkImage);
    Milk.scale=0.1;
    }

    for (var i = 40; i < 350; i=i+40) {
      var Milk = createSprite(i,300,10,30);
      Milk.addImage(milkImage);
      Milk.scale=0.1;
      }

}




function draw() {  
  background("cyan");
  fill("black");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",350,30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  } else {
    text("Last Feed : "+ lastFed + "AM",350,30);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();   
  });

  drawSprites();

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dogImage1);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  }) 
}

function addFoods(){
  dog.addImage(happyDog);

  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}