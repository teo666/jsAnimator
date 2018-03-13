'use strict';

const _state = {
    "QUEUED" : 0,
    "ANIM_END" : 1
};

let jsAnimator;

(function () {
    let queue = [];
    let cancel = true;
    let started = false;
    let frame_render_end = null;
    let frame_render_start = null;

    let last_animation = null;
    let next = false;
    let n_next = 0;
    
    let add = function(obj,prop) {
        if (!obj) return;
        if(!prop) prop = {};

        if(!obj.fn_stop || typeof obj.fn_stop !== 'function'){
            obj.fn_stop = function(){};
        }
        if(!obj.fn_update || typeof obj.fn_update !== 'function'){
            obj.fn_update = function(){};
        }
        if(!obj.fn_draw || typeof obj.fn_draw !== 'function'){
            obj.fn_draw = function(){};
        }
        let property = {
            state: _state.QUEUED
        };

        queue.push({element:obj, prop: property});
    };

    let animationToggle = function () {
        if(started) {
            animationStop()
        } else {
            animationStart()
        }
    };
    
    let animationStart = function(){
        if(started) return;
        started = true;
        cancel = false;
        last_animation = requestAnimationFrame(loop.bind(this));
    };
    
    let animationStop = function() {
        cancel = true;
        cancelAnimationFrame(last_animation);
        started = false;
    };

    let renderNext = function (n) {
        if(started || n <= 0) return;
        n_next = n;
        next = true;
        animationStart();
    };
    
    let loop = function() {
        if(frame_render_start) frame_render_start();
        let cont = false;
        let ql = queue.length;
        for (let i = ql - 1; i >= 0; i--) {
            let e = queue[i].element;
            let state = queue[i].prop.state;
            if(state === _state.QUEUED){
                e.fn_update.apply(e);
                e.fn_draw.apply(e);
                if(e.fn_stop.apply(e)){
                    queue[i].prop.state = _state.ANIM_END;
                    queue.splice(i,1);
                }
                cont = true;
            }
        }
        if(frame_render_end) frame_render_end();
        if(ql !== queue.length) cont = true;
        if(next){
            animationStop();
            next = false;
            n_next -= 1;
            renderNext(n_next);
        } else if (cont && !cancel) {
            last_animation = requestAnimationFrame(loop.bind(this));
        }
    };
    
    let setGlobalOnFrameRenderStart = function(f) {
        if(typeof f === 'function'){
            frame_render_start = f;
            return true;
        }
        return false;
    };
    
    let setGlobalOnFrameRenderEnd = function(f) {
        if(typeof f === 'function'){
            frame_render_end = f;
            return true;
        }
        return false;
    };

    let length = function () {
        return queue.length;
    };

    jsAnimator = {
        add: add,
        setGlobalOnFrameRenderEnd: setGlobalOnFrameRenderEnd,
        setGlobalOnFrameRenderStart: setGlobalOnFrameRenderStart,
        animationStart: animationStart,
        animationStop: animationStop,
        animationToggle : animationToggle,
        renderNext:renderNext,
        length : length
    };

     return jsAnimator;
})();