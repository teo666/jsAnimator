
container = {
    handle: document.getElementById("cont"),
    rotation : 0,
    increment :0.4,

    fn_update : function(){
        this.rotation = (this.rotation + this.increment) % 360;
    },

    fn_draw : function(){
        this.handle.style.transform = 'rotate(' + this.rotation + 'deg)'
    }
};

subcont = {
    handle: document.getElementById("subcont"),
    rotation : 0,
    increment : 2,

    fn_update : function(){
        this.rotation = (this.rotation + this.increment) % 360;
    },

    fn_draw : function(){
        this.handle.style.transform = 'rotate(' + this.rotation + 'deg)'
    }
};

jsAnimator.add(container);
jsAnimator.add(subcont);

jsAnimator.animationStart();


