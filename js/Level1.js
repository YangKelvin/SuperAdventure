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
        this.isJump = false
        this.walkDirection = 0
        this.score = 0
        this.isPrincess = false
    }

    //#region  load

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
        this.princessPos = {x:400, y:100}
        
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
    }
    loadGround()
    {
        // floor
        this.floorsPos = 
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

        this.coins = new Array()
        for (var i = 0; i < this.coinsPos.length; i++)
        {
            this.coins[i] = new block('images/coin.png', 
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

    loadMonster()
    {
        // this.monstersPos = 
        // [

        // ]

        // this.monsterOps = 
        // {
        //     label: 'Monster', 
        //     friction: 0.05, 
        //     density:0.002, 
        //     isSensor:true
        // }

        // this.monsters = new Array()
        // for (var i = 0; i < this.monstersPos.length; i++)
        // {
        //     this.monsters[i] = new Character('images/monster.png',
        //                                         this.matter,
        //                                         this.monsterOps,
        //                                         this.monstersPos)
        //     this.monsters[i].load()
        //     this.monsters[i].initialize()
        //     this.monsters[i].component.position = this.monstersPos[i]
        //     this.rootScene.attach(this.monsters[i])
        // }
    }
    //#endregion
    load() 
    {
        // console.log(this.viewCenter)
        Framework.Game.initialize()
        this.loadBackground()
        this.loadHero()
        this.loadGround()
        this.loadCoin()
        this.loadPrincess()
        this.loadCamera()
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
        
        //#region map move
        if (this.hero.component.position.x >= 500)
        {
            // move floors
            for	(var i = 0; i<this.floors.length; i++)
            {
                this.floors[i].component.position = 
                {
                    x: this.floorsPos[i].x - this.camera.component.position.x + 500 + this.floors[i].component.sprite.width / 2,
                    y: this.floorsPos[i].y + this.floors[i].component.sprite.height / 2
                }   
            }

            // move princess
            // this.princess.component.position.x = this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width/2
            this.princess.component.position = 
            {
                x: this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width / 2,
                y: this.princess.component.position.y
            }

            // move coinBlock
            for	(var i = 0; i<this.coinsPos.length; i++)
            {
                this.coins[i].component.position = 
                {
                    x: this.coinsPos[i].x - this.camera.component.position.x + 500 + this.coins[i].component.sprite.width / 2,
                    y: this.coinsPos[i].y + this.coins[i].component.sprite.height / 2
                }
            }

            // move walls
            for	(var i = 0; i<this.walls.length; i++)
            {
                this.walls[i].component.position = 
                {
                    x: this.wallsPos[i].x - this.camera.component.position.x + 500 + this.walls[i].component.sprite.width / 2,
                    y: this.wallsPos[i].y + this.walls[i].component.sprite.height / 2
                }
            }
        }
        //#endregion update


        if (this.score <=3)
        {
            if(!(this.isPrincess))
            {
                this.rootScene.attach(this.princess.pic)
                this.isPrincess = true
            }
            this.princess.update()
        }

        //#region update
        
        this.hero.update()
        this.matter.update()
        this.rootScene.update() // 對齊 component & sprite
        this.camera.update()
        
        
        // textBox
        // this.map1.heroInfoX._value = Math.round(this.hero.component.position.x)
        // this.map1.heroInfoY._value = Math.round(this.hero.component.position.y)
        // this.map1.mapInfoL._value = this.camera.component.position.x

        //#endregion

        // console.log(this.isPressWalk, this.walkDirection)
        //#region hero move
        if (this.isPressWalk === true || this.isJump === true)
        {
            if (this.walkDirection === 1)   // right
            {
                this.camera.goRight()
            }
            if (this.walkDirection === 2 && this.camera.component.position.x > 200)   // left
            {
                this.camera.goLeft()
            }
            if (this.isJump === true && this.hero.isOnFloor === true)   // jump
            {
                console.log("JJJ")
                this.hero.jump()
                this.hero.isOnFloor = false
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

        // console.log(this.princess.component.position, this.princess.component.sprite.position)
        // console.log(this.floors[0].component.position, this.floors[0].component.sprite.position)
        // console.log(this.hero.isOnFloor)
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
            // this.hero.isWalking = 3

            console.log("W")
            // this.isPressWalk = true
            // this.walkDirection = 3
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

    collisionStart(event)
    {
        // console.log(this)
        
        var pairs = event.pairs;
        // console.lodg(pairs)
        // collision between hero and floor
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


        // collision between hero and coin
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
        
        // collision between hero and princess
        if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
        {
            console.log("The End")
            // this.audio.play({name: 'haha'})
            // Framework.Game.pause()
            Framework.Game.items[0].item = true

            // 重置關卡
            Framework.Game._levels.splice(2,1,{name : "level1", level : new Level1()})
            // Framework.Game._levels[1] = {name : "leve1", level : new Level1()}
            // Framework.Game.addNewLevel({level1: new Level1()});
            Framework.Game.goToLevel("chooseLevel")
        }
    }
};
