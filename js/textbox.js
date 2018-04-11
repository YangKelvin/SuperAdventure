
class Textbox
{
    constructor()
    {
        this._value = 0;
        this._position = {x:0,y:0};

        this._text = ""
        this._width = 400
        this._height = 60
    }
    load()
    {

    }

    update()
    {
    }


    draw(ctx)
    {
        //放入正方形
        ctx.globalAlpha=0.4;  //透明度
        ctx.fillStyle = 'black';    //顏色：黑
        //fillRect(x位置, y位置, 長, 寬)
        ctx.fillRect(this._position.x - 10, this._position.y, this._width, this._height); 

        //放入文字
        //font = '(字體大小(pt) 字型 ' 
        ctx.font = '30pt Algerian';
        ctx.globalAlpha=1;
        ctx.fillStyle = 'yellow'; 
        ctx.textBaseline = 'top';   //??
        ctx.textAlign = 'left';     //??
        ctx.fillText(this._text + this._value, this._position.x, this._position.y);
    }

    addScore(score)
    {
        this._value += _value;
    }

    resetValue()
    {
        this._value = 0;
    }
}

Object.defineProperty(Textbox.prototype, 'position', {
    get: function() {
        return this._position;
    },
    set: function(newValue) {
        this._position = newValue;
    }
}); 
