class Camera
{
    constructor(w,h){
        this.x = 0;
        this.y = 0;
        this.w = document.body.clientWidth;
        this.h = document.body.clientHeight;
        this.mw = null;
        this.mh = null;
    }

    range(v, min, max){
        return Math.max(0, Math.min(v, max));
    }
    

    mWidth(v){
        if(v === undefined){
            return this.mw;
        }
        this.mw = v;
    }
    mHeight(v){
        if(v === undefined){
            return this.mh;
        }
        this.mh = v;
    }
    setLocation(x, y){
        this.location = { x: x, y: y }
        this.x = this.range(x - this.w / 2, 0, this.mw - this.w / 2);
        this.y = this.range(y - this.h / 2, 0, this.mh - this.h / 2);
    }

    //global.Camera = Camera;
};