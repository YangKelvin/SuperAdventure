// 使用 matter製造的物件的position為圖片的左上角

class Level3 extends Framework.Level 
{
    constructor()
    {
        super() // 繼承

        // 宣告this.matter 並建立物理世界MatterUtil.js
        this.matter = new Framework.Matter() 
        
        // hero & coin 的碰撞 和 hero & princess 的碰撞
        this.collisionBlocks = this.collisionStart.bind(this)

        this.heroAlive = true       // 判斷hero是否活著
        this.isPress = false        // 判斷是否按下控制hero的按鍵
        this.isPressWalk = false    // 判斷是否按下控制hero移動的按鍵
        this.isJump = false         // 判斷是否按下控制hero跳躍的按鍵
        this.walkDirection = 0      // 判斷hero移動的方向（左 or 右）


        // boss
        this.bossHP = 100
        this.bossAttack = 1
        this.level = 1

        // hero
        this.attackMode = 0

        // 武器
        this.weaponCount = 0



        this.goldSwordBag = Framework.Game.goldSwordCount
        this.goldSwords = new Array()
        this.goldSwordCount = 0
        this.goldSwordDamage = Framework.Game.goldSwordAtk
        this.keyboradBag = Framework.Game.keyboardCount
        this.keyborads = new Array()
        this.keyboardCount = 0
        this.keyboardDamage = Framework.Game.keyboardAtk

    }
    sleep(milliseconds) 
    {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) 
        {
            if ((new Date().getTime() - start) > milliseconds)
            {
                break;
            }
        }
    }
    heroDie()
    {
        // 重置 levelTest
        this.sleep(1000);
        Framework.Game._levels.splice(8,1,{name : "level3", level : new Level1()})
        Framework.Game.userIQ -= 50
        Framework.Game._goToLevelIs = "level3"
        
        Framework.Game.goToLevel("dieScreen")
        
        console.log("hero die")
    }

    //#region load
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

    loadPic()
    {
        this.GoldSWPic = new Framework.Sprite('images/weapon-goldSword.png')
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
        // console.log("Finish loaded bg")
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
    loadBossHP()
    {
        this.bossHPShow = new Textbox()
        this.bossHPShow._height = 25
        this.bossHPShow._fillStyle = 'red'
        this.bossHPShow._value = ''
        this.bossHPShow.position = {x:1110, y:100}
        this.rootScene.attach(this.bossHPShow)
    }
    
    loadBoss()
    {
        this.bossPos = 
        {
            x: 1000, y:340
        }
        this.bossPos = 
        {
            label: 'boss', 
            friction: 0.05, 
            density:0.002, 
            // isStatic:true
        }

        this.boss = new block('images/boss.png',
                                this.matter,
                                this.blockOps)
        this.boss.load()
        this.boss.initialize()
        this.boss.component.position = {x: 1000, y:130}
        this.rootScene.attach(this.boss)
    }
    loadGround()
    {
        // floor
        this.floorsPos = 
            [
                //test
                // {x: 280, y: 710},
                // ground
                {x: 0, y: 830},
                {x: 70, y: 830},
                {x: 140, y: 830},
                {x: 210, y: 830},
                {x: 280, y: 830},
                {x: 350, y: 830},
                {x: 420, y: 830},
                {x: 490, y: 830},
                {x: 560, y: 830},
                {x: 630, y: 830},
                {x: 700, y: 830},
                {x: 770, y: 830},
                {x: 840, y: 830},
                {x: 910, y: 830},
                
                // {x: 980, y: 830},
                // {x: 1050, y: 830},
                // {x: 1120, y: 830},
                // {x: 1190, y: 830},

                {x: 1330, y: 830},
                {x: 1400, y: 830},
                {x: 1470, y: 830},
                {x: 1540, y: 830},
                {x: 1610, y: 830},
                {x: 1680, y: 830},

                //平台開始
                {x: 1680, y: 500}, //20
                {x: 1750, y: 500},
                {x: 1820, y: 220},
                {x: 1960, y: 220},
                {x: 2030, y: 220},
                {x: 1890, y: 500},
                {x: 1960, y: 500},
                {x: 2100, y: 500},
                {x: 2170, y: 500},
                //平台結束

                {x: 1750, y: 830},
                {x: 1820, y: 830},
                {x: 1890, y: 830},
                {x: 1960, y: 830},
                {x: 2030, y: 830},
                {x: 2100, y: 830},
                {x: 2170, y: 830}, // 35
                {x: 2240, y: 830},
                {x: 2310, y: 830},
                {x: 2380, y: 830},
                {x: 2450, y: 830},
                {x: 2520, y: 830},
                {x: 2590, y: 830},
                {x: 2660, y: 830},
                {x: 2730, y: 830},
                {x: 2800, y: 830},
                {x: 2870, y: 830},
                {x: 2940, y: 830},
                {x: 3010, y: 830},
                {x: 3080, y: 830},
                {x: 3150, y: 830},
                {x: 3220, y: 830},
                {x: 3290, y: 830},
                {x: 3360, y: 830},
                {x: 3430, y: 830},
                {x: 3500, y: 830},
                {x: 3570, y: 830},
                {x: 3640, y: 830},
                
                {x: 3990, y: 830},
                {x: 4060, y: 830},
                {x: 4130, y: 830},
                {x: 4200, y: 830},
                {x: 4270, y: 830},
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


    //#endregion
    loadMap()
    {
        this.blocksPos = 
        [
            {x: 0, y: 830},
            {x: 70, y: 830},
            {x: 140, y: 830},
            {x: 210, y: 830},
            {x: 280, y: 830},
            {x: 350, y: 830},
            {x: 420, y: 830},
            {x: 490, y: 830},
            {x: 560, y: 830},
            {x: 630, y: 830},
            {x: 700, y: 830},
            {x: 770, y: 830},
            {x: 840, y: 830},
            {x: 910, y: 830},
            {x: 980, y: 830},
            {x: 1050, y: 830},
            {x: 1120, y: 830},
            {x: 1190, y: 830},
            {x: 1260, y: 830},
            {x: 1330, y: 830},
            {x: 1400, y: 830},
            {x: 1470, y: 830},
            {x: 1540, y: 830},

            {x: 0, y: 830},	{x: 0, y: 760},	{x: 0, y: 690},	{x: 0, y: 620},	{x: 0, y: 550},	{x: 0, y: 480},	{x: 0, y: 410},	{x: 0, y: 340},	{x: 0, y: 270},	{x: 0, y: 200},	{x: 0, y: 130},	{x: 0, y: 60},	{x: 0, y: 10},
            {x: 1540, y: 760},	{x: 1540, y: 690},	{x: 1540, y: 620},	{x: 1540, y: 550},	{x: 1540, y: 480},	{x: 1540, y: 410},	{x: 1540, y: 340},	{x: 1540, y: 270},	{x: 1540, y: 200},	{x: 1540, y: 130},	{x: 1540, y: 60},	{x: 1540, y: 10},

            {x: 0, y: 10},
            {x: 70, y: 10},
            {x: 140, y: 10},
            {x: 210, y: 10},
            {x: 280, y: 10},
            {x: 350, y: 10},
            {x: 420, y: 10},
            {x: 490, y: 10},
            {x: 560, y: 10},
            {x: 630, y: 10},
            {x: 700, y: 10},
            {x: 770, y: 10},
            {x: 840, y: 10},
            {x: 910, y: 10},
            {x: 980, y: 10},
            {x: 1050, y: 10},
            {x: 1120, y: 10},
            {x: 1190, y: 10},
            {x: 1260, y: 10},
            {x: 1330, y: 10},
            {x: 1400, y: 10},
            {x: 1470, y: 10},
            {x: 1540, y: 10},

        ]
        this.blockOps = 
        {
            label: 'block', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }

        this.blocks = new Array()
        for (var i = 0; i < this.blocksPos.length; i++)
        {
            this.blocks[i] = new block('images/grassCenter_rounded.png', 
                                            this.matter, 
                                            this.blockOps)
            this.blocks[i].load()
            this.blocks[i].initialize()
            this.blocks[i].component.position = this.blocksPos[i]

            this.rootScene.attach(this.blocks[i])
        }
    }

    load() 
    {
        // console.log(this.viewCenter)
        Framework.Game.initialize()

        this.loadBackground()
        this.loadMap()
        this.loadHero()
        this.loadBoss()
        this.loadPic()
        this.loadCamera()
        this.loadBossHP()
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlocks))
        console.log("Level3 Start")
        console.log('this.goldSWDamage = ' + this.goldSwordDamage)
    }

    initialize() 
    {
    }


    shoot(weapon, speed)
    {
        this.matter.setBody(weapon.component.body, 
            "position", 
            {x: weapon.component.position.x + speed, y: weapon.component.initPosition.y + 10})
        if (weapon.component.position.x >= 1000)
        {
            weapon.pic = null
        }
    }
    update() 
    {
        // bossHP
        this.bossHPShow._width = this.bossHP * 4

        for	(var i = 0; i < this.goldSwords.length; i++)
        {
            this.shoot(this.goldSwords[i],10)
        }

        // this.hero.animationDie()
        // console.log(this.floors[this.floors.length - 1].component.position)
        // console.log(this.hero.component.position)

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
            
            this.hero.animationDie()
            this.dieUpdateCount++
            // this.heroDie()
        }
        if (this.dieUpdateCount >= 120)
        {
            this.dieUpdateCount = 0
            this.heroDie()
        }
        //#endregion
        
        //#region hero move & map move(new)

        if (this.isPress || this.isJump)
        {
            if (this.isPressWalk)
            {
                if(this.walkDirection === 1)
                {
                    this.hero.goRight()
                }
                else if(this.walkDirection === 2)
                {
                    this.hero.goLeft()
                }
            }

            if(this.isJump && this.hero.isOnFloor)
            {
                this.hero.jump()
                this.hero.isOnFloor = false
            }
        }
        //#endregion    

        //#region 防止英雄滑落
        // if (this.startLockHeroPos)
        // {
        //     // this.hero.component.position = this.lockHeroPos
        //     this.hero.component.position.x = this.lockHeroPosx
        // }
        //#endregion
        
        //#region update textbox
        // this.heroInfoX._value = Math.round(this.hero.component.position.x)
        // this.heroInfoY._value = Math.round(this.hero.component.position.y)
        //#endregion
        
        //#region update 註解和非註解 有奇怪的差異...
        
        this.hero.update()
        this.matter.update()
        this.rootScene.update() // 對齊 component & sprite
        this.matter.setBody(this.camera.component.body, 
            "position", 
            {x: this.camera.component.position.x + 1, y: this.camera.component.position.y})
        this.camera.update()
        // this.matter.setBody(this.camera.component.body, 
        //     "position", 
        //     {x: this.camera.component.position.x + 0, y: this.camera.component.position.y})
        
        // this.hero.update()
        // this.matter.update()
        // this.rootScene.update() // 對齊 component & sprite
        // this.camera.update()
        //#endregion



        
    }
    draw(parentCtx) 
    {

    }

    click(e)
    {

        console.log(e.x + "  " + e.y)  
        // 返回選關卡頁面
        if (e.x >= 3 && 
            e.x <= 105 && 
            e.y >= 10 && 
            e.y <= 110) 
        {
            Framework.Game._goToLevelIs = ""
            Framework.Game.goToLevel("chooseLevel");
            Framework.Game._levels.splice(8,1,{name : "level3", level : new Level3()})
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

        if (this.heroAlive)
        {
            if(e.key === 'W') 
            {
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

            if(e.key === 'J')
            {
                // 發射金刀
                if (this.goldSwordBag > 0)
                {
                    this.goldSwordBag -= 1
                    this.goldSwords.push(
                        /*sword-block*/
                        new block('images/weapon-goldSword.png',
                                    this.matter,
                                    {label:'gold-sword', friction:0.05, density: 0.002, isStatic: false}
                                )
                    )
                    // console.log(this.goldSwords)
                    this.goldSwordCount ++
                    this.goldSwords[this.goldSwordCount-1].load()
                    this.goldSwords[this.goldSwordCount-1].initialize()
                    this.goldSwords[this.goldSwordCount-1].component.position = 
                    {
                        x: this.hero.component.position.x + 40,
                        y: this.hero.component.position.y -20
                    }

                    this.goldSwords[this.goldSwordCount-1].component.initPosition = this.goldSwords[this.goldSwordCount-1].component.position

                    
                    this.rootScene.attach(this.goldSwords[this.goldSwordCount-1])
                }
            }
        }
    }
    keyup(e, list)
    {
        if(e.key === 'D' || e.key === 'A')
        {
            // 鎖定hero位置 （避免英雄從方塊下滑落）
            this.startLockHeroPos = true

            this.isPress = false
            this.isPressWalk = false
            this.walkDirection = 0
            this.hero.animationStand()



        }
        if (e.key === 'W')
        {
            this.startLockHeroPos = true
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
        console.log("A")
        var pairs = event.pairs

        // #region collision between hero and floor 
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];
            for (var k = 0; k < this.blocksPos.length; k++)
            {
                if (pair.bodyA === this.blocks[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    this.hero.isOnFloor = true
                    // console.log("A")
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
                }
            }
        }
        //#endregion

        //#region boss & hero 
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];
            if (pair.bodyA === this.boss.component.body && pair.bodyB === this.hero.component.body) 
            {
                console.log("The End because of boss")
                // this.heroDie()
            }
        }
        //#endregion

        //#region boss & weapon
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];
            for (var k = 0; k < this.goldSwords.length; k++)
            {
                if (pair.bodyA === this.goldSwords[k].component.body && pair.bodyB === this.boss.component.body) 
                {
                    // console.log("A")
                    this.goldSwords[k].pic = null
                    this.matter.removeBody(this.goldSwords[k].component.body)
                } 
                else if (pair.bodyA === this.boss.component.body && pair.bodyB === this.goldSwords[k].component.body)
                {
                    console.log("boss Atk")
                    this.goldSwords[k].pic = null
                    this.matter.removeBody(this.goldSwords[k].component.body)
                    this.bossHP -= this.goldSwordDamage
                }
            }
        }
        //#endregion
        
    }
};
