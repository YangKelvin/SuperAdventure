class LevelTest extends Framework.Level 
{
    constructor()
    {
        super() // 繼承

        // 宣告this.matter 並建立物理世界MatterUtil.js
        this.matter = new Framework.Matter() 
        
        // hero & coin 的碰撞 和 hero & princess 的碰撞
        this.collisionBlocks = this.collisionStart.bind(this)


        this.heroAlive = true
        this.isPressWalk = false
        this.isJump = false
        this.walkDirection = 0
        this.score = 0
        this.isPrincess = false

        this.isTriggleTrollBridge = false
        this.bridgeFall = 0

        this.isblockQcollision = false
        this.blockIndex = 0
        this.waitCount = 0
    }

    heroDie()
    {
        // 重置 levelTest
        Framework.Game._levels.splice(3,1,{name : "levelTest", level : new LevelTest()})
        Framework.Game.userIQ -= 50
        Framework.Game.goToLevel("dieScreen")
        console.log("hero die")
    }

    //#region  load
    loadCamera()
    {
        this.cameraPos = {x:200, y:930}

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

        this.hero = new AnimationCharacter('images/hero2.png', 
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
        this.princessPos = {x:4200, y:606}
        
        this.princessOps = 
        { 
            label: 'princess', 
            friction: 0.05, 
            density:0.002,
            isStatic: true
        }

        this.princess =new Character('images/princess.png', 
                                        this.matter,
                                        this.princessOps)
        this.princess.load()
        this.princess.initialize()
        this.princess.component.position = this.princessPos
    }
    loadGround()
    {
        // floor
        this.floorsPos = 
            [
                // ground
                {x: 0, y: 780},
                {x: 70, y: 780},
                {x: 140, y: 780},
                {x: 210, y: 780},
                {x: 280, y: 780},
                {x: 350, y: 780},
                {x: 420, y: 780},
                {x: 490, y: 780},
                {x: 560, y: 780},
                {x: 630, y: 780},
                {x: 700, y: 780},
                {x: 770, y: 780},
                {x: 840, y: 780},
                {x: 910, y: 780},
                
                // {x: 980, y: 780},
                // {x: 1050, y: 780},
                // {x: 1120, y: 780},
                // {x: 1190, y: 780},

                {x: 1330, y: 780},
                {x: 1400, y: 780},
                {x: 1470, y: 780},
                {x: 1540, y: 780},
                {x: 1610, y: 780},
                {x: 1680, y: 780},

                //平台開始
                {x: 1680, y: 500},
                {x: 1750, y: 500},
                {x: 1820, y: 220},
                {x: 1960, y: 220},
                {x: 2030, y: 220},
                {x: 1890, y: 500},
                {x: 1960, y: 500},
                {x: 2100, y: 500},
                {x: 2170, y: 500},
                //平台結束

                {x: 1750, y: 780},
                {x: 1820, y: 780},
                {x: 1890, y: 780},
                {x: 1960, y: 780},
                {x: 2030, y: 780},
                {x: 2100, y: 780},
                {x: 2170, y: 780},
                {x: 2240, y: 780},
                {x: 2310, y: 780},
                {x: 2380, y: 780},
                {x: 2450, y: 780},
                {x: 2520, y: 780},
                {x: 2590, y: 780},
                {x: 2660, y: 780},
                {x: 2730, y: 780},
                {x: 2800, y: 780},
                {x: 2870, y: 780},
                {x: 2940, y: 780},
                {x: 3010, y: 780},
                {x: 3080, y: 780},
                {x: 3150, y: 780},
                {x: 3220, y: 780},
                {x: 3290, y: 780},
                {x: 3360, y: 780},
                {x: 3430, y: 780},
                {x: 3500, y: 780},
                {x: 3570, y: 780},
                {x: 3640, y: 780},
                {x: 3990, y: 780},
                {x: 4060, y: 780},
                {x: 4130, y: 780},
                {x: 4200, y: 780},
                {x: 4270, y: 780},
            ]
        
        this.floorOps = 
        {
            label: 'floor', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }

        this.floors = new Array()
        for (var i = 0; i < this.floorsPos.length; i++)
        {
            this.floors[i] = new block('images/grass.png', 
                                            this.matter, 
                                            this.floorOps)
            this.floors[i].load()
            this.floors[i].initialize()
            this.floors[i].component.position = this.floorsPos[i]

            this.rootScene.attach(this.floors[i])
        }
        
        this.wallOps = 
        {
            label : 'wall',
            friction: 0.05,
            density: 0.002,
            isStatic: true
        }
        this.wallsPos = 
        [
            // {x: 30, y: 710},
            // {x: 30, y: 640},
            // {x: 30, y: 570},
            // {x: 30, y: 500},
            // {x: 30, y: 430},
            // {x: 30, y: 360},
            // {x: 30, y: 290},
            // {x: 30, y: 220},
            // {x: 30, y: 150},
            // {x: 30, y: 80},
        ]
        this.walls = new Array()
        for (var i = 0; i < this.wallsPos.length; i++)
        {
            this.walls[i] = new block('images/brickWall.png',
                                            this.matter,
                                            this.wallOps)
            this.walls[i].load()
            this.walls[i].initialize()
            this.walls[i].component.position = this.wallsPos[i]

            this.rootScene.attach(this.walls[i])
        }

    }
    loadCoin()
    {
        this.coinsPos =
        [
            {x: 490, y: 200},
            {x: 1960, y: 100},
            {x: 3010, y: 640},
        ]

        this.coinOps = 
        {
            label: 'Coin', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:true
        }

        this.coins = new Array()
        for (var i = 0; i < this.coinsPos.length; i++)
        {
            this.coins[i] = new block('images/hud_coin.png', 
                                            this.matter,
                                            this.coinOps)
            this.coins[i].load()
            this.coins[i].initialize()
            this.coins[i].component.position = this.coinsPos[i]
            // this.coins[i].component.body.isSensor = true
            this.rootScene.attach(this.coins[i])
        }
        // console.log(this.coins[0].component.position)
        // console.log(this.coins[0].component.sprite.position)
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
    loadTrollBridge()
    {
        this.trollBridgesPos = 
        [
            {x: 980, y: 780},
            {x: 1050, y: 780},
            {x: 1120, y: 780},
            {x: 1190, y: 780},
            {x: 1260, y: 780},
        ]

        this.trollBridgeOps = 
        {
            label: 'trollBridge', 
            friction: 0.05, 
            density:0.002,
            isStatic:true, 
            isSensor:true
        }
        this.trollBridges = new Array()
        for (var i = 0; i < this.trollBridgesPos.length; i++)
        {
            this.trollBridges[i] = new block('images/bridge.png', 
                                            this.matter,
                                            this.trollBridgeOps)
            this.trollBridges[i].load()
            this.trollBridges[i].initialize()
            this.trollBridges[i].component.position = this.trollBridgesPos[i]
            // this.coins[i].component.body.isSensor = true
            this.rootScene.attach(this.trollBridges[i])
        }
    }
    loadPipe()
    {
        this.PipePos = 
        [
            {x: 2660, y: 500},
            {x: 3360, y: 500},
        ]

        this.PipeOps = 
        {
            label: 'Pipe', 
            friction: 0.05, 
            density: 0.002, 
            isStatic:true
        }
        this.Pipes = new Array()
        for (var i = 0; i < this.PipePos.length; i++)
        {
            this.Pipes[i] = new block('images/Pipe.png', 
                                            this.matter,
                                            this.PipeOps)
            this.Pipes[i].load()
            this.Pipes[i].initialize()
            this.Pipes[i].component.position = this.PipePos[i]
            this.rootScene.attach(this.Pipes[i])
        }
    }
    loadBlockQ()
    {
        this.BlockQPos = 
        [
            {x: 280, y: 430},   
            {x: 1820, y: 500},
            {x: 1890, y: 220},
            {x: 2030, y: 500}
        ]
        this.BlockQOps = 
        {
            label: 'BlockQ', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }
        this.BlockQs = []
        for (var i = 0; i < this.BlockQPos.length; i++)
        {
            this.BlockQs[i] = new block('images/blockQ.png', 
                                            this.matter,
                                            this.BlockQOps)
            this.BlockQs[i].load()
            this.BlockQs[i].initialize()
            this.BlockQs[i].component.position = this.BlockQPos[i]
            this.rootScene.attach(this.BlockQs[i])
        }
    }
    loadMonster()
    {
        this.monstersPos = 
        [
            {x: 600, y: 700},
        ]

        this.monsterOps = 
        {
            label: 'Monster', 
            friction: 0.05, 
            density:0.002
        }

        this.monsters = new Array()
        for (var i = 0; i < this.monstersPos.length; i++)
        {
            this.monsters[i] = new Character('images/monster.png',
                                                this.matter,
                                                this.monsterOps,
                                                this.monstersPos)
            this.monsters[i].load()
            this.monsters[i].initialize()
            this.monsters[i].component.position = this.monstersPos[i]
            this.rootScene.attach(this.monsters[i])
        }
    }
    loadICON()
    {
        this.back = new Framework.Sprite(define.imagePath + 'icon-back.png')
        this.back.position =
        {
            x: 60,
            y: 60
        }
        this.back.scale = 0.2
        this.rootScene.attach(this.back)
    }
    //#endregion
    load() 
    {
        // console.log(this.viewCenter)
        Framework.Game.initialize()
        this.loadBackground()
        this.loadTextbox()
        this.loadHero()
        this.loadGround()
        this.loadCoin()
        this.loadPrincess()
        this.loadCamera()
        this.loadTrollBridge()
        this.loadPipe()
        this.loadBlockQ()
        this.loadMonster()
        this.loadICON()
        
        // this.loadAudio()
        // this.audio.play({name: 'bgm1', loop: true})
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlocks))
        console.log("Level1")
        console.log(Framework.Game._levels)
    }

    initialize() 
    {
    }

    update() 
    {
        // super.update()
        // console.log(this.monsters[0].component.position)
        // console.log(this.camera.component.position.y)

        if (this.hero.component.position.y > 1000)
        {
            this.heroAlive = false
        }

        if(this.heroAlive === false)
        {
            console.log("this.heroAlive = flase")
            this.heroDie()
        }

        //#region map move
        if (this.hero.component.position.x >= 500 && this.camera.component.position.x < 3240)
        {
            //#region move floors
            for	(var i = 0; i<this.floors.length; i++)
            {
                this.floors[i].component.position = 
                {
                    x: this.floorsPos[i].x - this.camera.component.position.x + 500 + this.floors[i].component.sprite.width / 2,
                    y: this.floorsPos[i].y + this.floors[i].component.sprite.height / 2
                }   
            }
            //#endregion
            
            //#region move princess
            // this.princess.component.position.x = this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width/2
            this.princess.component.position = 
            {
                x: this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width / 2,
                y: this.princess.component.position.y
            }
            //#endregion
            
            //#region move coinBlock
            for	(var i = 0; i<this.coinsPos.length; i++)
            {
                this.coins[i].component.position = 
                {
                    x: this.coinsPos[i].x - this.camera.component.position.x + 500 + this.coins[i].component.sprite.width / 2,
                    y: this.coinsPos[i].y + this.coins[i].component.sprite.height / 2
                }
            }
            //#endregion
            
            // #region move walls
            for	(var i = 0; i<this.walls.length; i++)
            {
                this.walls[i].component.position = 
                {
                    x: this.wallsPos[i].x - this.camera.component.position.x + 500 + this.walls[i].component.sprite.width / 2,
                    y: this.wallsPos[i].y + this.walls[i].component.sprite.height / 2
                }
            }
            //#endregion

            // #region move Pipe
            for	(var i = 0; i<this.Pipes.length; i++)
            {
                this.Pipes[i].component.position = 
                {
                    x: this.PipePos[i].x - this.camera.component.position.x + 500 + this.Pipes[i].component.sprite.width / 2,
                    y: this.PipePos[i].y + this.Pipes[i].component.sprite.height / 2
                }
            }
            //#endregion

            // #region move blockQ
            for	(var i = 0; i<this.BlockQs.length; i++)
            {
                if (this.isblockQcollision && i === this.blockIndex && this.waitCount < 15)
                {
                    this.BlockQs[i].component.position = 
                    {
                        x: this.BlockQPos[i].x - this.camera.component.position.x + 500 + this.BlockQs[i].component.sprite.width / 2,
                        y: this.BlockQs[this.blockIndex].component.position.y - 2.5
                    }
                    this.waitCount ++
                }
                else if (this.isblockQcollision && i === this.blockIndex && this.waitCount >= 15)
                {
                    this.BlockQs[i].component.position = 
                    {
                        x: this.BlockQPos[i].x - this.camera.component.position.x + 500 + this.BlockQs[i].component.sprite.width / 2,
                        y: this.BlockQs[this.blockIndex].component.position.y + 2.5
                    }
                    this.waitCount ++
                }
                else
                {
                    this.BlockQs[i].component.position = 
                    {
                        x: this.BlockQPos[i].x - this.camera.component.position.x + 500 + this.BlockQs[i].component.sprite.width / 2,
                        y: this.BlockQPos[i].y + this.BlockQs[i].component.sprite.height / 2
                    }
                }
            }
            //#endregion

            // #region move trollBridge 
            for	(var i = 0; i<this.trollBridges.length; i++)
            {
                this.trollBridges[i].component.position = 
                {
                    x: this.trollBridgesPos[i].x - this.camera.component.position.x + 500 + this.trollBridges[i].component.sprite.width / 2,
                    y: this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2
                }
            }
            //#endregion

            //#region move monsters
            for	(var i = 0; i<this.monsters.length; i++)
            {
                this.monsters[i].component.position = 
                {
                    x: this.monstersPos[i].x - this.camera.component.position.x + 500 + this.monsters[i].component.sprite.width / 2,
                    y: this.monstersPos[i].y + this.monsters[i].component.sprite.height / 2
                }
            }
            //#endregion
        }
        //#endregion 

        //#region show princess with score
        if (this.score >= 3)
        {
            if(!(this.isPrincess))
            {
                this.rootScene.attach(this.princess.pic)
                this.isPrincess = true
                console.log("Princess is draw!!")
            }
            this.princess.update()
        }
        //#endregion
        
        //#region triggle bridge & fall down
        if (this.isTriggleTrollBridge === true)
        {
            this.bridgeFall += 10
            for (var i = 0; i < this.trollBridges.length; i++)
            {
                this.trollBridges[i].component.position = 
                {
                    x: this.trollBridgesPos[i].x - this.camera.component.position.x + 500 + this.trollBridges[i].component.sprite.width / 2,
                    y: this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2 + this.bridgeFall 
                }
            }
        }
        else
        {
            for	(var i = 0; i<this.trollBridges.length; i++)
            {
                this.trollBridges[i].component.position.y = this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2
                // this.trollBridges[i].component.position = 
                // {
                //     x: this.trollBridgesPos[i].x - this.camera.component.position.x + 500 + this.trollBridges[i].component.sprite.width / 2,
                //     y: this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2
                // }
            }
        }
        //#endregion

        // //#region update
        this.hero.update()
        this.matter.update()
        // this.rootScene.update() // 對齊 component & sprite
        this.camera.update()
        // //#endregion


        // #region textBox
        this.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.heroInfoY._value = Math.round(this.hero.component.position.y)
        this.mapInfoL._value = this.camera.component.position.x
        this.ScoreInfo._value = this.score;
        //#endregion
        

        //#region camera move & hero move
        if (this.isPressWalk === true || this.isJump === true)
        {
            if (this.walkDirection === 1 && this.camera.component.position.x < 4290)   // right
            {
                this.camera.goRight()
            }
            if (this.walkDirection === 2 && this.camera.component.position.x > 70)   // left
            {
                this.camera.goLeft()
            }
            if (this.isJump === true && this.hero.isOnFloor === true)   // jump
            {
                this.hero.jump()
                this.hero.isOnFloor = false
            }
        }

        // 若移動的camera.x <= 500 hero位移（跟著camera）
        if (this.camera.component.position.x <= 500)
        {
            this.hero.component.position.x = this.camera.component.position.x
        }
        // 當500 < camera.position.x < 3240 將here的position固定在500
        else if (this.camera.component.position.x > 500 && this.camera.component.position.x < 3240)
        {
            this.hero.component.position.x = 500
        }
        // 當camera.position.x >= 3240 將here的position設為: 500 + (this.camera.component.position.x - 3240)
        else if (this.camera.component.position.x >= 3240)
        {
            this.hero.component.position.x = this.camera.component.position.x - 2740
        }

        if (this.camera.component.position.x <= 70)
        {
            this.camera.component.position.x = 70
        }
        else if (this.camera.component.position.x >= 4290)
        {
            this.camera.component.position.x = 4290
        }
        
        //#endregion

        // console.log(this.princess.component.position, this.princess.component.sprite.position)
        // console.log(this.floors[0].component.position, this.floors[0].component.sprite.position)
        // console.log(this.hero.isOnFloor)

        // region blockQ collision animation
        if (this.isblockQcollision && (this.hero.component.position.x < 500 || this.camera.component.position.x >= 3240))
        {
            if (this.waitCount < 15)
            {
                this.BlockQs[this.blockIndex].component.position = 
                {
                    x: this.BlockQs[this.blockIndex].component.position.x,
                    y: this.BlockQs[this.blockIndex].component.position.y - 2.5
                }
            }
            else
            {
                this.BlockQs[this.blockIndex].component.position = 
                {
                    x: this.BlockQs[this.blockIndex].component.position.x,
                    y: this.BlockQs[this.blockIndex].component.position.y + 2.5
                }
            }
            this.waitCount ++
        }
        if (this.waitCount === 30)
        {
            this.isblockQcollision = false
            this.waitCount = 0
        }
        // #endregion
        this.rootScene.update() // 對齊 component & sprite
    }
    draw(parentCtx) 
    {
        this.heroInfoX.draw(parentCtx)
        this.heroInfoY.draw(parentCtx)
        this.ScoreInfo.draw(parentCtx)
        this.mapInfoL.draw(parentCtx)
        this.mapInfoR.draw(parentCtx)
    }

    click(e)
    {
        if (e.x >= 3 && 
            e.x <= 105 && 
            e.y >= 10 && 
            e.y <= 110) 
        {
            Framework.Game.goToLevel("chooseLevel");
            Framework.Game._levels.splice(3,1,{name : "levelTest", level : new LevelTest()})
            Framework.Game.userIQ = 250
        }
    }
    keydown(e)
    {
        // show matter world
        if(e.key === 'P') 
        {
            this.matter.toggleRenderWireframes()   
        }

        if(e.key === 'W') 
        {
            // jump
            // this.audio.play({name: 'jump'})
            // console.log("W")
            this.isJump = true
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
        if(e.key === 'D' || e.key === 'A')
        {
            this.isPressWalk = false
            this.hero.isWalking = 0
            this.walkDirection = 0
            this.hero.animationStand()
        }
        if (e.key === 'W')
        {
            this.isJump = false
        }
        if(e.key === 'F11') 
            {
                this.isFullScreen = false
                if(!this.isFullScreen) {
                    Framework.Game.fullScreen();
                    this.isFullScreen = true;
                } else {
                    Framework.Game.exitFullScreen();
                    this.isFullScreen = false;
                } 
            }
    }
    mousemove(e) 
    {
        // console.log(e.x + "  " + e.y)
    }

    
    collisionStart(event)
    {
        // console.log(this)
        
        var pairs = event.pairs;
        
        // #region collision between hero and trollBridge
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 2; k < this.trollBridgesPos.length; k++)
            {
                if (pair.bodyA === this.trollBridges[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    // 橋掉下去
                    // console.log("collision1")
                    // this.trollBridges[k].component.setBody('isSensor', true)
                    // this.matter.removeBody(this.trollBridges[k].component)
                    this.isTriggleTrollBridge = true
                    // this.audio.play({name: 'coin'})
                    // this.hero.isOnFloor = true
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
                }
            }
        }
        //#endregion

        // #region collision between hero and floor 
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.floorsPos.length; k++)
            {
                if (pair.bodyA === this.floors[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    // console.log("collision1")
                    // this.audio.play({name: 'coin'})
                    this.hero.isOnFloor = true
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
                }
            }
        }
        //#endregion

        // #region collision between hero and blockQ
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.BlockQPos.length; k++)
            {
                if (pair.bodyA === this.BlockQs[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    // console.log("collision1")
                    // this.audio.play({name: 'coin'})
                    this.hero.isOnFloor = true

                    var blockHalfWidth = this.BlockQs[k].component.sprite.width / 2
                    if ((this.hero.component.position.y - this.BlockQs[k].component.position.y - this.BlockQs[k].component.sprite.height >= 0) && (this.hero.component.position.x >= this.BlockQs[k].component.position.x - blockHalfWidth)
                     && (this.hero.component.position.x <= this.BlockQs[k].component.position.x + blockHalfWidth))
                    {
                        this.isblockQcollision = true
                        this.blockIndex = k
                        console.log("blockIndex: " + this.blockIndex)
                    }
                }
            }
        }
        //#endregion

        // #region collision between hero and coin
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.coinsPos.length; k++)
            {
                if (pair.bodyA === this.coins[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    // console.log("collision1")
                    this.score += 1
                    this.coins[k].pic = null
                    this.matter.removeBody(this.coins[k].component.body)
                    // this.audio.play({name: 'coin'})
                } 
            }
        }
        //#endregion

        // #region collision between hero and princess
        if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
        {
            console.log("The End")
            // this.audio.play({name: 'haha'})
            // Framework.Game.pause()
            Framework.Game.items[0].item = true
            Framework.Game.userIQ = 250
            // 重置關卡
            Framework.Game._levels.splice(3,1,{name : "levelTest", level : new LevelTest()})
            // Framework.Game._levels[1] = {name : "leve1", level : new Level1()}
            // Framework.Game.addNewLevel({level1: new Level1()});
            Framework.Game.goToLevel("chooseLevel")
        }
        //#endregion 

        //#region collision between hero and monster
        if (pair.bodyA === this.monsters[0].component.body && pair.bodyB === this.hero.component.body) 
        {
            if (this.hero.component.position.y < 680)
            {
                this.monsters[0].pic = null
                this.matter.removeBody(this.monsters[0].component.body)
            }
            else
            {
                console.log("The End because of monster")
                this.heroDie()
            }
            

            // this.audio.play({name: 'haha'})
            // Framework.Game.pause()
            // Framework.Game.items[0].item = true
            // Framework.Game.userIQ = 250
            // 重置關卡
            // Framework.Game._levels.splice(3,1,{name : "levelTest", level : new LevelTest()})
            // Framework.Game._levels[1] = {name : "leve1", level : new Level1()}
            // Framework.Game.addNewLevel({level1: new Level1()});
            // Framework.Game.goToLevel("chooseLevel")
            
        }
        //#endregion
    }
};
