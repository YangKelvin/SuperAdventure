class Level1 extends Framework.Level 
{
    constructor()
    {
        super()
        this.matter = new Framework.Matter() //宣告this.matter 並建立物理世界MatterUtil.js
        this.viewCenter = 
        {
            x: this.matter.render.options.width * 0.5,
            y: this.matter.render.options.height * 0.5,
        }
        this.collisionBlockQs = this.collisionStartBetweenQ_hero.bind(this)
        this.collisionPrincess = this.collisionStartBetweenPrincess_Hero.bind(this)
        this.score = 0
    }

    loadAnimationCharacter()
    {
        this.ACharacter = new AnimationCharacter('images/character.png',
            {
                position: {x:500, y:600}, goRight: {from: 0, to: 7}, goLeft: {from:8, to: 15}
            })
        // this.ACharacter.sprite.isDrawBoundry = true
        this.rootScene.attach(this.ACharacter.sprite)
    }

    loadHero()
    {
        // this.heroPic = new Framework.Sprite('images/character2.png')
        this.characterPosition = {x: 200, y :600}
        this.hero = new Character(this.matter, 'images/Character2.png', this.characterPosition)
        this.hero.load()
        this.hero.initialize()
        this.heroPosition = {x:500, y:200}
        this.hero.component.position = this.heroPosition
        this.rootScene.attach(this.hero.pic)
    }
    loadPrincess()
    {
        // this.princessPic = new Framework.Sprite('images/princess.png')
        this.princess =new Character(this.matter, 'images/princess.png')
        this.princess.load()
        this.princess.initialize()
        this.princessPosition = {x:900, y:200}
        this.princess.component.position = this.princessPosition
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
                {x: 2065, y: 782},
                {x: 2185, y: 782},
                {x: 2125, y: 782},

                
                // {x: 2005, y: 782},

                {x: 2185, y: 782},
                {x: 2245, y: 782},
                {x: 2305, y: 782},
                {x: 2365, y: 782},
                // {x: 2005, y: 782},
                // {x: 2005, y: 782},
                // {x: 2005, y: 782},
                // {x: 2005, y: 782},







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
        for (var i = 0; i < this.mapfloorValue.length; i++)
        {
            this.rootScene.attach(this.mapfloor[i])
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
        this.rootScene.attach(this.background)
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
    }
    loadBlockC()
    {
        this.blockCValue =
        [
            {x: 500, y: 500},
            {x: 800, y: 500},
            {x: 1100, y: 500},
        ]
        this.blockCs = new Array()
        for (var i = 0; i < this.blockCValue.length; i++)
        {
            this
            this.blockCs[i] = new block(this.matter)
            this.blockCs[i].load()
            this.blockCs[i].initialize()
            this.blockCs[i].component.position = this.blockCValue[i]
            // this.blockCs[i].component.body.isSensor = true
        }
        for (var i = 0; i < this.blockCValue.length; i++)
        {
            this.rootScene.attach(this.blockCs[i])
        }
    }    

    load() 
    {
        console.log(this.viewCenter)
        

        this.loadBackground()
        this.loadHero()
        this.loadGround()
        this.loadTextbox()
        this.loadBlockC()
        this.loadPrincess()

        this.loadAnimationCharacter()
        this.ACharacter.goRight()
        // console.log(this.hero.component.body)
        // console.log(this.blockQs[0].component.body)
        // 載入
        this.matter.addEventListener("collisionStart",(this.collisionBlockQs))
        this.matter.addEventListener("collisionStart",(this.collisionPrincess))
        
    }

    initialize() 
    {
        
    }

    update() 
    {
        //#region update
        super.update()
        this.matter.update()
        this.rootScene.update()
        this.hero.update()
        if (this.score === 3)
        {

            this.rootScene.attach(this.princess.pic)
            this.princess.update()
        }
        //#endregion

        this.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.heroInfoY._value = Math.round(this.hero.component.position.y)
        
        this.ScoreInfo._value = this.score


        //move map
        if (this.hero.component.position.x > 750)
        {
            // console.log("move map")
            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                // this.mapfloor[i].matter.setBody(this.mapfloor[i].component.body, "velocity", {x: -5, y:/*this.mapfloor[i].component.body.velocity.y*/0})
                this.mapfloor[i].component.position = 
                {
                    x: this.mapfloorValue[i].x - (this.hero.component.position.x - 600),
                    y: this.mapfloorValue[i].y
                }
            }
        }

        if (this.hero.component.position.x > 750)
        {
            // console.log("move map")
            for	(var i = 0; i<this.blockCValue.length; i++)
            {
                // this.mapfloor[i].matter.setBody(this.mapfloor[i].component.body, "velocity", {x: -5, y:/*this.mapfloor[i].component.body.velocity.y*/0})
                this.blockCs[i].component.position = 
                {
                    x: this.blockCValue[i].x - (this.hero.component.position.x - 600),
                    y: this.blockCValue[i].y
                }
            }
        }
        // console.log(this.hero.pic.width + " " + this.hero.component.width)
        
        // console.log(this.ACharacter.url)
    }
    draw(parentCtx) 
    {
        // this.rootScene.draw(parentCtx);
        // this.background.draw(parentCtx);
        // this.hero.draw(parentCtx)
        // if (this.score === 3)
        // {
        //     this.princess.draw(parentCtx)
        // }
        // for (var i = 0; i < this.mapfloorValue.length; i++)
        // {
        //     this.mapfloor[i].draw(parentCtx)
        // }
        // for (var i = 0; i < this.blockCValue.length; i++)
        // {
        //     this.blockCs[i].draw(parentCtx)
        // }
        
        this.heroInfoX.draw(parentCtx)
        this.heroInfoY.draw(parentCtx)

        this.ScoreInfo.draw(parentCtx)
    }

    keydown(e)
    {
        if(e.key === 'P') 
        {
            // console.log(this.hero.component.body)
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

    collisionStartBetweenQ_hero(event)
    {
        // console.log(this)
        var pairs = event.pairs;
        // console.log("pairs.length = " + pairs.length)
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            
            var pair = pairs[i];
            // console.log(pair.bodyA)
            // console.log(this.blockQs[0])

            for (var k = 0; k < this.blockCValue.length; k++)
            {
                if (pair.bodyA === this.blockCs[k].component.body) 
                {
                    // console.log("collision1")
                    //hero 和 blockQs 碰撞
                    this.blockCs[k].pic = null
                    this.matter.removeBody(this.blockCs[k].component.body)
                    this.score += 1
                    
                } 
                else if (pair.bodyB === this.blockCs[k].component.body) 
                {
                    console.log("collision2")
                    this.matter.removeBody(this.blockCs[k].component.body)

                }
            }

            
        }
    }
    collisionStartBetweenPrincess_Hero(event)
    {
        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            
            var pair = pairs[i];
            // console.log(pair.bodyA)
            // console.log(this.blockQs[0])
            if (pair.bodyA === this.princess.component.body && pair.bodyB === this.hero.component.body) 
            {
                console.log("collision1")
                
            } 
            else if (pair.bodyB === this.princess.component.body) 
            {
                console.log("The End")
                // Framework.Game.goToNextLevel()
            }
        }
    }
};
