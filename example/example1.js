/**
 * NOTE: this example create a wide number of elements. Animate all these elements can stress your browser and hardware.
 * The test performances are conditioned by many aspect, first of all the available hardware.
 *
 * I build this example to test my hardware and I noticed that performances can vary in different conditions and system
 * configurations
 *
 * hw:
 * - intel integrated GPGPU, intel(R) HD Graphics 630
 * - Nvidia dedicated GPGPU, NVIDIA GeForce GTX 1050 Ti
 *
 * browsers:
 * - firefox 58 64bit
 * - chrome  64 64bit
 *
 * Many system configurations don't enable dedicated GPGPU for browsers by default, especially in notebook.
 * Usually dedicated GPU consume more energy than integrated but they are more performing too.
 * For maximum performance enable dedicated GPU for your browser in graphics settings
 * and disable power save settings (usually in notebook simply connect charger).
 * NOTE: simply enable dedicate GPU doesn't give maximum performance, power save settings can limit hardware enslaving.
 * NOTE: running test with integrated GPGPU can result in flickering due to fewer hardware resource than dedicated devices.
 * NOTE: many modern browser allow users to see fps in debug tool, search in your browser settings.
 * NOTE: writing a similar code without use of caching (as described below) can result in poor rendering performance.
 */


/**
 * number of balls
 */
let n = 2000;

/**
 * create base class for balls to animate
 * each ball has a position and a speed (a random value that will be added to current position)
 * the position is represented as pixels
 */
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
        x: 450,
        y: 250
    };
}

/**
 * Inside the library there are three functions that can be called on each element, these functions are
 * fn_draw: the function called when the element is drawn
 * fn_update: the function called when the animation must be updated
 * fn_stop: the function that tell if the stop condition of the element is reached
 *
 * each object must have fn_draw function, otherwise it will not be displayed (only for canvas)
 * usually fn_update must be specified, otherwise the element will not be animated, it will remain firm
 * fn_stop tells if the animation is end
 *
 * In this case we will animate many balls but they are all equals, so it is possible use the same function to draw them.
 * If this condition does not occur each element must have your own function.
 *
 * In this case not only the balls are equals but their visualization don't change during time, cause the only thing that
 * changes is theirs position, in this case it is possible use cache. Basically we draw on a support canvas,
 * save it as image and use it for draw all balls, this process grants an incredible boost to canvases animations
 * WHEN POSSIBLE USE CACHE! :)
 */
let img = null;

Ball.prototype.fn_draw = function(){
    let context = this.args.context;
    if(img) {
        context.drawImage(img, this.position.x, this.position.y);
    } else {
        let cache_canvas = document.createElement('canvas');
        let ctx = cache_canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(50,50,20,0,2*Math.PI,false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#95ac00';
        ctx.stroke();
        ctx.closePath();
        img = new Image();
        img.src = cache_canvas.toDataURL();
    }
};

/**
 * this is the function for update balls position and give them animation. It simply add theirs position represented as
 * pixels teh random value defined in balls constructor.
 *
 * if the ball position reaches the canvas margins the ball's speed is inverted
 */

Ball.prototype.fn_update = function(){
    this.position.x += this.rand.x;
    this.position.y += this.rand.y;
    if(this.position.x > 926 || this.position.x < -26) {
        this.rand.x = -this.rand.x;
    }
    if(this.position.y > 526 || this.position.y < -26){
        this.rand.y = - this.rand.y;
    }
};

/**
 * this function tells when the ball must be stopped. If it return true then the stop condition is reached and the
 * animation for the element will be stopped otherwise the update function is called and the element is redraw.
 *
 * In this case the balls never stop
 */

Ball.prototype.fn_stop = function(){

    return false;
};

/**
 * the balls are created and added passed to jsAnimator by calling the add function,
 * use it whenever u want to animate something.
 */

for(let i = 0; i < n  ; i++){
    jsAnimator.add(new Ball());
}

/**
 * It is possible to specify two special functions.
 * frame_render_start: a function that is called before the render process begins
 * frame_render_stop: a function that is called after the render process ends
 *
 * these functions are called on each cycle of elements rendering
 * in this case, before redraw elements we clear the canvas.
 *
 * frame_render_stop is not specified in this example, to use it call
 *
 * jsAnimator.setGlobalOnFrameRenderEnd(function(){...})
 *
 */
jsAnimator.setGlobalOnFrameRenderStart(function(){
    context.clearRect(0,0,1000,1000);
});

/**
 * this call start the render process
 *
 * It is possible to stop animation by calling jsAnimator.animationStop()
 * It is possible to render one frame in stop state by calling jsAnimator.renderNext()
 */
jsAnimator.animationStart();