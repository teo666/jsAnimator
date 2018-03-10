let canvas = document.getElementById("myCanvas");
let context = canvas.getContext('2d');

function Ball() {
    this.args = {
        canvas : canvas,
        context : context
    };
    this.rand =  {
        x: Math.random() * 10- 5,
        y: Math.random() * 10 - 5
    };
    this.position = {
        x: 50,
        y: 120
    };
    this.G = 0.05;
    this.bound = this.position.y;

    this.time = -1;
    this.inc = 1;
    this.hit = false;
    this.incx = 15
}

Ball.prototype.fn_update = function(){
    this.position.x += this.incx;
    if(this.position.x > 900 || this.position.x < 0){
        this.incx = -this.incx
    }

    this.time += this.inc;
    this.position.y += (this.G * this.time * this.time)*this.inc;
    if(!this.hit && this.position.y >= 500){
        this.time += this.inc;
        this.inc = -this.inc;
        this.hit = true;
    }
    if(this.hit && this.position.y <= this.bound){
        this.time += this.inc;
        this.inc = -this.inc;
        this.hit = false;
    }

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
        ctx.arc(50,50,47,0,2*Math.PI,false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#95ac00';
        ctx.stroke();
        ctx.closePath();
        img = new Image();
        img.onload = ()=>{
            context.drawImage(img, this.position.x, this.position.y)
        };
        img.src = cache_canvas.toDataURL();
    }
};
let palla = new Ball();
let palla2 = new Ball();
palla2.position = {x:200,y:250};
palla2.incx = -10;
palla2.bound = 250;
palla2.G = 0.01;
jsAnimator.add(palla);
jsAnimator.add(palla2);

jsAnimator.setGlobalOnFrameRenderStart(function(){
    context.clearRect(0,0,1000,1000);
});

jsAnimator.animationStart();