HTMLElement imgElement;//the html element containing the screenshot
 HTMLElement divElement;//the html element containing the imgElement
 boolean firstScreenCaptured=false;//will be switched to true if first screenshot was captured after everything is ready
 PImage capturedWebsite, dummy;
 
 int start=0;
int numCrawlers = 2000;
int numAnomalys = 200;
Crawler[] bugs;
var canvas = parent.document.getElementById('spectrum');

boolean drawLines = true;
int mode = 1;
PFont font;
float friction = 0.85;
int total=0;
PImage k;
int leftmargin= 0;

void setup() {
  size(window.innerWidth,window.innerHeight-100);
  smooth();
  fill(0);
  bugs = new Crawler[numCrawlers];
  capturedWebsite=createImage(window.innerWidth,window.innerHeight,RGB);
  //createDivElement();//create the html element containing the imgElement
  //captureWebsite();//take the first screenshot after everything is ready
  background(#efefef);
  //reset();
//});
}
 
void draw() {  
  //background(255);

  for(int i=0; i<total; i++) {
    bugs[i].move();
    bugs[i].display();
  }


   //draw the screenshot from the website if it was captured
  //} else text("please wait for the first screenshot" ,10,height/2);// else draw text info
   // imgElement.src=document.getElementsByTagName("canvas")[0].toDataURL("image/webp",0.7);// take a screenshot from the sketch and place it in our imgElement
  }


void resize(){
  size(window.innerWidth,window.innerHeight);
  reset();
}

void reset() {
  //background(0);
  $('#hidden').show();
    html2canvas(parent.document.getElementById('hidden'), {  
      onrendered: 
      function(canvas) {     
        capturedWebsite=loadImage(canvas.toDataURL("image/webp",0.9)); 
        firstScreenCaptured=true;
        $('#hidden').hide();
    }
  });
    
 //image(capturedWebsite,0,0,window.innerWidth,window.innerHeight);
  //brightspark();
  //if(firstScreenCaptured) { 
  console.log('reset'+random(0,10000)); 
   image(capturedWebsite,50,50,window.innerWidth-150,window.innerHeight-180);
   brightspark();
 //}

}



// ----- get image brightness

void brightspark(){
  //background(0);
  firstScreenCaptured=false;
  capturedWebsite=loadImage(canvas.toDataURL("image/webp",0.9)); 
   loadPixels();
   total = 0;
 for (int y = 0; y < height; y+=2) {  
    for (int x = 0; x < width; x+=2) {
    //     // Get the color stored in the pixel
        //color pixelValue = get(x,y);
        color pixelValue = pixels[y*width+x];
        
      if (brightness(pixelValue) > 245) {
     
        color cc= color(random(3,8)*5,random(90,255),0,180);
        color cc= color(random(100,155),random(20,90),10,180);
        color cc= color(random(0,255),random(0,90),10,180);
        color cc= color(random(200),random(2,5)*5,0,80);
        color cc= color(random(20,150),random(1,10)*5,20,180);
        bugs[total] = new Crawler(x, y, cc);
        total++;
        
       }
        
     
     }
    
    }
    background(#efefef);
  
}



//Class definitions-------------------===============
class Bug
{
  float vx;
  float vy;
  float ax;
  float ay;
  float xpos;
  float ypos;
  float maxDist;
  color mycol;

  Bug() {
    maxDist = random(height,height/2);
  }

  void move () {
    vx += random(-0.4,0.4);
    vy += random(-0.4,0.4);

    vx *= friction;
    vy *= friction;

    xpos += vx;
    ypos += vy;


  }
}



class Crawler extends Bug
{
  Crawler (float ixp, float iyp, color c) {
    xpos = ixp;
    ypos = iyp;
    mycol=c;
    
    stroke(mycol);
    //line(xpos,ypos,xpos+random(-15,20),ypos+random(-15,20));
    //ellipse(xpos,ypos,1,1);
    point(xpos+random(-15,20),ypos+random(-15,20));
  }

  void display() {
    strokeWeight(0.1);
    stroke(mycol);
    point(xpos,ypos);
    //ellipse(xpos,ypos,2,2);
  }

}

