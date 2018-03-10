/**
 * example of rotation
 */
rectangle0 = {
    handle: document.getElementById("div0"),
    rotation : 0,

    fn_update : function(){
        this.rotation = (this.rotation + 7) % 360;
    },

    fn_draw : function(){
        this.handle.style.transform = 'rotate(' + this.rotation + 'deg)'
    }
};

jsAnimator.add(rectangle0);


