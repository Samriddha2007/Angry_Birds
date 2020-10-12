array1 = [1,2,3,4,5];
console.log(array1);
console.log(array1[2]);
array2 = [[1,2,3],[4,5,6],[7,8,9,10]];
console.log(array2);
console.log(array2[1][2]);
array2.push("Hello");
array2.pop();


const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint  = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg;
var platform; 
var log6;
var slingshot;

var score = 0;

function preload()
{
   getBackgroundIMG();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,height,1200,20)

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
    log6 = new Log(200,150,80, PI/2);

    bird = new Bird(200,80);

    platform = new Ground(150,350,300,200);
    slingshot = new Slingshot(bird.body,{x:200,y:80});
}

function draw()
{
    if(backgroundImg)
    {
      background(backgroundImg);
    }
    Engine.update(engine);

     fill("red");
     textSize(30);
     text("Score = "   + score, 1000,50);

    box1.display();
    box2.display();
    box3.display();
    box4.display();

    ground.display();

    pig1.display();
    pig1.score();
    pig3.display();
    pig3.score();

    log1.display();
    log3.display();
    box5.display();
    log4.display();
    log5.display();
   // log6.display();

    platform.display();

    bird.display();

    slingshot.display();
}

function mouseDragged()
{
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
}

function mouseReleased()
{
    slingshot.fly();
}

function keyPressed()
{
    if(keyCode == 32)
    {
        slingshot.attach(bird.body);
    }
}

async function getBackgroundIMG()
{
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);
    if(hour >= 06 && hour <= 16)
    {
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
}
