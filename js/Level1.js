class Level1 extends Framework.Level 
{
    constructor()
    {
        super()
        this.matter = new Framework.Matter() //宣告this.matter 並建立物理世界MatterUtil.js
    }
    loadHero()
    {
        this.hero = new Character(this.matter)
        this.hero.load()
        this.hero.initialize()
        this.heroPosition = {x:500, y:200}
        this.hero.component.position = this.heroPosition
    }
    loadGround()
    {
        
        this.mapfloorValue = 
            [
                {x: 30, y: 782},
                {x: 95, y: 782},
                {x: 155, y: 782},
                {x: 215, y: 782},
                {x: 275, y: 782},
                {x: 335, y: 782},
                {x: 395, y: 782},
                {x: 455, y: 782},
                {x: 515, y: 782},
                {x: 575, y: 782},
                {x: 635, y: 782},
                {x: 695, y: 782},
                {x: 755, y: 782},
                {x: 815, y: 782},
                {x: 875, y: 782},
                {x: 935, y: 782},
                {x: 995, y: 782},
                {x: 1055, y: 782},
                {x: 1115, y: 782},
                {x: 1175, y: 782},
                {x: 1235, y: 782},
                {x: 1295, y: 782},
                {x: 1355, y: 782},
                {x: 1415, y: 782},
                {x: 1475, y: 782},
                {x: 1535, y: 782},
                {x: 1595, y: 782},
                {x: 1655, y: 782},
                {x: 1715, y: 782},
                {x: 1775, y: 782},
                {x: 1835, y: 782},
                {x: 1895, y: 782},
                {x: 1955, y: 782},
                {x: 2245, y: 782},
                {x: 2185, y: 782},
                {x: 2125, y: 782},
                {x: 2065, y: 782},
                {x: 2005, y: 782},

                {x: 2245, y: 722},//牆壁
                {x: 2245, y: 662},//牆壁
                {x: 2245, y: 602},//牆壁
                {x: 2245, y: 542},//牆壁
                {x: 2245, y: 482},//牆壁
                {x: 2245, y: 422},//牆壁
                {x: 2245, y: 362},//牆壁

                
                {x: 1500, y: 500},
                {x: 1800, y: 400},
                {x: 1950, y: 300},
                {x: 95, y: 700},
                {x: 155, y: 700},
                {x: 215, y: 700},
            ]
        
        this.mapfloor = new Array()
        for (var i = 0; i < this.mapfloorValue.length; i++)
        {
            this.mapfloor[i] = new floor(this.matter)
            this.mapfloor[i].load()
            this.mapfloor[i].initialize()
            this.mapfloor[i].component.position = this.mapfloorValue[i]
        }
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
    loadTextbox()
    {
        this.heroInfoX = new Textbox()
        this.heroInfoX.position = {x:1000, y:0}
        this.heroInfoX._text= "hero_x : "

        this.heroInfoY = new Textbox()
        this.heroInfoY.position = {x:1000, y:80}
        this.heroInfoY._text= "hero_y : "
    }
    loadBlockQ()
    {
        this.blockQValue =
        [
            {x: 500, y: 500},
        ]
        this.blockQs = new Array()
        for (var i = 0; i < this.blockQValue.length; i++)
        {
            this.blockQs[i] = new block(this.matter)
            this.blockQs[i].load()
            this.blockQs[i].initialize()
            this.blockQs[i].component.position = this.blockQValue[i]
        }
    }
    load() 
    {
        this.loadBackground()
        this.loadHero()
        this.loadGround()
        this.loadTextbox()
        this.loadBlockQ()
    }

    initialize() 
    {
        //#region attach 
        this.rootScene.attach(this.background)
        this.rootScene.attach(this.hero.pic)
        for (var i = 0; i < this.mapfloorValue.length; i++)
        {
            this.rootScene.attach(this.mapfloor[i])
        }
        for (var i = 0; i < this.blockQValue.length; i++)
        {
            this.rootScene.attach(this.blockQs[i])
        }
        //#endregion
    }

    update() 
    {
        //#region update
        super.update()
        this.matter.update()
        this.rootScene.update()
        this.hero.update()
        //#endregion

        this.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.heroInfoY._value = Math.round(this.hero.component.position.y)

        if (this.hero.component.position.x > 750)
        {
            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                this.mapfloor[i].component.position = 
                {
                    x: this.mapfloorValue[i].x - (this.hero.component.position.x - 750),
                    y: this.mapfloorValue[i].y
                }
            }
        }
        // console.log(this.hero.pic.width + " " + this.hero.component.width)
    }
    draw(parentCtx) 
    {
        this.rootScene.draw(parentCtx);
        this.background.draw(parentCtx);
        this.hero.draw(parentCtx)
        
        for (var i = 0; i < this.mapfloorValue.length; i++)
        {
            this.mapfloor[i].draw(parentCtx)
        }
        for (var i = 0; i < this.blockQValue.length; i++)
        {
            this.blockQs[i].draw(parentCtx)
        }
        
        this.heroInfoX.draw(parentCtx)
        this.heroInfoY.draw(parentCtx)
    }

    keydown(e)
    {
        if(e.key === 'P') 
        {
            this.matter.toggleRenderWireframes()   
        }

        if(e.key === 'W') 
        {
            // jump
            this.hero.isWalking = 3
        }
        if(e.key === 'A') 
        {
            // left
            this.hero.isWalking = 2
        }
        if(e.key === 'D') 
        {
            // right  
            this.hero.isWalking = 1
        }
    }
    keyup(e, list)
    {
        if(e.key === 'D' || e.key === 'A' || e.key === 'W')
        {
            this.hero.isWalking = 0;
        }
    }
};
