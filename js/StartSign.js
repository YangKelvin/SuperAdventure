class StartSign
{
    constructor()
    {
        this.isStart = false
        // this.startPic
    }

    load(px, py)
    {
        this.startPic = new Framework.Sprite('images/start.png')
        this.startPic.position = 
        {
            x: px,
            y: py
        }
    }
    
    update()
    {

    }

    init()
    {

    }

    mousedown(e)
    {
        this.previousTouch = 
        {
            x: e.x,
            y: e.y
        }

        console.log(this.previousTouch)

        if (this.previousTouch.x >= /*this.startPic.upperLeft.x*/ 600 && 
            this.previousTouch.x <= /*this.startPic.upperRight.x*/ 1030 && 
            this.previousTouch.y >= /*this.startPic.upperLeft.y*/ 300 && 
            this.previousTouch.y <= /*this.startPic.lowerLeft.y*/ 610) 
        {
            Framework.Game.goToNextLevel()
            console.log("startGame")
        }

    }
}