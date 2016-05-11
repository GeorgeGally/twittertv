// get image 
// break up into squares
// sort them according to light value
// get new image
// break up inot square and sort accoribg to brightness
var blocks = [];
var brights = [];
var blocksize = 20;
var img, temp_img;
function preload() {
  img = loadImage("images/cats/2.png");
}

function setup() {
  temp_img = createImage(blocksize, blocksize);
  createCanvas(window.innerWidth,window.innerHeight);
  getBlocks();
  for (var y = 0; y < window.innerHeight; y+=blocksize) {
    for (var x = 0; x < window.innerWidth; x+=blocksize) {
      temp_img = blocks[(y*x)+x];
      image(blocks[(y*x)+x],random(window.innerWidth), random(window.innerHeight), blocksize,blocksize);
      getAverageBrightness(temp_img);
    }
  }
}

function draw() {
  //image(img, 0, 0);
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}


function getBlocks(){
  
  image(img, 0, 0);
  for (var y = 0; y < window.innerHeight; y+=blocksize) {
    for (var x = 0; x < window.innerWidth; x+=blocksize) {
      //console.log(x+":"+y);
      temp_img = get(x, y, blocksize, blocksize);
      blocks[(y*x)+x] = temp_img;
      getAverageBrightness(temp_img);
    }
  }

}


// function sortBlocks(){
//   // get brightness

// }



function getAverageBrightness(img) {
  img.loadPixels();
  var b = 0;
    for (var i=0; i<img.pixels.length; i++) {
      c = img.pixels[i];
      //b += c;
      //console.log(c>>16&0xFF);
      //console.log(c>>8&0xFF);
    //var c = brightness(img.pixels[i]);
      b += brightness(c);
    }
  if (b > 0) b = round(img.pixels.length/b);
  console.log(b);
//   return b;
 }

// function getAverageColor(img) {
//   img.loadPixels();
//   int r = 0, g = 0, b = 0;
//   for (int i=0; i<img.pixels.length; i++) {
//     color c = img.pixels[i];
//     r += c>>16&0xFF;
//     g += c>>8&0xFF;
//     b += c&0xFF;
//   }
//   r /= img.pixels.length;
//   g /= img.pixels.length;
//   b /= img.pixels.length;
//   return color(r, g, b);
// }

