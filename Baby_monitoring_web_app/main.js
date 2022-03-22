
img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
  sound = new Audio('ringing_old_phone.mp3');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      

        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {

          if(objects.length = person){
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
          }

          else
          {
            document.getElementById("status").innerHTML = "Status : Baby Not Detected";
            Audio.play();
          }

          if(objects.length < 0)
          {
            document.getElementById("status").innerHTML = "Status : Baby Not Detected";
            Audio.play();
          }
        
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
