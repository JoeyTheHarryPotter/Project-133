img = "";
status = "";
objects = [];

function back(){
    window.location = "index.html";
}

function preload(){
    img = loadImage('Apple.jpg');
}

function setup(){
    canvas = createCanvas(640, 640);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML="Status: Detecting Object(s)";
}

function draw(){
    image(img, 0, 0, 640, 640);

    if(status != ""){
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="<h3 class='btn btn-success' style='font-size: 25px;'>Status: Object(s) Detected</h3>";
            document.getElementById("status2").innerHTML="CocoSsd has successfully detected 1 out of 1 object(s) from the image.";
            fill('#ff0000');
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");

    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}