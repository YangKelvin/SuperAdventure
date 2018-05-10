class Level1 extends Framework.Level 
{
    constructor()
    {
        super() // 繼承

        // 宣告this.matter 並建立物理世界MatterUtil.js
        this.matter = new Framework.Matter() 
        
        // hero & coin 的碰撞 和 hero & princess 的碰撞
        this.collisionBlocks = this.collisionStart.bind(this)

        this.isPressWalk = false
        this.walkDirection = 0
        this.score = 0
        this.isPrincess = false
    }

    loadCamera()
    {
        this.cameraPos = {x:200, y:-100}

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
    loadGround()
    {
        // floor
        this.mapfloorsValue = 
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

                //硬幣平台
                {x: 1500, y: 250},
                {x: 1570, y: 250},
                {x: 1640, y: 250},
                {x: 1990, y: 350},
                {x: 2060, y: 350},
                {x: 2130, y: 350},
                {x: 1080, y: 450},
                {x: 1150, y: 450},
                {x: 1220, y: 450},
            ]
        
        this.floorOps = 
        {
            label: 'floor', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }

        this.mapfloors = new Array()
        for (var i = 0; i < this.mapfloorsValue.length; i++)
        {
            this.mapfloors[i] = new floor('images/grass.png', 
                                            this.matter, 
                                            this.floorOps)
            this.mapfloors[i].load()
            this.mapfloors[i].initialize()
            this.mapfloors[i].component.position = this.mapfloorsValue[i]

            this.rootScene.attach(this.mapfloors[i])
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
    loadCoin()
    {
        this.blockCValue =
        [
            {x: 1570, y: 100},
            {x: 2060, y: 200},
            {x: 1150, y: 300},
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

        // console.log(this.blockCs[0].component.position)
        // console.log(this.blockCs[0].component.sprite.position)
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

    loadMonster()
    {
        
    }

    load() 
    {
        // console.log(this.viewCenter)
        this.loadBackground()
        this.loadHero()
        this.loadGround()
        this.loadCoin()
        this.loadPrincess()
        this.loadCamera()
        // this.loadAudio()
        // this.loadMap1()
        // this.audio.play({name: 'bgm1', loop: true})
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlocks))
    }

    initialize() 
    {
        
    }

    update() 
    {
        // console.log(this.mapfloors[0].component.position)
        // console.log(this.mapfloors[0].component.sprite.position)
        super.update()
        // console.log(this.mapfloors[1].component.position)
        
        
        //#region map move
        if (this.hero.component.position.x >= 500)
        {
            // move floors
            for	(var i = 0; i<this.mapfloors.length; i++)
            {
                this.mapfloors[i].component.position = 
                {
                    x: this.mapfloorsValue[i].x - this.camera.component.position.x + 500 + this.mapfloors[i].component.sprite.width / 2,
                    y: this.mapfloorsValue[i].y + this.mapfloors[i].component.sprite.height / 2
                }   
            }
            // move princess
            this.princess.component.position.x = this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width/2
            
            // move coinBlock
            for	(var i = 0; i<this.blockCValue.length; i++)
            {
                this.blockCs[i].component.position = 
                {
                    x: this.blockCValue[i].x - this.camera.component.position.x + 500 + this.blockCs[i].component.sprite.width / 2,
                    y: this.blockCValue[i].y + this.blockCs[i].component.sprite.height / 2
                }

            }

            // move walls
            for	(var i = 0; i<this.mapWalls.length; i++)
            {
                this.mapWalls[i].component.position = 
                {
                    x: this.mapWallsValue[i].x - this.camera.component.position.x + 500 + this.mapWalls[i].component.sprite.width / 2,
                    y: this.mapWallsValue[i].y + this.mapWalls[i].component.sprite.height / 2
                }
            }
        }
        //#endregion update

        //#region update
        
        this.hero.update()
        this.matter.update()
        // this.map1.update()
        this.rootScene.update()
        this.camera.update()
        // console.log(this.mapfloors[0].component.position)
        // console.log(this.tempx)
        
        
        if (this.score <=3)
        {
            if(!(this.isPrincess))
            {
                this.rootScene.attach(this.princess.pic)
                this.isPrincess = true
            }
            this.princess.update()
            // console.log(this.princess.component.body.angle)
            console.log(this.score)
        }


        // textBox
        // this.map1.heroInfoX._value = Math.round(this.hero.component.position.x)
        // this.map1.heroInfoY._value = Math.round(this.hero.component.position.y)
        // this.map1.mapInfoL._value = this.camera.component.position.x

        //#endregion


        //#region hero move
        if (this.isPressWalk === true)
        {
            if (this.walkDirection === 1)   // right
            {
                // this.hero.goRight()
                this.camera.goRight()
            }
            if (this.walkDirection === 2 && this.camera.component.position.x > 200)   // left
            {
                // this.hero.goLeft()
                this.camera.goLeft()
            }
            if (this.walkDirection === 3)   // jump
            {
                this.hero.jump()
            }
        }
        if (this.camera.component.position.x <= 500)
        {
            this.hero.component.position.x = this.camera.component.position.x
        }
        else if (this.camera.component.position.x > 500)
        {
            this.hero.component.position.x = 500
        }

        if (this.camera.component.position.x <= 200)
        {
            this.camera.component.position.x = 200
        }
        //#endregion
    }
    draw(parentCtx) 
    {
        
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
            // this.audio.play({name: 'jump'})
            this.hero.isWalking = 3
            
        }
        if(e.key === 'A') 
        {
            // left
            this.isPressWalk = true
            this.walkDirection = 2
            this.hero.animationGoLeft()
        }
        if(e.key === 'D') 
        {
            // right  
            this.isPressWalk = true
            this.walkDirection = 1
            this.hero.animationGoRight()
        }
    }
    keyup(e, list)
    {
        if(e.key === 'D' || e.key === 'A' || e.key === 'W')
        {
            this.isPressWalk = false
            this.hero.isWalking = 0
            this.walkDirection = 0
            this.hero.animationStand()
        }
    }

    collisionStart(event)
    {
        // console.log(this)
        
        var pairs = event.pairs;


        // collision between blockCoin and hero
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            
            var pair = pairs[i];

            for (var k = 0; k < this.blockCValue.length; k++)
            {
                if (pair.bodyA === this.blockCs[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    // console.log("collision1")
                    this.score += 1
                    this.blockCs[k].pic = null
                    this.matter.removeBody(this.blockCs[k].component.body)
                    // this.audio.play({name: 'coin'})
                } 
            }
        }
        
        // collision between hero and princess
        if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
        {
            console.log("The End")
            // this.audio.play({name: 'haha'})
            // Framework.Game.goToNextLevel()
        }
    }
};
