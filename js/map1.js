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
        //this.rootScene.attach(this.background)
    }
    loadHero()
    {
        //new animation
        this.heroPos = {x:200, y:600}

        // animationSprite 的 options
        this.animationOps = 
        {
            position: this.heroPos, 
            goRight: {from: 4, to: 7}, 
            goLeft: {from:8, to: 11}
        }

        // heroComponent 的 options
        this.heroOps = 
        {
            label: 'hero', 
            friction: 0.05, 
            density:0.002
        }

        this.hero = new AnimationCharacter('images/hero.png', 
                                            this.animationOps, 
                                            this.matter, 
                                            this.heroPos, 
                                            this.heroOps)

        this.hero.load()
        this.hero.initialize()

        this.hero.animationStand()
        //this.rootScene.attach(this.hero.sprite)
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
        //this.loadHero()
        this.loadPrincess()
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
        //super.update()

        //textBox
        //this.heroInfoX._value = Math.round(this.hero.component.position.x)
        //this.heroInfoY._value = Math.round(this.hero.component.position.y)

        //this.hero.update()
        if (this.score === 3)
        {
            if(!(this.isPrincess))
            {
                this.isPrincess = true
            }
            this.princess.update()
        }

        this.mapInfoL._value = this.mapLeft
        this.mapInfoR._value = this.mapRight
        this.ScoreInfo._value = this.score
        //this.camera.update()

    }
    draw(Ctx)
    {
        this.background.draw(Ctx)

        this.heroInfoX.draw(Ctx)
        this.heroInfoY.draw(Ctx)
        this.ScoreInfo.draw(Ctx)
        this.mapInfoL.draw(Ctx)
        this.mapInfoR.draw(Ctx)

        if(this.score ===3){
            this.princess.draw(Ctx)
        }
        //this.hero.sprite.draw(Ctx)
    }
}