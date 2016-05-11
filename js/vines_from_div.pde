/* @pjs font="data/Folks-Bold.ttf"; */

int start=0;
int numCrawlers = 2000;
int numAnomalys = 200;
Crawler[] bugs;

boolean drawLines = true;
int mode = 1;
PFont font;
float friction = 0.85;
int total=0;
String k;
int leftmargin= 40;

void setup() {  
  // size(800,600, P3D);
  size(window.innerWidth,window.innerHeight);
  background(#efefef);
  noStroke();
  //font = loadFont("data/Folks-Bold-88.vlw");
  textFont(createFont("Folks-Bold.",85));
  bugs = new Crawler[numCrawlers];
 // flys = new Anomaly[numAnomalys];
  fill(255);
  //textFont(font, 70);
  
  // k = "He thinks falling in love every 2 weeks is ideal. I think that means he'll keep going on bad dates with pretty girls. Hopefully, I'm wrong.....";
  // k = "To falling in love only makes us to be like stupid, and at the end, the other person leaves without corresponds the feel and it hurts us.....";
  k="@dani_ellee I think i'm falling in love with you!! :) xxx #iloveyou....";
  // String k ="Downloading Gary Go's album... watching Animal attraction...which I love! Ears are hurting on account of I pulled one of my new earrings :(.";
  k="i've seen the paths that your eyes wander down, i wanna come too. i think that possibly, maybe I'm falling for you.";
  //k="I love that I'm falling in love with music again.";
  //k="I love that I'm falling in love with music again. It's nice to be getting back to my old self. :).... ";
  //k="Falling in Love with Jesus was the best thing I've ever done!! ";
  //k="Slowly falling in love with the music of Beirut....";
  //k="Reading The Unbearable Lightness of Being, and falling in love with Sabina..... ";
  ///k="this was the soundtrack to me falling in love with Jonathan. I still love the song...and the man - but - well";
  //k="@blakeovard I should not watch, I keep falling in love with him!!! ";
  //k="going to stop falling in 'love' with DUMBASSSES!....";
  //k="Even though Andrew Bird is about 17 years older than me, I am still convinced that we are going to end up falling in love with eachother...";
  ///k="model.y=stage.stageHeight-mouseY;";
  // text(k,leftmargin,25,width-leftmargin,height);
  // brightspark();
  // background(240);
  //reset(k);
}

void draw() {

  // //fade lines
  // if (drawLines) {
  //   noStroke();
  //   fill(0, 2);
  // //  rect(0,0,width,height);
  // } 
  // else {
  //   background(0);
  // }

  for(int i=0; i<total; i++) {
   bugs[i].move();
    bugs[i].display();
  }

}

void keyReleased () {
  if (key == ' ') {
    if (drawLines) {
      drawLines = false;
    } 
    else if (!drawLines) {
      drawLines = true; 
    }
  }
   if (key == 's') {
     float s=random(1,1000);
     save(s+".tif");
     println ("saving: "+ s+".tif");
   }
  if (key == 'r') {
    background(0);
    for(int i=0; i<numCrawlers; i++) {
      bugs[i].ax = bugs[i].ay = bugs[i].vx = bugs[i].vy = 0;
      bugs[i].xpos = width/2;
      bugs[i].ypos = height/2;
    }
  //  for(int i=0; i<numAnomalys; i++) {
    //  flys[i].ax = flys[i].ay = flys[i].vx = flys[i].vy = 0;
      //flys[i].xpos = width/2;
     // flys[i].ypos = height/2;
   // }
  }
}

void reset(k) {
  background(0);
  int c = k.length();
  //float targetSize = (window.innerWidth/21)*100/c;

  //float targetSize = (width*height)/(c*c);
  //float targetSize = max(min(width-2*leftmargin / (1*10), 90), 20);
  float targetSize = max(min(window.innerWidth / (1*10), parseFloat(Number.POSITIVE_INFINITY)), parseFloat(Number.NEGATIVE_INFINITY));
      
  //float targetSize = 88*100/c;
  textSize(targetSize);
  text(k,leftmargin,leftmargin,width-leftmargin*2, height-leftmargin*3);
  brightspark();
  background(#efefef);

}


void brightspark(){
  
  loadPixels();
  total = 0;
  for (int y = 0; y < height; y+=2) {  
    for (int x = 0; x < width; x+=2) {
    //     // Get the color stored in the pixel
        //color pixelValue = get(x,y);
        color pixelValue = pixels[y*width+x];
        
      if (brightness(pixelValue) > 5) {
     
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
