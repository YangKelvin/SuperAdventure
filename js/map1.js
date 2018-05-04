class Map1
{
    constructor(map, _matter)
    {
        //super()
        this.mapArray = map
        this.matter = _matter

        //是否移動 和 移動方向
        this.pressWalk = false
        this.walkDirection = 0

        //硬幣數量初始, 地圖左右座標初始
        this.score = 0
        this.mapLeft = 0
        this.mapRight = 0

        this.isPrincess = false
    }

    loadTextbox()
    {
        //hero info
        this.heroInfoX = new Textbox()
        this.heroInfoX.position = {x:1000, y:0}
        this.heroInfoX._text= "hero_x : "

        this.heroInfoY = new Textbox()
        this.heroInfoY.position = {x:1000, y:80}
        this.heroInfoY._text= "hero_y : "

        //score
        this.ScoreInfo = new Textbox()
        this.ScoreInfo.position = {x:0, y:0}
        this.ScoreInfo._text= "Score : "

        // mapLeft
        this.mapInfoL = new Textbox()
        this.mapInfoL.position = {x: 500, y:0}
        this.mapInfoL._text = "mapLeft : "

        // mapRight
        this.mapInfoR = new Textbox()
        this.mapInfoR.position = {x: 500, y:80}
        this.mapInfoR._text = "mapRight : "
    }

    loadBackground()
    {
        this.background = new Framework.Sprite(define.imagePath + 'background.jpg');
        this.background.position = 
        {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        }
        this.background.scale = 2;
    }
    loadPrincess()
    {
        this.princessPos = {x:2200, y:100}
        
        this.princessOps = 
        { 
            label: 'princess', 
            friction: 0.05, 
            density:0.002,
            isStatic: false
        }

        this.princess =new Character('images/princess.png', 
                                        this.matter,
                                        this.princessOps,
                                        this.princessPos)
        this.princess.load()
        this.princess.initialize()
    }
    load()
    {
        this.loadTextbox()
        this.loadBackground()
        this.loadPrincess()
    }
    
    init()
    {   
        //方塊矩陣
        this.floorsArray = []
        this.wallsArray = []
        for(var i=0; i<this.mapArray.length; i++)
        {
            var line = this.mapArray[i];
            for(var j=0; j<line.length; j++)
            {
                if(line[j] != 0)
                {
                    var tile = new MapTile(this.matter, line[j])
                    tile.load()
                    tile.initialize()
                    tile.setPosition({x:j,y:i})
                    if(tile.tileType === 1)
                    {
                        // console.log("tileType = 1")
                        this.floorsArray.push(tile)
                    }
                    else if(tile.tileType === 2)
                    {
                        // console.log("tileType = 2")
                        this.wallsArray.push(tile)
                    }
                }
            }
        }
    }

    update(heroPosition_x, cameraPosition_x)
    {
        //檢查金幣(公主是否出現)
        if (this.score === 3)
        {
            if(!(this.isPrincess))
            {
                this.isPrincess = true
            }
            this.princess.update()
        }

        // this.floorsArray = []
        // this.wallsArray = []

        //更新地圖方塊
        for	(var i = 0; i<this.floorsArray.length; i++)
        {
            this.floorsArray[i].update(heroPosition_x, cameraPosition_x)
        }
        for	(var i = 0; i<this.wallsArray.length; i++)
        {
            this.wallsArray[i].update(heroPosition_x, cameraPosition_x)
        }
        

        // for	(var i = 0; i<this.floorsArray.length; i++)
        // {
        //     this.floorsArray[i].update(cameraPosition_x)
        // }
        // for	(var i = 0; i<this.wallsArray.length; i++)
        // {
        //     this.wallsArray[i].update(cameraPosition_x)
        // }

        //更新地圖x,y軸資訊和金幣數
        this.mapInfoL._value = this.mapLeft
        this.mapInfoR._value = this.mapRight
        this.ScoreInfo._value = this.score

        
    }
    draw(Ctx)
    {
        this.background.draw(Ctx)

        for(var i=0; i<this.floorsArray.length; i++)
        {
            this.floorsArray[i].draw()
        }
        for(var i=0; i<this.wallsArray.length; i++)
        {
            this.wallsArray[i].draw()
        }

        this.heroInfoX.draw(Ctx)
        this.heroInfoY.draw(Ctx)
        this.ScoreInfo.draw(Ctx)
        this.mapInfoL.draw(Ctx)
        this.mapInfoR.draw(Ctx)

        if(this.score ===3){
            this.princess.draw(Ctx)
        }
    }
}