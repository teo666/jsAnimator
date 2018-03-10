/**
 * animation composition inside canvas
 * this example is similar to example 5 and 6 except that it is realized into canvas
 *
 * this example compose rotations into canvas, play with rotations angle and radius values to see how the result
 * shape appear. Notice that give opposite speed to the elements draw an ellipse, and its thinness is given by
 * radius ratio.
 *
 * It is possible give a simple representation of satellite trajectory around its planet that rotate around another one
 * for example the path that the moon describe relatively to the sun point of view
 * eg
     this.container_rotation_angle = 0.04;
     this.ball_rotation_angle = -0.1;
     this.container_radius = 100;
     this.ball_radius = 10;
 */

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext('2d');

function Ball() {
    this.args = {
        canvas : canvas,
        context : context
    };
    this.container_rotation_angle = 0.04;
    this.ball_rotation_angle = -0.1;
    this.container_radius = 100;
    this.ball_radius = 10;
    this.container_angle = 0;
    this.ball_angle = 0;
    this.position = {
        x: 400,
        y: 400
    };
    this.position.translate = {
        x: 200,y:200
    }
}

Ball.prototype.fn_update = function(){
    this.container_angle = this.container_angle + this.container_rotation_angle;
    this.ball_angle = this.ball_angle + this.ball_rotation_angle;
    let containerX, containerY, ballX, ballY;
    containerX = Math.cos(this.container_angle) * this.container_radius;
    containerY = Math.sin(this.container_angle) * this.container_radius;
    ballX = Math.cos(this.ball_angle) * this.ball_radius;
    ballY = Math.sin(this.ball_angle) * this.ball_radius;

    this.position.x = this.position.translate.x + containerX + ballX;
    this.position.y = this.position.translate.y + containerY + ballY;
};

Ball.prototype.fn_stop = function(){
    return false;
};

let img = null;

Ball.prototype.fn_draw = function(){
    let context = this.args.context;
    if(img) {
        context.drawImage(img, this.position.x, this.position.y);
    } else {
        let cache_canvas = document.createElement('canvas');
        let ctx = cache_canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(50,50,2,0,2*Math.PI,false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
        img = new Image();
        img.src = cache_canvas.toDataURL();
    }
};

let a = new Ball();
jsAnimator.add(a);


jsAnimator.setGlobalOnFrameRenderStart(function(){
    //jsAnimator.getMainCanvasContext().clearRect(0,0,1000,1000);
});

jsAnimator.animationStart();