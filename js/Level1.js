class Level1 extends Framework.Level 
{
    constructor()
    {
        super() // 繼承
        this.matter = new Framework.Matter() // 宣告this.matter 並建立物理世界MatterUtil.js
        
        // hero & coin 的碰撞 和 hero & princess 的碰撞
        this.collisionBlockQs = this.collisionStartBetweenQ_hero.bind(this)
        this.collisionPrincess = this.collisionStartBetweenPrincess_Hero.bind(this)
        
        // 初始分數 （吃金幣的數量）
        this.score = 0
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
        this.rootScene.attach(this.hero.sprite)
    }
    loadPrincess()
    {
        this.princessPos = {x:1380, y:670}
        
        this.princessOps = 
        { 
            label: 'princess', 
            friction: 0.05, 
            density:0.002
        }

        this.princess =new Character('images/princess.png', 
                                        this.matter,
                                        this.princessOps,
                                        this.princessPos)
        this.princess.load()
        this.princess.initialize()
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
        
        this.floorOps = 
        {
            label: 'floor', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }

        this.mapfloor = []
        for (var i = 0; i < this.mapfloorValue.length; i++)
        {
            this.mapfloor[i] = new floor('images/floor2.png', 
                                            this.matter, 
                                            this.floorOps)
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
    loadCoin()
    {
        this.blockCValue =
        [
            {x: 500, y: 500},
            {x: 800, y: 500},
            {x: 1100, y: 500},
        ]

        this.coinOps = 
        {
            label: 'Coin', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:true
        }

        this.blockCs = []
        for (var i = 0; i < this.blockCValue.length; i++)
        {
            this
            this.blockCs[i] = new block('images/coin.png', 
                                            this.matter,
                                            this.coinOps)
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

    loadAudio()
    {
        this.audio = new Framework.Audio(
        {
            bgm1: {mp3: 'music/bgm1.mp3'},
            coin: {mp3: 'music/coin.mp3'},
            jump: {mp3: 'music/jump.mp3'},
            haha: {wav: 'music/haha.wav'}
        })
    }

    load() 
    {
        // console.log(this.viewCenter)

        this.loadBackground()
        this.loadHero()
        this.loadGround()
        this.loadTextbox()
        this.loadCoin()
        this.loadPrincess()

        this.loadAudio()
        // this.audio.play({name: 'bgm1', loop: true})
        // 載入 collision
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
            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                this.mapfloor[i].component.position = 
                {
                    x: this.mapfloorValue[i].x - this.hero.component.position.x + 750,
                    y: this.mapfloorValue[i].y
                }
            }
            this.princess.component.position.x = this.princessPos.x - this.hero.component.position.x + 750
        }
        if (this.hero.component.position.x > 750)
        {
            for	(var i = 0; i<this.blockCValue.length; i++)
            {
                this.blockCs[i].component.position = 
                {
                    x: this.blockCValue[i].x - this.hero.component.position.x + 750,
                    y: this.blockCValue[i].y
                }
            }
        }
    }
    draw(parentCtx) 
    {
        this.heroInfoX.draw(parentCtx)
        this.heroInfoY.draw(parentCtx)
        this.ScoreInfo.draw(parentCtx)
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
            this.audio.play({name: 'jump'})
            this.hero.isWalking = 3
            
        }
        if(e.key === 'A') 
        {
            // left
            this.hero.isWalking = 2
            this.hero.animationGoLeft()
        }
        if(e.key === 'D') 
        {
            // right  
            this.hero.isWalking = 1
            this.hero.animationGoRight()
        }
    }
    keyup(e, list)
    {
        if(e.key === 'D' || e.key === 'A' || e.key === 'W')
        {
            this.hero.isWalking = 0;
            this.hero.animationStand()
        }
    }

    collisionStartBetweenQ_hero(event)
    {
        // console.log(this)
        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            
            var pair = pairs[i];

            for (var k = 0; k < this.blockCValue.length; k++)
            {
                if (pair.bodyA === this.blockCs[k].component.body) 
                {
                    // console.log("collision1")
                    //hero 和 blockQs 碰撞
                    this.blockCs[k].pic = null
                    this.matter.removeBody(this.blockCs[k].component.body)
                    this.score += 1
                    this.audio.play({name: 'coin'})
                    
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
            if (pair.bodyA === this.princess.component.body && pair.bodyB === this.hero.component.body) 
            {
                console.log("collision1")
                
            } 
            else if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
            {
                console.log("The End")
                this.audio.play({name: 'haha'})
                // Framework.Game.goToNextLevel()
            }
        }
    }
};
