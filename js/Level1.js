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
        
        this.mapLeft = 0
        this.mapRight = 0

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
        this.princessPos = {x:2365, y:670}
        
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
    loadGround()
    {
        // floor
        this.mapfloorValue = 
            [
                // ground
                {x: 30, y: 780},
                {x: 100, y: 780},
                {x: 170, y: 780},
                {x: 240, y: 780},
                {x: 310, y: 780},
                {x: 380, y: 780},
                {x: 450, y: 780},
                {x: 520, y: 780},
                {x: 590, y: 780},
                {x: 660, y: 780},
                {x: 730, y: 780},
                {x: 800, y: 780},
                {x: 870, y: 780},
                {x: 940, y: 780},
                {x: 1010, y: 780},
                {x: 1080, y: 780},
                {x: 1150, y: 780},
                {x: 1220, y: 780},
                {x: 1290, y: 780},
                {x: 1360, y: 780},
                {x: 1430, y: 780},
                {x: 1500, y: 780},
                {x: 1570, y: 780},
                {x: 1640, y: 780},
                {x: 1710, y: 780},
                {x: 1780, y: 780},
                {x: 1850, y: 780},
                {x: 1920, y: 780},
                {x: 1990, y: 780},
                {x: 2060, y: 780},
                {x: 2130, y: 780},
                {x: 2200, y: 780},
                {x: 2270, y: 780},
                {x: 2340, y: 780},
                {x: 2410, y: 780},
                {x: 2480, y: 780},
                {x: 2550, y: 780},
                {x: 2620, y: 780},
                {x: 2690, y: 780},
            ]
        
        this.floorOps = 
        {
            label: 'floor', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }

        this.mapfloor = new Array()
        for (var i = 0; i < this.mapfloorValue.length; i++)
        {
            this.mapfloor[i] = new floor('images/grass.png', 
                                            this.matter, 
                                            this.floorOps)
            this.mapfloor[i].load()
            this.mapfloor[i].initialize()
            this.mapfloor[i].component.position = this.mapfloorValue[i]

            this.rootScene.attach(this.mapfloor[i])
        }
        
        this.wallOps = 
        {
            label : 'wall',
            friction: 0.05,
            density: 0.002,
            isStatic: true
        }
        this.mapWallsValue = 
        [
            {x: 30, y: 710},
            {x: 30, y: 640},
            {x: 30, y: 570},
            {x: 30, y: 500},
            {x: 30, y: 430},
            {x: 30, y: 360},
            {x: 30, y: 290},
            {x: 30, y: 220},
            {x: 30, y: 150},
            {x: 30, y: 80},
        ]
        this.mapWalls = new Array()
        for (var i = 0; i < this.mapWallsValue.length; i++)
        {
            this.mapWalls[i] = new floor('images/brickWall.png',
                                            this.matter,
                                            this.wallOps)
            this.mapWalls[i].load()
            this.mapWalls[i].initialize()
            this.mapWalls[i].component.position = this.mapWallsValue[i]

            this.rootScene.attach(this.mapWalls[i])
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

        // mapLeft
        this.mapInfoL = new Textbox()
        this.mapInfoL.position = {x: 500, y:0}
        this.mapInfoL._text = "mapLeft : "

        // mapRight
        this.mapInfoR = new Textbox()
        this.mapInfoR.position = {x: 500, y:80}
        this.mapInfoR._text = "mapRight : "
    }
    loadCoin()
    {
        this.blockCValue =
        [
            {x: 1564, y: 400},
            {x: 2014, y: 200},
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

        this.blockCs = new Array()
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
        this.audio.play({name: 'bgm1', loop: true})
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
        if (this.hero.component.position.y >= 1000)
        {
            this.hero.isLive = false
        }

        // textBox
        this.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.heroInfoY._value = Math.round(this.hero.component.position.y)
        this.mapInfoL._value = this.mapLeft
        this.mapInfoR._value = this.mapRight

        if (!this.hero.isLive)
        {
            this.heroInfoX._text = "GAME OVER"
            this.heroInfoX._value = ""

            this.heroInfoX._text = "GAME OVER"
            this.heroInfoX._value = ""
        }
        //#endregion


        
        
        this.ScoreInfo._value = this.score

        //move map
        if (this.hero.component.position.x > 500)
        {
            // move floors
            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                this.mapfloor[i].component.position = 
                {
                    x: this.mapfloorValue[i].x - this.hero.component.position.x + 500,
                    y: this.mapfloorValue[i].y
                }   
            }

            // move princess
            this.princess.component.position.x = this.princessPos.x - this.hero.component.position.x + 500
            
            // move coinBlock
            for	(var i = 0; i<this.blockCValue.length; i++)
            {
                this.blockCs[i].component.position = 
                {
                    x: this.blockCValue[i].x - this.hero.component.position.x + 500,
                    y: this.blockCValue[i].y
                }
            }

            // move walls
            for	(var i = 0; i<this.mapWalls.length; i++)
            {
                this.mapWalls[i].component.position = 
                {
                    x: this.mapWallsValue[i].x - this.hero.component.position.x + 500,
                    y: this.mapWallsValue[i].y
                }
            }
        }
    }
    draw(parentCtx) 
    {
        this.heroInfoX.draw(parentCtx)
        this.heroInfoY.draw(parentCtx)
        this.ScoreInfo.draw(parentCtx)
        this.mapInfoL.draw(parentCtx)
        this.mapInfoR.draw(parentCtx)
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
                // else if (pair.bodyB === this.blockCs[k].component.body) 
                // {
                //     console.log("collision2")
                //     this.matter.removeBody(this.blockCs[k].component.body)

                // }
            }
        }
    }
    collisionStartBetweenPrincess_Hero(event)
    {
        var pairs = event.pairs;

        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];
            // if (pair.bodyA === this.princess.component.body && pair.bodyB === this.hero.component.body) 
            // {
            //     console.log("collision1")
                
            // } 
            if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
            {
                console.log("The End")
                this.audio.play({name: 'haha'})
                // Framework.Game.goToNextLevel()
            }
        }
    }
};
