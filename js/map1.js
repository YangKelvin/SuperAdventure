class Map1 extends Framework.Level 
{
    constructor(map, _matter)
    {
        super()
        this.mapArray = map
        this.matter = _matter

        //是否移動 和 移動方向
        this.pressWalk = false
        this.walkDirection = 0

        //硬幣數量初始, 地圖左右座標初始
        this.score = 0
        this.mapLeft = 0
        this.mapRight = 0
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

    loadCamera()
    {
        this.cameraPos = {x:200, y:200}

        this.cameraOps = 
        {
            label: 'camera', 
            friction: 0.05, 
            // frictionAir: 99999,
            density:0.002,
            // isStatic: true
        }

        this.camera = new Camera('images/brickWall.png',
                                        this.matter,
                                        this.cameraOps,
                                        this.cameraPos
        )

        this.camera.load()
        this.camera.initialize()
        this.rootScene.attach(this.camera.pic)
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
        this.rootScene.attach(this.background)
    }

    load()
    {
        this.loadTextbox()
        //this.loadCamera()
        this.loadBackground()
    }
    
    init()
    {   
        //方塊矩陣
        // this.tileArray = []
        // for(var i=0; i<this.mapArray.length; i++)
        // {
        //     var line = this.mapArray[i];
        //     for(var j=0; j<line.length; j++)
        //     {
        //         var tile = new MapTile();
        //         tile.setPosition({x:j,y:i})
        //         tile._tileType = line[j];
        //         this.tileArray.push(tile);
        //     }
        // }
    }

    update()
    {
        //this.camera.update()

        //#region hero move
        // if (this.pressWalk === true)
        // {
        //     if (this.walkDirection === 1)   // right
        //     {
        //         // this.hero.goRight()
        //         this.camera.goRight()
        //     }
        //     if (this.walkDirection === 2)   // left
        //     {
        //         // this.hero.goLeft()
        //         this.camera.goLeft()
        //     }
        //     if (this.walkDirection === 3)   // jump
        //     {
        //         this.hero.jump()
        //     }
        // }
        // if (this.camera.component.position.x <= 500)
        // {
        //     this.hero.component.position.x = this.camera.component.position.x
        // }
        // else if (this.camera.component.position.x > 500)
        // {
        //     this.hero.component.position.x = 500
        // }
        //#endregion

        //textBox
        //this.heroInfoX._value = Math.round(this.hero.component.position.x)
        //this.heroInfoY._value = Math.round(this.hero.component.position.y)
        this.mapInfoL._value = this.mapLeft
        this.mapInfoR._value = this.mapRight
        this.ScoreInfo._value = this.score

        //this.camera.update()
    }
    draw(parentCtx)
    {
        this.heroInfoX.draw(parentCtx)
        this.heroInfoY.draw(parentCtx)
        this.ScoreInfo.draw(parentCtx)
        this.mapInfoL.draw(parentCtx)
        this.mapInfoR.draw(parentCtx)
    }
}