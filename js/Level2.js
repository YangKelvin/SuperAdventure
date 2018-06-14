// 使用 matter製造的物件的position為圖片的左上角

class Level2 extends Framework.Level 
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
        this.score = 0              // 關卡的計分
        this.isPrincess = true     // 判斷公主是否載入關卡
        this.dieUpdateCount = 0

        this.princessPos = {x:4200, y:606} // 公主初始位置

        //地板是否掉落
        this.isBreakDown = false
        this.isBreakDown_stop = false

        // 鎖定角色位置 -> 避免角色從方塊上滑落
        this.startLockHeroPos = false   
        this.lockHeroPos
        this.lockHeroPosx
        
        // blockQ collision
        this.isblockQcollision = false
        this.blockIndex = 0
        this.waitCount = 0
        this.count = 0

        // blockUV collision
        this.isblockUVcollision = false
        this.blockUVIndex = 0

        // 判斷是否顯示Block_Go的尖刺
        this.isblock_Go_thorn = false

        // 判斷是否顯示雲的尖刺
        this.iscloud_thorn = false

        // block_Prompt停止掉落
        this.block_Prompt_Stop = false

        //開關是否打開
        this.isSwitchOn = false
        
        //地板尖刺是否出現
        this.isGroundThorn = false

        //草的尖刺是否出現
        this.isGrassThorn = false

        //方塊陷阱是否觸發
        this.blockStart = false
        this.blockStop = false

        // 花朵是否出現
        this.isflower = false
        this.Firstflower = true
        this.flower_stop = false

        // 是否觸發火箭
        this.isRocket = false
        this.isRocket_stop = false

        // 是否觸發巨臉
        this.isBigFace = false
        this.isBigFace_stop = false
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
        // 重置 level
        this.sleep(1000);
        Framework.Game._levels.splice(7,1,{name : "level2", level : new Level2()})
        Framework.Game.userIQ -= 50
        Framework.Game._goToLevelIs = "level2"
        
        Framework.Game.goToLevel("dieScreen")
        
        console.log("hero die")
    }

    //#region  load

    loadPic()
    {
        this.heroDiePicPos = [{x: -100, y: -100},]
        this.heroDiePic = new Framework.Sprite('images/heroDiePic.png')
        this.heroDiePic.position = {x: -100, y: -100}
        this.rootScene.attach(this.heroDiePic)
    }

    loadCamera()
    {
        this.cameraPos = {x:200, y:930}

        this.cameraOps = 
        {
            label: 'camera', 
            friction: 0.05, 
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
        this.rootScene.attach(this.heroInfoX)


        this.heroInfoY = new Textbox()
        this.heroInfoY.position = {x:1000, y:80}
        this.heroInfoY._text= "hero_y : "
        this.rootScene.attach(this.heroInfoY)

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
        this.princessPos = {x:3740, y:606}
        
        this.princessOps = 
        { 
            label: 'princess', 
            friction: 0.05, 
            density:0.002,
            isStatic: false
        }

        this.princess =new block('images/princess.png', 
                                        this.matter,
                                        this.princessOps)
        this.princess.load()
        this.princess.initialize()
        this.princess.component.position = this.princessPos
        this.rootScene.attach(this.princess)
    }
    loadGround()
    {
        // floor
        this.floorsPos = 
            [
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
                {x: 980, y: 780},
                {x: 1050, y: 780},
                {x: 1120, y: 780},
                {x: 1190, y: 780},
                {x: 1260, y: 780},
                {x: 1330, y: 780},
                {x: 1400, y: 780},
                {x: 1470, y: 780},
                {x: 1540, y: 780},
                {x: 1610, y: 780},
                {x: 1680, y: 780},
                {x: 1750, y: 780},//會向下坍塌25
                {x: 1820, y: 780},//會向下坍塌26
                {x: 1890, y: 780},//會向下坍塌27
                {x: 1960, y: 780},
                {x: 2030, y: 780},
                {x: 2100, y: 780},

                {x: 2190, y: 260},
                {x: 2260, y: 260},
                {x: 2330, y: 260},
                {x: 2400, y: 260},
                {x: 2470, y: 260},

                {x: 2840, y: 780},//36
                {x: 2910, y: 780},
                {x: 2980, y: 780},
                {x: 3050, y: 780},
                {x: 3120, y: 780},
                {x: 3190, y: 780},
                {x: 3260, y: 780},
                {x: 3330, y: 780},
                {x: 3400, y: 780},
                {x: 3470, y: 780},
                {x: 3540, y: 780},
                {x: 3610, y: 780},

                {x: 3090, y: 480},//48
                {x: 3160, y: 480},//49


                {x: 3680, y: 780},
                {x: 3750, y: 780},
                {x: 3820, y: 780}
            ]
        
        this.floorOps = 
        {
            label: 'floor', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }

        this.floors = []
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
    }
    loadWall()
    {
        this.wallsPos = 
        [
            {x: 1540, y: 220},
            {x: 1610, y: 220},

            {x: 1540, y: 710},
            {x: 1540, y: 640},
            {x: 1540, y: 570},
            {x: 1540, y: 500},
            {x: 1540, y: 430},
            {x: 1540, y: 360},
            {x: 1540, y: 290},
            
            {x: 1610, y: 710},
            {x: 1610, y: 640},
            {x: 1610, y: 570},
            {x: 1610, y: 500},
            {x: 1610, y: 430},
            {x: 1610, y: 360},
            {x: 1610, y: 290}
        ]
        
        this.wallOps = 
        {
            label: 'wall', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true,
            isSensor:false
        }

        this.walls = []
        for (var i = 0; i < this.wallsPos.length; i++)
        {
            this.walls[i] = new block('images/blockNone.png', 
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
    loadBlockQ()
    {
        this.BlockQPos = 
        [
            {x: 1470, y: 500}
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
    loadBlockUV()
    {
        // unvisible block
        this.blockUVsPos = 
        [
           {x: 980, y: 290},
           {x: 1370, y: 240},
           {x: 2120, y: 500},
           {x: 2990, y: 240}
        ]
        this.blockUVsOps = 
        {
            label: 'blockUV', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:true
        }
        this.blockUVs = []
        for (var i = 0; i < this.blockUVsPos.length; i++)
        {
            this.blockUVs[i] = new block('images/blockUV.png', 
                                            this.matter,
                                            this.blockUVsOps)
            this.blockUVs[i].load()
            this.blockUVs[i].initialize()
            this.blockUVs[i].component.position = this.blockUVsPos[i]
            this.rootScene.attach(this.blockUVs[i])
            
        }
    }
    loadBlockPrompt()
    {
        this.block_PromptOps = 
        {
            label: 'block_Prompt', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:false
        }

        this.block_Prompt = new block('images/blockPrompt.png',
                                        this.matter,
                                        this.block_PromptOps)
        this.block_Prompt.load()
        this.block_Prompt.initialize()
        this.block_Prompt.component.position = {x: 500, y: 100}
        this.rootScene.attach(this.block_Prompt)
    }
    loadSwitch()
    {
        this.switchOn = new Framework.Sprite(define.imagePath + 'switch-on.png')
        this.switchOn.position = {x: -100, y: -100}
        this.rootScene.attach(this.switchOn)

        this.switchOff = new Framework.Sprite(define.imagePath + 'switch-off.png')
        this.switchOff.position = {x: 560, y: 730}
        this.rootScene.attach(this.switchOff)
    }
    loadGrass()
    {
        this.grassPos = 
        [
            {x: 1050, y: 750},
            {x: 1120, y: 750},
            {x: 1190, y: 750},
            {x: 1260, y: 750},
            {x: 2840, y: 750},
            {x: 2910, y: 750},
            {x: 2980, y: 750},
            {x: 3050, y: 750},
            {x: 3120, y: 750},
            {x: 3190, y: 750},
            {x: 3260, y: 750},
        ]
        this.grassArray = []
        this.grassThorns = []
        for (var i = 0; i < this.grassPos.length; i++)
        {
            this.grassArray[i] = new Framework.Sprite(define.imagePath + 'trap-grass1.png')
            this.grassArray[i].position = this.grassPos[i]
            this.rootScene.attach(this.grassArray[i])
        }

        for(var i = 0; i < this.grassPos.length; i++)
        {
            this.grassThorns[i] = new Framework.Sprite(define.imagePath + 'trap-grass2.png')
            this.grassThorns[i].position = this.grassPos[i]
        }
    }
    loadGroundThorn()
    {
        this.GroundThornPos = 
        [
            {x: 1540, y: 190},
            {x: 1610, y: 190}
        ]
        this.GroundThorns = []

        for (var i = 0; i < this.GroundThornPos.length; i++)
        {
            this.GroundThorns[i] = new Framework.Sprite(define.imagePath + 'groundThorn.png')
            this.GroundThorns[i].position = this.GroundThornPos[i]
            // this.rootScene.attach(this.GroundThorns[i])
        }
    }
    loadMonsterCloud()
    {
        this.cloudOps = 
        {
            label: 'cloud', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:false
        }
        
        this.cloud = new block('images/cloud.png',
                                        this.matter,
                                        this.cloudOps)

        this.cloud.load()
        this.cloud.initialize()
        this.cloud.component.position = {x: 1820, y: 80}
        this.rootScene.attach(this.cloud)

        this.cloudThorn = new Framework.Sprite(define.imagePath + 'cloudThorn.png')
        this.cloudThorn.position = {x: -200, y: -200}
        this.rootScene.attach(this.cloudThorn)
    }
    loadflower()
    {
        this.flowerOps = 
        {
            label: 'flower', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:true
        }
        
        this.flower = new block('images/trap-flower.png',
                                        this.matter,
                                        this.flowerOps)

        this.flower.load()
        this.flower.initialize()
        this.flower.component.position = {x: -200, y: -200}
        this.rootScene.attach(this.flower)
    }
    loadRocket()
    {
        this.rocketsPos = 
        [
            {x: 3500, y: 190},
            {x: 3500, y: 120},
            {x: 3500, y: 50},
            {x: 3500, y: -20},
        ]
        this.rocketsOps = 
        {
            label: 'rocket', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true,
        }
        this.rockets = []
        for (var i = 0; i < this.rocketsPos.length; i++)
        {
            this.rockets[i] = new block('images/rocket_left.png', 
                                            this.matter,
                                            this.rocketsOps)
            this.rockets[i].load()
            this.rockets[i].initialize()
            this.rockets[i].component.position = this.rocketsPos[i]
            this.rootScene.attach(this.rockets[i])
        }
    }
    loadBigFace()
    {
        this.bigFaceOps =
        {
            label: 'bigFace', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true,
        }

        this.bigFace = new block('images/bigFace.png',
                                        this.matter,
                                        this.bigFaceOps)

        this.bigFace.load()
        this.bigFace.initialize()
        this.bigFace.component.position = {x: 3550, y: 20}
        this.rootScene.attach(this.bigFace)
    }
    //#endregion
    load() 
    {
        Framework.Game.initialize()

        this.loadBackground()
        this.loadTextbox()
        this.loadICON()
        
        this.loadCamera()

        this.loadGround()
        this.loadWall()

        this.loadflower()
        this.loadBlockQ()
        this.loadBlockUV()

        this.loadPrincess()

        this.loadBlockPrompt()
        this.loadSwitch()
        this.loadGrass()
        this.loadGroundThorn()
        this.loadMonsterCloud()
        this.loadRocket()
        this.loadBigFace()
        

        this.loadHero()
        
        this.loadPic()
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlocks))
        console.log("Level2 Start")
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

        //#region move blockUV
        for	(var i = 0; i<this.blockUVs.length; i++)
        {
            this.matter.setBody(this.blockUVs[i].component.body, 
                "position", 
                {x: this.blockUVs[i].component.position.x + moveLength, y: this.blockUVs[i].component.position.y})  
        }
        //#endregion

        //#region move princess
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
   
        //#region move block_Prompt
        this.matter.setBody(this.block_Prompt.component.body, 
            "position", 
            {x: this.block_Prompt.component.position.x + moveLength, y: this.block_Prompt.component.position.y})
        //#endregion

        // region move switch
        this.switchOn.position = {x: this.switchOn.position.x + moveLength, y: this.switchOn.position.y}
        this.switchOff.position = {x: this.switchOff.position.x + moveLength, y: this.switchOff.position.y}
        // endregion

        // region move grass
        for(var i = 0; i < this.grassArray.length; i++)
        {
            this.grassArray[i].position = {x: this.grassArray[i].position.x + moveLength, y: this.grassArray[i].position.y}
            this.grassThorns[i].position = {x: this.grassThorns[i].position.x + moveLength, y: this.grassThorns[i].position.y}
        }
        // endregion

        // region move walls
        for(var i = 0; i < this.walls.length; i++)
        {
            this.matter.setBody(this.walls[i].component.body,
                "position", 
                {x: this.walls[i].component.position.x + moveLength, y: this.walls[i].component.position.y})
        }
        // endregion

        // region move GroundThorns
        for(var i = 0; i < this.GroundThorns.length; i++)
        {
            this.GroundThorns[i].position =
            {
                x: this.GroundThorns[i].position.x + moveLength,
                y: this.GroundThorns[i].position.y
            }
        }
        // endregion

        // region move cloud
        this.matter.setBody(this.cloud.component.body, 
            "position", 
            {x: this.cloud.component.position.x + moveLength, y: this.cloud.component.position.y})

        this.cloudThorn.position = {x: this.cloudThorn.position.x + moveLength, y: this.cloudThorn.position.y}
        // endregion

        // region move flower
        this.matter.setBody(this.flower.component.body, 
            "position", 
            {x: this.flower.component.position.x + moveLength, y: this.flower.component.position.y})
        // endregion

        // region move rockets
        if(!this.isRocket_stop)
        {
            for(var i = 0; i < 4; i++)
            {
                this.matter.setBody(this.rockets[i].component.body, 
                    "position", 
                    {x: this.rockets[i].component.position.x + moveLength, y: this.rockets[i].component.position.y})
            }
        }
        // endregion

        // region move bigFace
        if (!this.isBigFace_stop)
        {
            this.matter.setBody(this.bigFace.component.body, 
                "position", 
                {x: this.bigFace.component.position.x + moveLength, y: this.bigFace.component.position.y})
        }
        // endregion
    }

    blockUpDown(target)
    {
        if (this.waitCount < 10)
        {
            this.matter.setBody(target.body, 
                "position", 
                {x: target.position.x, y: target.position.y - 2.5})
        }
        else
        {
            this.matter.setBody(target.body, 
                "position", 
                {x: target.position.x, y: target.position.y + 2.5})
        }
        this.waitCount ++

        if (this.waitCount === 20)
        {
            this.isblockQcollision = false
            this.waitCount = 0
        }
    }
    blockDisplay(target)
    {
        if (this.count < 15)
        {
            this.matter.setBody(target.body, 
                "position", 
                {x: target.position.x, y: target.position.y - 5})
            this.count ++
        }
        else
        {
            this.count = 0
            this.flower_stop = true
        }
    }
    block_Prompt_Drop()
    {

        if (this.block_Prompt.component.position.y + this.block_Prompt.component.sprite.height / 2 >= 780)
        {
            this.block_Prompt_Stop = true;
        }
        else if(!this.block_Prompt_Stop && this.isSwitchOn && this.block_Prompt.component.position.y + this.block_Prompt.component.sprite.height / 2 <= 780)
        {
            this.matter.setBody(this.block_Prompt.component.body, 
                "position", 
                {x: this.block_Prompt.component.position.x + 0, y: this.block_Prompt.component.position.y + 8})
        }
    }
    blockOpen()
    {
        this.matter.setBody(this.floors[48].component.body, 
            "position", 
            {x: this.floors[48].component.position.x - 5, y: this.floors[48].component.position.y})
        this.matter.setBody(this.floors[49].component.body, 
            "position", 
            {x: this.floors[49].component.position.x + 5, y: this.floors[49].component.position.y})
        if(this.floors[48].component.position.x <= this.floors[37].component.position.x)
        {
            this.blockStop = true
        }
    }
    RocketAttack()
    {
        for(var i = 0; i < 4; i++)
        {
            this.matter.setBody(this.rockets[i].component.body, 
                "position", 
                {x: this.rockets[i].component.position.x - 14, y: this.rockets[i].component.position.y + 0})
        }
        if (this.rockets[3].component.position.x <= this.floors[14].component.position.x)
        {
            this.isRocket_stop = true
            for(var i = 0; i < 4; i++)
            {
                this.rockets[i].pic = null
                this.matter.removeBody(this.rockets[i].component.body)
            }
        }
    }
    BigFaceAttack()
    {
        this.matter.setBody(this.bigFace.component.body, 
            "position", 
            {x: this.bigFace.component.position.x - 14, y: this.bigFace.component.position.y + 0})

        if (this.bigFace.component.position.x <= this.floors[14].component.position.x)
        {
            this.isBigFace_stop = true
            this.bigFace.pic = null
            this.matter.removeBody(this.bigFace.component.body)
        }
    }
    update() 
    {
        // region判斷是否觸發開關
        if(!this.isSwitchOn && this.switchOff.position.x <= 520 && this.switchOff.position.x >= 410 && this.hero.component.position.y >= 720)
        {
            this.switchOn.position = {x: this.switchOff.position.x, y: this.switchOff.position.y}
            this.switchOff.position = {x: -100, y: -100}
            this.isSwitchOn = true
        }
        // endregion

        // region 如果撞到Q方塊，Q方塊上下移動
        if (this.isblockQcollision)
        {
            this.blockUpDown(this.BlockQs[this.blockIndex].component)  // 方塊上下移動
        }
        // endregion

        // 判斷block_Promp是否向下掉落並執行
        this.block_Prompt_Drop()

        // region 地板掉落陷阱是否觸發
        if (this.isBreakDown && !this.isBreakDown_stop)
        {
            for(var i = 25; i < 28; i++)
            {
                this.matter.setBody(this.floors[i].component.body, 
                    "position", 
                    {x: this.floors[i].component.position.x + 0, y: this.floors[i].component.position.y + 10})
            }
            if(this.floors[28].component.position.y >= 900)
            {
                this.isBreakDown_stop = true
            }
        }
        //endregion

        // region 火箭攻擊
        if (this.hero.component.position.x >= this.floors[33].component.position.x)
        {
            this.isRocket = true
        }
        if (this.isRocket && !this.isRocket_stop)
        {
            this.RocketAttack()
        }
        // endregion

        // region 巨臉攻擊
        if (this.isRocket_stop && this.hero.component.position.x >= this.floors[33].component.position.x)
        {
            this.isBigFace = true
        }
        if (this.isBigFace && !this.isBigFace_stop)
        {
            this.BigFaceAttack()
        }
        // endregion

        //#region hero die condition
        if (this.hero.component.position.y > 1000)
        {
            this.heroAlive = false
        }
        //#endregion

        // region 花朵出現
        if (this.isflower && !this.isblockQcollision && !this.flower_stop)
        {
            if (this.Firstflower && this.isflower)
            {
                this.matter.setBody(this.flower.component.body, 
                    "position", 
                    {x: this.BlockQs[this.blockIndex].component.position.x + 0, y: this.BlockQs[this.blockIndex].component.position.y+10})
                this.Firstflower = false
            }
            this.blockDisplay(this.flower.component)
        }
        // endregion

        // region block open
        if (this.hero.component.position.y < 480 && this.hero.component.position.y >= 200 && this.floors[31].component.position.x <= 0)
        {
            this.blockStart = true
        }
        if (this.blockStart && !this.blockStop)
        {
            this.blockOpen()
        }
        // endregion

        //#region judge hero die or not
        if(this.heroAlive === false)
        {
            console.log("this.heroAlive = flase")
            this.isPress = false
            this.isJump = false
            this.isPressWalk = false
            
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
                let moveLength = 0
                if (this.walkDirection === 1)
                {
                    moveLength = -5
                    // go right
                    if (this.hero.component.position.x < 500)
                    {
                        this.hero.goRight()
                    }
                    else if (this.floors[this.floors.length - 1].component.position.x <= 1570)
                    {
                        this.hero.goRight()
                    }
                    else 
                    {
                        this.hero.component.position.x = 502
                        this.moveMap(moveLength)
                    }
                }
                else if (this.walkDirection === 2)
                {
                    // go left
                    if (this.hero.component.position.x > 50)    //讓hero.position不會小於70
                    {
                        if (this.floors[0].component.position.x === 35 || this.floors[this.floors.length - 1].component.position.x <= 1570)   // 如果第一個方塊的位置正確
                        {
                            if (this.floors[0].component.position.x === 35 && this.hero.component.position.x <= 502)
                            {
                                this.hero.goLeft()
                            }
                            // 
                            else if (this.floors[this.floors.length - 1].component.position.x <= 1570 && this.hero.component.position.x <= 502)
                            {
                                console.log("A")
                                this.moveMap(5)
                                this.hero.component.position.x = 502
                            }
                            else if (this.floors[this.floors.length - 1].component.position.x <= 1570 && this.hero.component.position.x > 502)
                            {
                                this.hero.goLeft()
                            }
                        }
                        
                        else
                        {
                            if (this.hero.component.position.x >= 504)
                            {
                                this.matter.setBody(this.hero.component.body, 
                                    "position", 
                                    {x: this.hero.component.position.x, y:this.hero.component.position.y})
                            }
                            else if (this.hero.component.position.x < 504)
                            {
                                
                                this.moveMap(5)
                            }
                            
                        }
                    } 
                }
                this.lockHeroPosx = this.hero.component.position.x
            }

            if(this.isJump && this.hero.isOnFloor)
            {
                this.hero.jump()
                this.hero.isOnFloor = false
            }
        }
        //#endregion    

        //#region 防止英雄滑落
        if (this.startLockHeroPos)
        {
            // this.hero.component.position = this.lockHeroPos
            this.hero.component.position.x = this.lockHeroPosx
        }
        //#endregion
        
        //#region update textbox
        this.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.heroInfoY._value = Math.round(this.hero.component.position.y)
        //#endregion
        

        // region 碰到地板尖刺
        if(this.isGroundThorn)
        {
            this.rootScene.attach(this.GroundThorns[0])
            this.rootScene.attach(this.GroundThorns[1])
            this.heroAlive = false
        }
        // endregion

        // region 碰到草叢尖刺
        if(this.isGrassThorn)
        {
            for(var i = 0; i < this.grassThorns.length; i++)
            {
                this.rootScene.attach(this.grassThorns[i])
            }
            this.heroAlive = false
        }
        // endregion

        //#region update 註解和非註解 有奇怪的差異...
        this.matter.setBody(this.camera.component.body, 
            "position", 
            {x: this.camera.component.position.x + 0, y: this.camera.y})
        
        this.hero.update()
        this.matter.update()
        this.rootScene.update() // 對齊 component & sprite
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
            Framework.Game._levels.splice(3,1,{name : "level2", level : new Level2()})
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

            for (var k = 0; k < this.floorsPos.length; k++)
            {
                if (pair.bodyA === this.floors[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    this.hero.isOnFloor = true
                    if (k >= 15 && k < 19)
                    {
                        this.isGrassThorn = true
                    }
                    else if (k >= 25 && k < 28)
                    {
                        this.isBreakDown = true
                    }
                    else if (k >= 36 && k < 43)
                    {
                        this.isGrassThorn = true
                    }
                }
            }
        }
        //#endregion

        //#region collision between hero and blockQ
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.BlockQs.length; k++)
            {
                if (pair.bodyA === this.BlockQs[k].component.body && pair.bodyB === this.hero.component.body) 
                {
                    this.hero.isOnFloor = true

                    var blockHalfWidth = this.BlockQs[k].component.sprite.width / 2
                    if ((this.hero.component.position.y - this.BlockQs[k].component.position.y - this.BlockQs[k].component.sprite.height >= 0) && 
                        (this.hero.component.position.x >= this.BlockQs[k].component.position.x - blockHalfWidth) && 
                        (this.hero.component.position.x <= this.BlockQs[k].component.position.x + blockHalfWidth))
                    {
                        this.isblockQcollision = true
                        this.blockIndex = k

                        if (k === 0)
                        {
                            this.Firstflower = true
                            this.isflower = true
                        }
                    }
                }
            }
        }
        //#endregion

        // region collision between hero and block_Prompt
        if (pair.bodyA === this.block_Prompt.component.body && pair.bodyB === this.hero.component.body)
        {
            this.hero.isOnFloor = true

            if (this.block_Prompt.component.position.y  + (this.block_Prompt.component.sprite.height / 2 + 20) >= this.hero.component.position.y - this.hero.component.sprite.height / 0.3 / 2 &&
                this.isSwitchOn && !this.block_Prompt_Stop && this.hero.component.position.x + (this.hero.component.sprite.width / 0.3 / 2) >= this.block_Prompt.component.position.x - this.block_Prompt.component.sprite.width / 2 &&
                this.hero.component.position.x - (this.hero.component.sprite.width / 0.3 / 2) <= this.block_Prompt.component.position.x + this.block_Prompt.component.sprite.width / 2)
            {
                this.block_Prompt_Stop = true;
                this.heroAlive = false;
            }
        }
        // endregion

        // region collision between hero and wall
        for(var i = 0; i < 2; i++)
        {
            if (pair.bodyA === this.walls[i].component.body && pair.bodyB === this.hero.component.body
                && this.walls[i].component.position.y-this.walls[i].component.sprite.height/2 >= this.hero.component.position.y)
            {
                this.isGroundThorn = true
            }
        }
        // endregion
    
        // region collision between hreo and blockUV
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.blockUVsPos.length; k++)
            {
                if ((pair.bodyA === this.blockUVs[k].component.body && pair.bodyB === this.hero.component.body) || 
                    (pair.bodyB === this.blockUVs[k].component.body && pair.bodyA === this.hero.component.body)) 
                {
                    var blockHalfWidth = this.blockUVs[k].component.sprite.width / 2
                    var blockHalfHeight = this.blockUVs[k].component.sprite.height / 2

                    this.hero.isOnFloor = true
                    if (this.hero.component.position.y >= this.blockUVs[k].component.position.y + blockHalfHeight)
                    {   
                        if (!this.blockUVs[k].isUVshow)
                        {
                            this.tempPos = this.blockUVs[k].component.sprite.position

                            this.blockUVs[k].pic = null
                            this.matter.removeBody(this.blockUVs[k].component.body)
                            this.blockUVsOpsNEW = 
                            {
                                label: 'blockUV', 
                                friction: 0.05, 
                                density:0.002, 
                                isStatic:true, 
                                isSensor:false
                            }

                            this.blockUVs[k] = new block('images/blockNone.png', 
                                            this.matter,
                                            this.blockUVsOpsNEW)
                            this.blockUVs[k].load()
                            this.blockUVs[k].initialize()
                            this.blockUVs[k].component.position = this.tempPos
                            this.blockUVs[k].isUVshow = true
                            this.rootScene.attach(this.blockUVs[k])
                        }
                    }
                }
                
            }
        }
        // endregion

        // region collision between hero and cloud
        if (pair.bodyA === this.cloud.component.body && pair.bodyB === this.hero.component.body)
        {
            this.iscloud_thorn = true
            this.cloudThorn.position =
            {
                x: this.cloud.component.position.x - this.cloud.component.sprite.width / 2 - 25,
                y: this.cloud.component.position.y - this.cloud.component.sprite.height / 2 - 13
            }
            this.heroAlive = false
        }
        // endregion

        // region collision between hero and flower
        if (pair.bodyA === this.flower.component.body && pair.bodyB === this.hero.component.body)
        {
            this.flower.pic = null
            this.matter.removeBody(this.flower.component.body)
            this.heroAlive = false
        }
        // endregion

        // region collision between hero and rocket
        for(var i = 0; i < 4; i++)
        {
            if (pair.bodyA === this.rockets[i].component.body && pair.bodyB === this.hero.component.body)
            {
                this.heroAlive = false
                this.isRocket_stop = true
            }
        }
        // endregion

        // region collision between hero and bigface
        if (pair.bodyA === this.bigFace.component.body && pair.bodyB === this.hero.component.body)
        {
            this.heroAlive = false
            this.isBigFace_stop = true
        }
        // endregion

        // region  collision between hero and princess
        if (pair.bodyA === this.princess.component.body && pair.bodyB === this.hero.component.body)
        {
            console.log("win")
            Framework.Game.records[1].record = Framework.Game.userIQ
            Framework.Game._goToLevelIs = ""
            Framework.Game.userIQ = 250

            Framework.Game.items[1].item = true
            Framework.Game.goToLevel("chooseLevel");
            Framework.Game._levels.splice(7,1,{name : "level2", level : new Level2()})
        }
        // endregion
    }
};
