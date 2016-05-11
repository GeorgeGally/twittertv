/* @pjs preload="images/bball.jpg,images/bball2.jpg"; */


var blocks = [];
var final_blocks = [];
var brights[][];
var final_brights[][];
var sorted_blocks = [];
var blocksize = 40;

var img, temp_img;
var source_img, dest_img;
int blockCount;
int adjustbrightness=0;

void setup() {
  size(window.innerWidth,window.innerHeight);
  changeBlockSize(blocksize);
  // setUpSourceImage();
  // setUpDestImage();
  // background(255);
  // noStroke();
  // source_img.filter(DILATE);
  // tint(0, 153, 204);  // Tint blue
  // image(source_img, source_img.width,0);
  // image(dest_img, 0, dest_img.height);
  // showBlocks();
  // doMozaic();
 }

void draw() {

}

void changeBlockSize(int sz){
  blocksize = sz;
  setUpSourceImage();
  setUpDestImage();
  // console.log(sz);
  image(source_img, source_img.width,0);
  showBlocks();
  doMozaic();
}

void changeBrightness(int brt){
  loadPixels();
  for (int x = 0; x < img.width; x++) {
    for (int y = 0; y < img.height; y++ ) {
  r = red (source_img.pixels[loc]);
  g = green (source_img.pixels[loc]);
  adjustbrightness = brt;
  r += adjustbrightness;
  r = constrain(r, 0, 255);
  color c = color(r);
  source_img.pixels[y*width + x] = c;
     }
  }
  updatePixels();
}

function setUpSourceImage(){
  source_img = loadImage("images/bball2.jpg");
  blockCount = int(source_img.width/blocksize*source_img.height/blocksize);
  // console.log(blocksize);
  // console.log(source_img.height);
  //source_img.filter(GRAY);
  blocks = getBlocks(source_img);
  brights = new int [blockCount][];
  //arrayCopy(getBrights(source_img, blocks), brights);
  brights = getBrights(source_img, blocks);
  //console.log(brights);
  brights.sort(compareSecondColumn);
  brights.reverse();
}

function setUpDestImage(){
  dest_img = loadImage("images/bball.jpg");
  //dest_img.filter(GRAY);
  final_brights = new int [blockCount][];
  final_blocks = getBlocks(dest_img);
  //arrayCopy(getBrights(dest_img, final_blocks), final_brights);
  final_brights = getBrights(dest_img, final_blocks);
}



int[][] getBrights(_source, _blocks[]){
  int i = 0;
  int _brights[][] = new int [blockCount][];
  //console.log(blockCount);
  for (var y = 0; y < _source.height; y+=blocksize) {
    for (var x = 0; x < _source.width; x+=blocksize) {
      _brights[i] = {i, getAverageBrightness(blocks[i])};
      i++;
    }
  }
  return _brights;
}


function getAverageBrightness(img) {
  img.loadPixels();
  int r = 0, g = 0, b = 0;
    for (int i=0; i<img.pixels.length; i++) {
      color c = img.pixels[i];
      b+= brightness(c);
    }

  b = int(b/img.pixels.length);
  //console.log(b);
  return int(b);
}




function getBlocks(_source){
  console.log(blockCount);
  PImage _blocks = new Array(blockCount);
  image(_source, 0, 0);
  int i = 0;
  for (var y = 0; y < _source.height; y+=blocksize) {
    for (var x = 0; x < _source.width; x+=blocksize) {
      _blocks[i] = createImage(blocksize, blocksize);
      _blocks[i] = get(x, y, blocksize, blocksize);
      //_blocks[i].copy(_source, x, y, blocksize, blocksize);

      i++;
    }
  }
  background(255);
  return _blocks;

}

function showBlocks(){
  int i = 0;
  noStroke();
  for (var y = 0; y < source_img.height; y+=blocksize) {
    for (var x = 0; x < source_img.width; x+=blocksize) {
      //image(final_blocks[i],x, y, blocksize,blocksize);
      fill(final_brights[i][1]);
       // console.log(brights[i][1]);
      rect(x,y,blocksize,blocksize )    
      i++;
    }
  }
}

function showBrightness(){
    console.log(brights);
  int i = 0;
  for (var y = 0; y < source_img.height; y+=blocksize) {
    for (var x = 0; x < source_img.width; x+=blocksize) {
      image(final_blocks[i],x+source_img.width*2, y, blocksize,blocksize);
      //fill(brights[i][1]);
      //rect(x+source_img.width*2,y,blocksize,blocksize )
      i++;
    }
  }
}


function doMozaic(){
    int i = 0;
  for (var y = 0; y < source_img.height; y+=blocksize) {
    for (var x = 0; x < source_img.width; x+=blocksize) {
      var c = closestBrightness(final_brights[i])
      image(final_blocks[c],x+source_img.width*2, y, blocksize,blocksize);
      //image(blocks[i],blocksize*int(random(source_img.width/blocksize)), blocksize*int(random(source_img.height/blocksize)), blocksize,blocksize);
      i++;
    }
  }

}

function closestBrightness(var source_brightness){
  boolean found;
  var closest = 0;
  while (found == false && closest <= 255) {
    for (var i = 0; i < blockCount; i++) {
      if (brights[i] >= source_brightness && brights[i] < source_brightness+closest) {
        found = true;
        brights.splice(i, 1);
        return i;
      }
    }
    closest++;
  }
  console.log("no match found");
  if(brights.length > 0) brights.splice(brights.length, 1);
}


function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
