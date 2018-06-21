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
        this.dieUpdateCount = 0
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

        this.mode1_rockets = new Array()
        this.attackMode1_time = 0
        this.attackMode1_count = 0
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
        Framework.Game._levels.splice(8,1,{name : "level3", level : new Level3()})
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
        this.KeyboardsWPic = new Framework.Sprite('images/weapon-keyboard.png')
        this.rocketPic = new Framework.Sprite('images/rocket_left.png')
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
        this.bossHP = 100
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
    
    loadAudio()
    {
        this.audio = new Framework.Audio(
        {
            bgm1: {mp3: 'music/bgm1.mp3'},
            boss: {mp3: 'music/boss.mp3'},
            jump: {mp3: 'music/jump.mp3'},
            haha: {wav: 'music/haha.wav'},
            throw: {wav: 'music/throw.wav'},
            shoot: {wav: 'music/shoot.wav'}
        })
    }

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
        Framework.Game.fullScreen();

        this.loadAudio()
        this.loadBackground()
        this.loadMap()
        this.loadHero()
        this.loadBoss()
        this.loadPic()
        this.loadCamera()
        this.loadBossHP()
        this.loadICON()

        this.audio.stopAll()
        this.audio.play({name: 'boss', loop: true})
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlocks))
        console.log("Level3 Start")
        console.log('this.goldSWDamage = ' + this.goldSwordDamage)
        console.log()
    }

    initialize() 
    {
    }


    shoot(weapon, speed)
    {
        this.matter.setBody(weapon.component.body, 
            "position", 
            {x: weapon.component.position.x + speed, y: weapon.component.initPosition.y})
        if (weapon.component.position.x <= 100)
        {
            weapon.pic = null
        }
    }

    attackMode1()
    {
        this.mode1_rockets.push(
                new block('images/rocket_left.png',
                this.matter,
                {label:'mode1_rocket', friction:0.05, density:0.002, isStatic:false}
            )
        )
        this.attackMode1_count++
        this.mode1_rockets[this.attackMode1_count-1].load()
        this.mode1_rockets[this.attackMode1_count-1].initialize()
        this.mode1_rockets[this.attackMode1_count-1].component.position = 
        {
            x:935,
            y:this.hero.component.position.y
        }
        this.mode1_rockets[this.attackMode1_count-1].component.initPosition = 
        {
            x:935,
            y:this.hero.component.position.y
        }
        this.rootScene.attach(this.mode1_rockets[this.attackMode1_count-1])
        this.audio.play({name: 'shoot'})
    }
    update() 
    {
        this.goldSwordBag = Framework.Game.goldSwordCount
        this.goldSwordDamage = Framework.Game.goldSwordAtk
        this.keyboradBag = Framework.Game.keyboardCount
        this.keyboardDamage = Framework.Game.keyboardAtk

        //#region boss
        // bossHP
        this.bossHPShow._width = this.bossHP * 4    // boss 血條

        // attack mode 1
        if (this.bossHP < 80)
        {
            this.attackMode1_time++
            if (this.attackMode1_time % 100 === 0)
            {
                // attack mode 1
                this.attackMode1()
            }
            for	(var i = 0; i < this.mode1_rockets.length; i++)
            {
                this.shoot(this.mode1_rockets[i], -10)
            }
        }
        //#endregion

        // 新增 goldSword 並把他加入陣列
        for	(var i = 0; i < this.goldSwords.length; i++)
        {
            this.shoot(this.goldSwords[i],10)
        }

        for	(var i = 0; i < this.keyborads.length; i++)
        {
            this.shoot(this.keyborads[i],10)
        }

        if (this.bossHP <= 0)
        {
            this.bossHP = 0
            console.log('win')

            Framework.Game.records[2].record = Framework.Game.userIQ
            Framework.Game._goToLevelIs = ""
            Framework.Game.userIQ = 250
            
            Framework.Game.items[2].item = true
            Framework.Game.items[3].item = true
            Framework.Game.items[4].item = true
            Framework.Game.goToLevel("chooseLevel")
            Framework.Game._levels.splice(8,1,{name : "level3", level : new Level3()})
            this.audio.stopAll()
            this.audio.play({name: 'bgm1'})
        }

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
                this.audio.play({name: 'jump'})
            }
        }
        //#endregion    
        
        //#region update 註解和非註解 有奇怪的差異...
        
        this.hero.update()
        this.matter.update()
        this.rootScene.update() // 對齊 component & sprite
        this.matter.setBody(this.camera.component.body, 
            "position", 
            {x: this.camera.component.position.x + 1, y: this.camera.component.position.y})
        this.camera.update()

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
            this.audio.play({name: 'bgm1', loop: true})
            this.audio.stop('boss')
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
                    this.audio.play({name: 'throw'})
                }
                
            }
            if(e.key === 'K')
            {
                // 發射鍵盤
                if (this.keyboradBag > 0)
                {
                    this.keyboradBag -= 1
                    this.keyborads.push(
                        /*keyboard-block*/
                        new block('images/weapon-keyboard.png',
                                    this.matter,
                                    {label:'keyboard', friction:0.05, density: 0.002, isStatic: false}
                                )
                    )

                    this.keyboardCount ++
                    this.keyborads[this.keyboardCount-1].load()
                    this.keyborads[this.keyboardCount-1].initialize()
                    this.keyborads[this.keyboardCount-1].component.position = 
                    {
                        x: this.hero.component.position.x + 40,
                        y: this.hero.component.position.y -20
                    }

                    this.keyborads[this.keyboardCount-1].component.initPosition = this.keyborads[this.keyboardCount-1].component.position

                    
                    this.rootScene.attach(this.keyborads[this.keyboardCount-1])
                    this.audio.play({name: 'throw'})
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
                this.heroAlive = false
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
                    this.goldSwords[k].pic = null
                    this.matter.removeBody(this.goldSwords[k].component.body)
                } 
                else if (pair.bodyA === this.boss.component.body && pair.bodyB === this.goldSwords[k].component.body)
                {
                    this.goldSwords[k].pic = null
                    this.matter.removeBody(this.goldSwords[k].component.body)
                    this.bossHP -= this.goldSwordDamage
                }
            }
            for (var k = 0; k < this.keyborads.length; k++)
            {
                if (pair.bodyA === this.keyborads[k].component.body && pair.bodyB === this.boss.component.body) 
                {
                    this.keyborads[k].pic = null
                    this.matter.removeBody(this.keyborads[k].component.body)
                } 
                else if (pair.bodyA === this.boss.component.body && pair.bodyB === this.keyborads[k].component.body)
                {
                    this.keyborads[k].pic = null
                    this.matter.removeBody(this.keyborads[k].component.body)
                    this.bossHP -= this.keyboardDamage
                }
            }
        }
        //#endregion
        
        //#region rockets
        
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];
            for (var k = 0; k < this.mode1_rockets.length; k++)
            {
                // 碰到邊界
                for (var q = 0; q < this.blocksPos.length; q++)
                {
                    if (pair.bodyA === this.mode1_rockets[k].component.body && pair.bodyB === this.blocks[q].component.body) 
                    {
                        this.mode1_rockets[k].pic = null
                        this.matter.removeBody(this.mode1_rockets[k].component.body)
                    } 
                    else if (pair.bodyA === this.blocks[q].component.body 
                        && pair.bodyB === this.mode1_rockets[k].component.body) 
                    {
                        this.mode1_rockets[k].pic = null
                        this.matter.removeBody(this.mode1_rockets[k].component.body)
                    } 
                } 

                // 碰到金刀
                for (var w = 0; w < this.goldSwords.length; w++)
                {
                    if (pair.bodyA === this.mode1_rockets[k].component.body && pair.bodyB === this.goldSwords[w].component.body) 
                    {
                        this.goldSwords[w].pic = null
                        this.matter.removeBody(this.goldSwords[w].component.body)

                    } 
                    else if (pair.bodyA === this.goldSwords[w].component.body 
                        && pair.bodyB === this.mode1_rockets[k].component.body) 
                    {
                        this.goldSwords[w].pic = null
                        this.matter.removeBody(this.goldSwords[w].component.body)
                    } 
                }

                //碰到鍵盤
                for (var w = 0; w < this.keyborads.length; w++)
                {
                    if (pair.bodyA === this.mode1_rockets[k].component.body && pair.bodyB === this.keyborads[w].component.body) 
                    {
                        this.keyborads[w].pic = null
                        this.matter.removeBody(this.keyborads[w].component.body)

                    } 
                    else if (pair.bodyA === this.keyborads[w].component.body 
                        && pair.bodyB === this.mode1_rockets[k].component.body) 
                    {
                        this.keyborads[w].pic = null
                        this.matter.removeBody(this.keyborads[w].component.body)
                    } 
                } 

                // 碰到 hero
                if (pair.bodyB === this.mode1_rockets[k].component.body && pair.bodyA === this.hero.component.body) 
                {
                    this.mode1_rockets[k].pic = null
                    this.matter.removeBody(this.mode1_rockets[k].component.body)
                    this.heroAlive = false
                } 
            }
        }
        //#endregion
    }
};
