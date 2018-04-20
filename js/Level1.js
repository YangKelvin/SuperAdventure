class Level1 extends Framework.Level 
{
    constructor()
    {
        super() // 繼承
        this.matter = new Framework.Matter() // 宣告this.matter 並建立物理世界MatterUtil.js
        
        // hero & coin 的碰撞 和 hero & princess 的碰撞
        this.collisionBlockQs = this.collisionStartBetweenQ_hero.bind(this)
        // this.collisionPrincess = this.collisionStartBetweenPrincess_Hero.bind(this)
        
        // 初始分數 （吃金幣的數量）
        //this.score = 0
        
        //this.mapLeft = 0
        //this.mapRight = 0

        this.pressWalk = false
        this.walkDirection = 0

        this.tempx
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
    /*loadBackground()
    {
        this.background = new Framework.Sprite(define.imagePath + 'background.jpg');
        this.background.position = 
        {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        }
        this.background.scale = 2;
        this.rootScene.attach(this.background)
    }*/
    /*loadTextbox()
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
    }*/
    loadCoin()
    {
        this.blockCValue =
        [
            {x: 1564, y: 100},
            {x: 2014, y: 200},
            {x: 1100, y: 300},
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
    loadMap1()
    {
        this.mapArray = []
        this.map1 = new Map1(this.mapArray, this.matter)
        this.map1.load()
    }
    loadMap()
    {
        //0 空地  1牆壁  2地板 
        // this.mapArray = []
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //1
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //2
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //3
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //4
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //5
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //6
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //7
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //8
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //9
        // this.mapArray.push([1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1]); //10
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //11
        // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //12
        // this.map = new Map1(this.mapArray, this.matter)
    }

    load() 
    {
        // console.log(this.viewCenter)
        //this.loadBackground()
        this.loadHero()
        this.loadGround()
        //this.loadTextbox()
        this.loadCoin()
        this.loadPrincess()
        this.loadCamera()
        this.loadAudio()
        this.loadMap1()
        this.audio.play({name: 'bgm1', loop: true})
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlockQs))
        // this.matter.addEventListener("collisionStart",(this.collisionPrincess))
    }

    initialize() 
    {
        
    }

    update() 
    {
        // console.log(this.mapfloor[0].component.position)
        // console.log(this.mapfloor[0].component.sprite.position)
        super.update()
        this.map1.update()
        // console.log(this.mapfloor[1].component.position)
        
        
        //#region map move
        if (this.hero.component.position.x >= 500)
        {
            // move floors
            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                this.mapfloor[i].component.position = 
                {
                    x: this.mapfloorValue[i].x - this.camera.component.position.x + 500 + this.mapfloor[i].component.sprite.width / 2,
                    y: this.mapfloorValue[i].y + this.mapfloor[i].component.sprite.height / 2
                }   
            }
            // move princess
            this.princess.component.position.x = this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width/2
            // this.princess.component.position = 
            // {
            //     x: this.princessPos.x - this.camera.component.position.x + 500 + this.princess.component.sprite.width / 2,
            //     y: this.princessPos.y + this.princess.component.sprite.height / 2
            // }  
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
        //#endregion

        //#region update
        
        this.hero.update()
        this.matter.update()
        this.rootScene.update()
        this.camera.update()
        // console.log(this.mapfloor[0].component.position)
        // console.log(this.tempx)
        
        
        if (this.score === 3)
        {
            this.rootScene.attach(this.princess.pic)
            this.princess.update()
        }


        // textBox
        this.map1.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.map1.heroInfoY._value = Math.round(this.hero.component.position.y)
        //this.mapInfoL._value = this.camera.component.position.x
        //this.mapInfoR._value = this.mapRight

        //#endregion


        //#region hero move
        if (this.pressWalk === true)
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
        
        
        //this.ScoreInfo._value = this.score


    }
    draw(parentCtx) 
    {
        // this.heroInfoX.draw(parentCtx)
        // this.heroInfoY.draw(parentCtx)
        // this.ScoreInfo.draw(parentCtx)
        // this.mapInfoL.draw(parentCtx)
        // this.mapInfoR.draw(parentCtx)
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
            this.pressWalk = true
            this.walkDirection = 2
            this.hero.animationGoLeft()
        }
        if(e.key === 'D') 
        {
            // right  
            this.pressWalk = true
            this.walkDirection = 1
            this.hero.animationGoRight()
        }
    }
    keyup(e, list)
    {
        if(e.key === 'D' || e.key === 'A' || e.key === 'W')
        {
            this.pressWalk = false
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
                if (pair.bodyA === this.blockCs[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    // console.log("collision1")
                    //hero 和 blockQs 碰撞
                    this.blockCs[k].pic = null
                    this.matter.removeBody(this.blockCs[k].component.body)
                    this.score += 1
                    this.audio.play({name: 'coin'})
                    
                } 
            }
        }
        if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
        {
            console.log("The End")
            this.audio.play({name: 'haha'})
            // Framework.Game.goToNextLevel()
        }
    }
    // collisionStartBetweenPrincess_Hero(event)
    // {
    //     // var pairs = event.pairs;

    //     // for (var i = 0, j = pairs.length; i != j; ++i) 
    //     // {
    //     //     var pair = pairs[i];
    //     //     // if (pair.bodyA === this.princess.component.body && pair.bodyB === this.hero.component.body) 
    //     //     // {
    //     //     //     console.log("collision1")
                
    //     //     // } 
    //     //     if (pair.bodyA === this.hero.component.body && pair.bodyB === this.princess.component.body) 
    //     //     {
    //     //         console.log("The End")
    //     //         this.audio.play({name: 'haha'})
    //     //         // Framework.Game.goToNextLevel()
    //     //     }
    //     // }
    // }
};
