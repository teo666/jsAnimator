/**
 * this example show how it is possible use jsAnimator to animate html element using css
 */
/**
 * create a rectangle in html then pass it to a js object in handle field, this field is used by the library
 * to get the element reference, give it a position and dimension,
 */
rectangle0 = {
    handle: document.getElementById("div0"),
    position : {
        w: 30,
        h: 30,
        t: 0,
        l: 0
    },
    /**
     * the div will translate to left each iteration by 5 px and it will increase its width by 2px
     */
    fn_update : function(){
        this.position.l += 5;
        this.position.w += 2;
    },
    /**
     * animation stop when rectangle position reach 500px to the left
     */
    fn_stop : function(){
        return (this.position.l >= 500)
    },
    /**
     * draw the rectangle by setting its style with css
     */
    fn_draw : function(){
        this.handle.style.left = this.position.l + "px";
        this.handle.style.width = this.position.w + "px";
        this.handle.style.height = this.position.h + "px"
    }
};
/**
 * same as above
 */
rectangle1 = {
    handle: document.getElementById("div1"),
    position : {
        w: 30,
        h: 30,
        t: 0,
        l: 0
    },
    fn_update : function(){
        this.position.l += 10;
        this.position.w += 4;
    },
    fn_stop : function(){
        return (this.position.l >= 500)
    },
    fn_draw : function(){
        this.handle.style.left = this.position.l + "px";
        this.handle.style.width = this.position.w + "px";
        this.handle.style.height = this.position.h + "px"
    }
};

/**
 * same as above except that we will increase the height too
 */
rectangle2 = {
    handle: document.getElementById("div2"),
    position : {
        w: 30,
        h: 30,
        t: 0,
        l: 0
    },
    /**
     * the width and height are parametric in rectangle's length, this assure that all dimension will complete
     * when length reach the stop condition
     */
    fn_update : function(){
        this.position.l += 6;
        this.position.w = 30 + (200/500)*this.position.l;
        this.position.h = 30 + (50/500)*this.position.l;
    },
    fn_stop : function(){
        return (this.position.l >= 500)
    },
    fn_draw : function(){
        this.handle.style.left = this.position.l + "px";
        this.handle.style.width = this.position.w + "px";
        this.handle.style.height = this.position.h + "px"
    }
};
/**
 * in this example we are doing the same thing above except that when stop condition is reached
 * the animation is redefined and added again
 */
rectangle3 = {
    handle: document.getElementById("div3"),
    position : {
        w: 30,
        h: 30,
        t: 0,
        l: 0
    },
    fn_update : function(){
        this.position.l += 10;
        this.position.w = 30 + (200/500)*this.position.l;
    },
    fn_stop : function(){
        if(this.position.l < 500){
            return false;
        } else{
            /**
             * redefinition of methods only increase height and stop when it reach 150
             */
            this.fn_update = function(){
                this.position.h += 4;
            };
            this.fn_stop = function(){
                return (this.position.h >= 150)
            };
            /**
             * add again
             */
            jsAnimator.add(this);
            //jsAnimator.animationStart();
        }
        return true;
    },
    fn_draw : function(){
        this.handle.style.left = this.position.l + "px";
        this.handle.style.width = this.position.w + "px";
        this.handle.style.height = this.position.h + "px"
    }
};

jsAnimator.add(rectangle0,{removeOnStop : false});
jsAnimator.add(rectangle1);
jsAnimator.add(rectangle2);
jsAnimator.add(rectangle3,{removeOnStop : true});

jsAnimator.animationStart();

