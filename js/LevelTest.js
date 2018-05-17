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
        this.isPress = false
        this.isPressWalk = false
        this.isJump = false
        this.walkDirection = 0
        this.score = 0
        this.isPrincess = false

        this.isTriggleTrollBridge = false
        this.bridgeFall = 0


        this.princessPos = {x:4200, y:606}
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
        // this.princessPos = {x:400, y:606}
        
        this.princessOps = 
        { 
            label: 'princess', 
            friction: 0.05, 
            density:0.002,
            isStatic: false
        }

        this.princess =new Character('images/princess.png', 
                                        this.matter,
                                        this.princessOps)
        this.princess.load()
        this.princess.initialize()
        this.princess.component.position = this.princessPos
        // this.rootScene.attach(this.princess)
    }
    loadGround()
    {
        // floor
        this.floorsPos = 
            [
                //test
                // {x: 280, y: 710},
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
            {x: 280, y: 430},//blockQ   
            {x: 1820, y: 500},//blockQ
            {x: 1890, y: 220},//blockQ
            {x: 2030, y: 500}//blockQ
        ]
        this.BlockQOps = 
        {
            label: 'BlockQ', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:false
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
        this.loadBlockQ()
        this.loadTrollBridge()
        this.loadCoin()
        this.loadPrincess()
        this.loadCamera()
        
        this.loadPipe()
        
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


    moveMap(moveLength)
    {
        //#region move floors
        for	(var i = 0; i<this.floors.length; i++)
        {
            this.matter.setBody(this.floors[i].component.body, 
                "position", 
                {x: this.floors[i].component.position.x + moveLength, y: this.floors[i].component.position.y})  
        }
        //#endregion

        //#region move blockQs
        for	(var i = 0; i<this.BlockQs.length; i++)
        {
            this.matter.setBody(this.BlockQs[i].component.body, 
                "position", 
                {x: this.BlockQs[i].component.position.x + moveLength, y: this.BlockQs[i].component.position.y})  
        }
        //#endregion

        //#region move trollBridge
        for	(var i = 0; i<this.trollBridges.length; i++)
        {
            this.matter.setBody(this.trollBridges[i].component.body, 
                "position", 
                {x: this.trollBridges[i].component.position.x + moveLength, y: this.trollBridges[i].component.position.y})  
        }
        //#endregion

        //#region move coins
        for	(var i = 0; i<this.coins.length; i++)
        {
            this.matter.setBody(this.coins[i].component.body, 
                "position", 
                {x: this.coins[i].component.position.x + moveLength, y: this.coins[i].component.position.y})  
        }
        //#endregion

        //#region move Pipes
        for	(var i = 0; i<this.Pipes.length; i++)
        {
            this.matter.setBody(this.Pipes[i].component.body, 
                "position", 
                {x: this.Pipes[i].component.position.x + moveLength, y: this.Pipes[i].component.position.y})  
        }
        //#endregion

        //#region move monsters
        for	(var i = 0; i<this.monsters.length; i++)
        {
            this.matter.setBody(this.monsters[i].component.body, 
                "position", 
                {x: this.monsters[i].component.position.x + moveLength, y: this.monsters[i].component.position.y})  
        }
        //#endregion

        //#region ,move princess
        if (this.isPrincess)
        {
            this.matter.setBody(this.princess.component.body, 
                "position", 
                {x: this.princess.component.position.x + moveLength, y: this.princess.component.position.y})  
                this.princess.update()
        }
        else
        {
            this.princessPos.x -= 5
        }
        
        //#endregion
    }


    update() 
    {
        // bridge 有問題
        // console.log(this.princessPos)

        //#region hero die condition
        if (this.hero.component.position.y > 1000)
        {
            this.heroAlive = false
        }
        //#endregion

        //#region judge hero die or not
        if(this.heroAlive === false)
        {
            console.log("this.heroAlive = flase")
            this.heroDie()
        }
        //#endregion

        //#region camera move & hero move & map move(new)
        if (this.isPress || this.isJump)
        {
            if (this.isPressWalk)
            {
                let moveLength = 0
                if (this.walkDirection === 1)
                {
                    moveLength = -5
                    this.camera.goRight()
                    // go right
                    if (this.hero.component.position.x < 500)
                    {
                        this.hero.goRight()
                    }
                    else 
                    {
                        this.hero.component.position.x = 502
                        this.moveMap(moveLength)
                        // this.hero.component.position.x = 500
                    }
                }
                else if (this.walkDirection === 2)
                {
                    // go left
                    if (this.hero.component.position.x > 70)    //讓hero.position不會小於70
                    {
                        if (this.floors[0].component.position.x === 35)   // 如果第一個方塊的位置正確
                        {
                            this.hero.goLeft()
                        }
                        else
                        {
                            // this.hero.component.position.x = 502

                            this.hero.goLeft()
                            // this.moveMap(5)
                        }
                    } 
                }
                this.lockHeroPos = 
                {
                    x: this.hero.component.position.x,
                    y: this.hero.component.position.y
                }
            }

            if(this.isJump && this.hero.isOnFloor)
            {
                this.hero.jump()
                this.hero.isOnFloor = false
            }
        }
        //#endregion


        
        // this.he
        ro.component.position = this.lockHeroPos

        //#region triggle bridge & fall down (remove)
        // if (this.isTriggleTrollBridge === true)
        // {
        //     this.bridgeFall += 10
        //     for (var i = 0; i < this.trollBridges.length; i++)
        //     {
        //         this.trollBridges[i].component.position = 
        //         {
        //             x: this.trollBridgesPos[i].x - this.camera.component.position.x + 500 + this.trollBridges[i].component.sprite.width / 2,
        //             y: this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2 + this.bridgeFall 
        //         }
        //     }
        // }
        // else
        // {
        //     for	(var i = 0; i<this.trollBridges.length; i++)
        //     {
        //         this.trollBridges[i].component.position.y = this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2
        //         // this.trollBridges[i].component.position = 
        //         // {
        //         //     x: this.trollBridgesPos[i].x - this.camera.component.position.x + 500 + this.trollBridges[i].component.sprite.width / 2,
        //         //     y: this.trollBridgesPos[i].y + this.trollBridges[i].component.sprite.height / 2
        //         // }
        //     }
        // }
        //#endregion
    


        //#region update
        this.hero.update()
        this.matter.update()
        this.rootScene.update() // 對齊 component & sprite
        this.camera.update()
        //#endregion

        //#region textBox
        this.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.heroInfoY._value = Math.round(this.hero.component.position.y)
        this.mapInfoL._value = this.camera.component.position.x
        this.ScoreInfo._value = this.score;
        //#endregion


        //#region show princess with score 
        if (this.score >= 1)
        {
            if(!(this.isPrincess))
            {
                // this.loadPrincess()
                this.rootScene.attach(this.princess)
                this.isPrincess = true
                this.princess.component.position = this.princessPos
                console.log("Princess is draw!!")
            }
            this.princess.update()
        }
        //#endregion

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
            this.isPress = true
            this.isJump = true
        }
        if(e.key === 'A') 
        {
            // left
            this.isPress = true
            this.isPressWalk = true
            this.walkDirection = 2
            this.hero.animationGoLeft()
        }
        if(e.key === 'D') 
        {
            // right  
            this.isPress = true
            this.isPressWalk = true
            this.walkDirection = 1
            this.hero.animationGoRight()
        }
    }
    keyup(e, list)
    {
        if(e.key === 'D' || e.key === 'A')
        {
            this.isPress = false
            this.isPressWalk = false
            this.walkDirection = 0
            this.hero.animationStand()
        }
        if (e.key === 'W')
        {
            // this.isPress = false
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
        console.log(e.x + "  " + e.y)    
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

        //#region collision between hero and blockQ
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
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
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
        // #endregion

        // #region collision between hero and princess (remove)
        // if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
        // {
        //     console.log("The End")
        //     // this.audio.play({name: 'haha'})
        //     // Framework.Game.pause()
        //     Framework.Game.items[0].item = true
        //     Framework.Game.userIQ = 250
        //     // 重置關卡
        //     Framework.Game._levels.splice(3,1,{name : "levelTest", level : new LevelTest()})
        //     // Framework.Game._levels[1] = {name : "leve1", level : new Level1()}
        //     // Framework.Game.addNewLevel({level1: new Level1()});
        //     Framework.Game.goToLevel("chooseLevel")
        // }
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
        }
        //#endregion
    }
};
