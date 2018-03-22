class Score
{
    constructor()
    {
        this._score=0
        this._position =
        {
            x: 0,
            y: 0
        }
    }
    
    load()
    {

    }
    update()
    {

    }
    draw()
    {
        //放入正方形
        ctx.globalAlpha=0.4;  //透明度
        ctx.fillStyle = 'black';    //顏色：黑
        //fillRect(x位置, y位置, 長, 寬)
        ctx.fillRect(this._position.x - 10, this._position.y, 300, 40); 

        //放入文字
        //font = '(字體大小(pt) 字型 ' 
        ctx.font = '30pt Algerian';
        ctx.globalAlpha=1;
        ctx.fillStyle = 'yellow'; 
        ctx.textBaseline = 'top';   //??
        ctx.textAlign = 'left';     //??
        ctx.fillText("Score: " + this._score, this._position.x, this._position.y);
    }
    addScore(scroe)
    {
        this._score += score
    }
    resetScore()
    {
        this._score = 0
    }

    get position()
    {
        return this._position
    }
    set position(newValue)
    {
        this._position = newValue
    }
}