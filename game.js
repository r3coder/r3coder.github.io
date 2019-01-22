var canvas, ctx, width, height,
	frames=0, gameState;

var
room = 0,
keyState={ left:false, right:false, down:false, up:false, dash:false};

var pl = {
	x: 200, y: 200, spd: 0, spdf: 4, iner: 0.3, dashT: 0,
	imgX: 64, imgY: 64,
	init:function(){
		pl.x = width/2;
		pl.y = height/2;
	},
	update:function(){
		// Movement
		if(keyState.left==true||keyState.right==true||keyState.up==true||keyState.down==true){if(pl.spd<pl.spdf){pl.spd+=pl.iner;}}
		else{if(pl.spd>0){pl.spd-=pl.iner;}}
		// Diagonal
		var v = pl.spd;
		if((keyState.left&&keyState.up)||(keyState.left&&keyState.down)||(keyState.right&&keyState.down)||(keyState.right&&keyState.up)){v = pl.spd/1.4;}
		if(keyState.dash==true) {keyState.dash==false; pl.dashT=10;}
		if(pl.dashT>0){pl.dashT-=1; v = 10;}
		if(keyState.left==true) {pl.x = pl.x - v;}
		if(keyState.right==true){pl.x = pl.x + v;}
		if(keyState.down==true) {pl.y = pl.y + v;}
		if(keyState.up==true)   {pl.y = pl.y - v;}

		//border checking
		if(pl.x>width-50){pl.x = width-50;}
		else if(pl.x<50){pl.x = 50;}
		else if(pl.y>height-50){pl.y = height-50;}
		else if(pl.y<50){pl.y = 50;}
	}
};


function main(){
	canvas = document.getElementById("game");
	// Set canvas width and height
	width = window.innerWidth - 30; // margin, may be edited
	height = window.innerHeight - 30;
	// Width and height adjustment
	if (width<=500){width = 500;}
	if (height<=500){height = 500;}
	// Set canvas variable
	canvas.width = width;
	canvas.height = height;
	canvas.display = "block";
	canvas.margin = "auto";
	ctx = canvas.getContext('2d');
	// Add key listener
	document.addEventListener('keydown',press)
	document.addEventListener('keyup',release)
	// Player initiation
	pl.init();
	// Run the game
	run();
}
// 37=left 38=up 39=right 40=down 65=a 68=d 83=s 87=w
function press(e){
	var k = e.keyCode;
	if(k===39||k===68){keyState.right=true;}
	if(k===37||k===65){keyState.left=true;}
	if(k===40||k===83){keyState.down=true;}
	if(k===38||k===87){keyState.up=true;}
	if(k===32){keyState.dash=true;}
}
function release(e){
	var k = e.keyCode;
	if(k===39||k===68){keyState.right=false;}
	if(k===37||k===65){keyState.left=false;}
	if(k===40||k===83){keyState.down=false;}
	if(k===38||k===87){keyState.up=false;}
	if(k===32){keyState.dash=false;}
}

function run(){
	var loop = function(){
		update();
		render();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

function update(){
	frames++;
	pl.update();
}

function render(){
	// Draw background
	ctx.fillStyle = "#EEEEEE";
	ctx.fillRect(0,0, width,height);
	// Draw Player
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(pl.x-pl.imgX/2,pl.y-pl.imgY/2,pl.imgX,pl.imgY);
	// Draw UI
	ctx.font = "20px Arial";
	ctx.fillText("Elapsed Frame:"+frames,20, 20);
	
}

main();
