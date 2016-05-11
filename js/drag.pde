Node dragNode = null;
ArrayList nodes;
int nodeCount = 10;
int mode = 0;

void setup() {
  size(window.innerWidth,window.innerHeight);
  smooth();
  nodes = new ArrayList();
  for (int i = 0; i < nodeCount; i++) {
    Node n = new Node(i, random(width), random(height-200), 40);
    nodes.add(n);
  }
}

void addNode(){
  nodeCount++;
  Node n = new Node(nodeCount-1, random(width), random(height-200), 40);
  nodes.add(n);
}

void draw() {
  background(0xffaabbcc);
  if (mode == 2) {
    mode = 0;
    for (int i = 0; i < nodes.size(); i++) {
      Node n = (Node) nodes.get(i);
      n.x = random(width);
      n.y = random(height-200);
    }

    } else {
      for (int i = 0; i < nodes.size(); i++) {
        Node n = (Node) nodes.get(i);
        n.draw();
      }
    
  }
  for (int i = 0; i < nodes.size(); i++) {
    Node n = (Node) nodes.get(i);
    n.drawCircs();
  }
}

void mousePressed() {
  dragNode = null;
  Node n;
  for (int i = 0; i < nodes.size(); i++) {
    n = (Node) nodes.get(i);
    if (n.contains(mouseX, mouseY)) {
      dragNode = n;
    }
  }
}

void mouseDragged() {
  if (dragNode != null) {
    dragNode.x = mouseX;
    dragNode.y = mouseY;
  }


}

void mouseReleased() {
  dragNode = null;
}

class Node {
  float x, y, r;
  int me;
  float z = 0;
  Node(int _m, float x, float y, float r) {
    this.me = _m;
    this.x = x;
    this.y = y;
    this.r = r;
  }
  void draw() {
    
    if(me>0) {
      Node n = (Node) nodes.get(me-1);
      stroke(0);
      strokeWeight(4);
      line(x,y, n.x,n.y);
    }
  }
  void drawCircs() {
    strokeWeight(1);
    ellipse(x, y, r * 2f, r * 2f);
  }

  boolean contains(float x, float y) {
    float dx = this.x - x;
    float dy = this.y - y;
    return sqrt(dx * dx + dy * dy) <= r*2;
  }
}