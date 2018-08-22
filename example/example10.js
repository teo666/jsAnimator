let canvas = document.getElementById("myCanvas");
let context = canvas.getContext('2d');

function Ball() {
    this.args = {
        canvas : canvas,
        context : context
    };
    this.container_rotation_angle = 0.04;
    this.container_rotation_angle2 = -0.033333333333333;
    this.ball_rotation_angle = -0.1;
    this.container_radius = 100;
    this.container_radius2 =150;
    this.ball_radius = 30;
    this.container_angle = 0;
    this.container_angle2 = 0;
    this.ball_angle = 0;
    this.position = {
        x: 200,
        y: 200
    };
    this.containerX = 0;
    this.containerY = 0;
    this.container2X = 0;
    this.container2Y = 0;
    this.ballX = 0;
    this.ballY = 0;
    this.position.translate = {
        x: 300,y:300
    }
}

Ball.prototype.fn_update = function(){
    this.container_angle = this.container_angle + this.container_rotation_angle;
    this.container_angle2 = this.container_angle2 + this.container_rotation_angle2;
    this.ball_angle = this.ball_angle + this.ball_rotation_angle;

    this.containerX = Math.cos(this.container_angle) * this.container_radius;
    this.containerY = Math.sin(this.container_angle) * this.container_radius;
    this.container2X = Math.cos(this.container_angle2) * this.container_radius2;
    this.container2Y = Math.sin(this.container_angle2) * this.container_radius2;
    this.ballX = Math.cos(this.ball_angle) * this.ball_radius;
    this.ballY = Math.sin(this.ball_angle) * this.ball_radius;

    this.position.x = this.position.translate.x + this.containerX + this.container2X + this.ballX;
    this.position.y = this.position.translate.y + this.containerY + this.container2Y + this.ballY;
};

Ball.prototype.fn_stop = function(){
    return (Math.abs(this.container_angle2) >= 10*Math.PI)
};

Ball.prototype.fn_draw = function(){
    let context = this.args.context;
    context.beginPath();
    context.strokeStyle = "#a0a0a0";
    context.moveTo(this.position.translate.x,this.position.translate.y);
    //context.lineTo(this.position.x,this.position.y);
    context.lineTo(this.position.translate.x +
        this.container2X,
        this.position.translate.y +
        this.container2Y);
    context.lineTo(this.position.translate.x +
        this.container2X+
        this.containerX,
        this.position.translate.y +
        this.container2Y+
        this.containerY);
    context.lineTo(this.position.translate.x +
        this.container2X+
        this.containerX +
        this.ballX,
        this.position.translate.y +
        this.container2Y+
        this.containerY +
        this.ballY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(this.position.x,this.position.y,2,0,2*Math.PI,false);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
};

let a = new Ball();
jsAnimator.add(a);


jsAnimator.setGlobalOnFrameRenderStart(function(){
    //context.clearRect(0,0,1000,1000);
});

jsAnimator.animationStart();