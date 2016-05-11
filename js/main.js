var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
//var ctx = canvas.getContext('experimental-webgl');
var width = window.innerWidth;
var height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
var pixelateOn = false;
var rbvj;


function resize() {
	width = w = window.innerWidth,
	height = h = window.innerHeight,
	canvas.width = width;
	canvas.height = height;
	//$('#cover').html('');
	$(canvas).html('');
	scanLinesOn = false;
	gui = null;
}



window.addEventListener('resize', resize, false);

var num=2;
var movers=3;
var stats = new Stats();
var stats_container = document.getElementById('stats_holder');
stats_container.appendChild( stats.domElement );
stats.domElement.style.position = 'absolute';
stats.domElement.style.zIndex = 999;
stats.domElement.style.top = '0px';


