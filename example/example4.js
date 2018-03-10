/**
 * animation composition
 * it is possible animate objects separately to get more complex animations by compose them together
 *
 * in this example we have a ball (div) that move linearly up and down inside a container div that rotate,
 * move mouse pointer on the ball to see the container rotate and notice that the ball move linearly in
 * the middle of the box.
 */

container = {
    handle: document.getElementById("cont"),
    rotation : 0,

    fn_update : function(){
        this.rotation = (this.rotation + 2) % 360;
    },

    fn_draw : function(){
        this.handle.style.transform = 'rotate(' + this.rotation + 'deg)'
    }
};

ball = {
    handle: document.getElementById("ball"),
    position : 0,
    increment: 5,

    fn_update : function(){
        this.position += this.increment;
        if(this.position > 180 || this.position < 0){
            this.increment = -this.increment;
        }
    },

    fn_draw : function(){
        this.handle.style.top = this.position + 'px';
    }
};

jsAnimator.add(container);
jsAnimator.add(ball);

jsAnimator.animationStart();


