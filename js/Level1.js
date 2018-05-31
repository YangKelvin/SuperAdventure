// 使用 matter製造的物件的position為圖片的左上角

class Level1 extends Framework.Level 
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

        this.isTriggleTrollBridge = false   // 判斷是否觸發陷阱橋掉落
        this.bridgeFall = 0                 // 陷阱掉落的移動量

        this.princessPos = {x:4200, y:606} // 公主初始位置

        // 鎖定角色位置 -> 避免角色從方塊上滑落
        this.startLockHeroPos = false   
        this.lockHeroPos
        this.lockHeroPosx
        
        // blockQ collision
        this.isblockQcollision = false
        this.blockIndex = 0
        this.waitCount = 0

        // blockUV collision
        this.isblockUVcollision = false
        this.blockUVIndex = 0
        this.isShotRocket = false

        // blockQ1 collision
        this.isCollisionQ1 = false
        this.isBlockGo= false


        // 判斷是否顯示Block_Go的尖刺
        this.isblock_Go_thorn = false

        // 判斷是否顯示雲的尖刺
        this.iscloud_thorn = false

        // block_GO 掉落和停止
        this.isBlockGo_Drop = false
        this.block_GO_Drop_stop = false

        this.isUDIEcollision =
        [
            false,
            false,
            false,
            false,
            false,
        ]

        this.isShouldRemoveFloor = false
        this.isRemoveFloor = false

        // 換關卡
        this.dieUpdateCount = 0
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
        Framework.Game._levels.splice(0,1,{name : "level1", level : new Level1()})
        Framework.Game.userIQ -= 50
        Framework.Game._goToLevelIs = "level1"
        
        Framework.Game.goToLevel("dieScreen")
        
        console.log("hero die")
    }

    //#region  load

    loadPic()
    {
        this.picsPos = 
        [
            {x: -1000, y: 500},
            {x: -1000, y: 500},
            {x: -1000, y: 500},
            {x: -1000, y: 500},
            {x: -1000, y: 500},
            {x: -1000, y: 500},
        ]
        
        this.pics = new Array()
        for (var i = 0; i < this.picsPos.length; i++)
        {
            this.pics = new Framework.Sprite('images/UDIE'+i+'.png')

        }

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
        // console.log("Finish loaded bg")
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
        this.rootScene.attach(this.princess)
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

                {x: 1750, y: 780},
                {x: 1820, y: 780},
                {x: 1890, y: 780},
                {x: 1960, y: 780},
                {x: 2030, y: 780},
                {x: 2100, y: 780},
                {x: 2170, y: 780}, // 35
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
    loadUDIE()
    {
        this.UDIEsPos = 
        [
            {x: 2870, y: 500},
            {x: 2940, y: 500},
            {x: 3010, y: 500},
            {x: 3080, y: 500},
            {x: 3150, y: 500},
            {x: 3220, y: 500},
        ]
        
        this.UDIEOps = 
        {
            label: 'UDIE', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true,
            isSensor:true,
        }

        this.UDIEs = new Array()
        for (var i = 0; i < this.UDIEsPos.length; i++)
        {
            this.UDIEs[i] = new block('images/blockUV.png', 
                                            this.matter, 
                                            this.UDIEOps)
            this.UDIEs[i].load()
            this.UDIEs[i].initialize()
            this.UDIEs[i].component.position = this.UDIEsPos[i]

            this.rootScene.attach(this.UDIEs[i])
        }
        // console.log("Finish loaded UDIEs ")
    }

    loadPipe()
    {
        this.PipePos = 
        [
            {x: 2660, y: 483},
            {x: 3290, y: 483},
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
            {x: 350, y: 480},
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
        // region monsters
        this.monstersPos = 
        [
            
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
        // endregion

        // #region Cloud
        this.cloudMonstersPos = 
        [
            {x: 1100, y: 100}
        ]

        this.cloudMonsterOps = 
        {
            label: 'cloudMonster', 
            friction: 0.05, 
            density:0.002,
            isStatic: true
        }

        this.cloudMonsters = []
        for (var i = 0; i < this.cloudMonstersPos.length; i++)
        {
            this.cloudMonsters[i] = new Character('images/cloud.png',
                                                this.matter,
                                                this.cloudMonsterOps,
                                                this.cloudMonstersPos)
            this.cloudMonsters[i].load()
            this.cloudMonsters[i].initialize()
            this.cloudMonsters[i].component.position = this.cloudMonstersPos[i]
            this.rootScene.attach(this.cloudMonsters[i])
        }


        this.cloudMonster_thorn = new Framework.Sprite(define.imagePath + 'cloudThorn.png')
        this.cloudMonster_thorn.position = {x: -200, y: -200}
        // #endregion
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
    loadRocket()
    {
        this.rocketPos = 
        [
            
        ]

        this.rocketOps = 
        {
            label: 'rocket', 
            friction: 0.05, 
            density:0.002,
            isStatic: true
        }

        this.rockets = []
        for (var i = 0; i < this.rocketPos.length; i++)
        {
            this.rockets[i] = new block('images/rocket.png', 
                                                this.matter,
                                                this.rocketOps)
            this.rockets[i].load()
            this.rockets[i].initialize()
            this.rockets[i].component.position = this.rocketPos[i]
            this.rootScene.attach(this.rockets[i])
        }
    }
    loadBlockUV()
    {
        // unvisible block
        this.blockUVsPos = 
        [
            {x: 960, y: 480},   // 懸崖旁的隱藏方塊
            {x: 2830, y: 220},   // pipe上的隱藏方塊
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
    loadGoBlock()
    {
        this.block_GOPos = 
        {
            x: 500,
            y: 400
        }
        this.block_GOOps = 
        {
            label: 'block_GO', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:false
        }

        this.block_GO = new block('images/level1-GoBlock.png',
                                        this.matter,
                                        this.block_GOOps)
        this.block_GO.load()
        this.block_GO.initialize()
        this.block_GO.component.position = {x:-100, y:0}
        // this.rootScene.attach(this.block_GO)


        this.block_GO_thorn = new Framework.Sprite(define.imagePath + 'level1-GOBlockThorn.png')
        this.block_GO_thorn.position = {x: -100, y: 0}
    }
    //#endregion
    load() 
    {
        // console.log(this.viewCenter)
        Framework.Game.initialize()

        

        this.loadBackground()
        this.loadTextbox()
        this.loadICON()
        
        
        this.loadCamera()

        this.loadGround()

        this.loadPipe()
        this.loadUDIE()
        this.loadRocket()
        this.loadTrollBridge()
        this.loadBlockQ()
        this.loadBlockUV()
        this.loadCoin()

        this.loadMonster()
        this.loadPrincess()

        this.loadGoBlock()

        this.loadHero()
        
        this.loadPic()
        // 載入 collision
        this.matter.addEventListener("collisionStart",(this.collisionBlocks))
        console.log("Level1 Start")
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

        //#region move cloudMonsters
        for	(var i = 0; i<this.cloudMonsters.length; i++)
        {
            this.matter.setBody(this.cloudMonsters[i].component.body, 
                "position", 
                {x: this.cloudMonsters[i].component.position.x + moveLength, y: this.cloudMonsters[i].component.position.y})  
        }
        // endregion

        // region move rocket
        for	(var i = 0; i<this.rockets.length; i++)
        {
            this.matter.setBody(this.rockets[i].component.body, 
                "position", 
                {x: this.rockets[i].component.position.x + moveLength, y: this.rockets[i].component.position.y})
        }
        // endregion
   
        //#region  move blockGO
        if (this.isBlockGo)
        {
            this.matter.setBody(this.block_GO.component.body, 
                "position", 
                {x: this.block_GO.component.position.x + moveLength, y: this.block_GO.component.position.y})
        }
        //#endregion

        //#region  move UDIES
        for	(var i = 0; i<this.UDIEs.length; i++)
        {
            this.matter.setBody(this.UDIEs[i].component.body, 
                "position", 
                {x: this.UDIEs[i].component.position.x + moveLength, y: this.UDIEs[i].component.position.y})
        }
        //#endregion
    }

    blockUpDown(isBlockCollision, blocks, blockIndex)
    {
        if (isBlockCollision)
        {
            //console.log("BlockQs[" + blockIndex + "].y = " + blocks[blockIndex].component.position.y)
            if (this.waitCount < 15)
            {
                blocks[blockIndex].component.position = 
                {
                    x: blocks[blockIndex].component.position.x,
                    y: blocks[blockIndex].component.position.y - 2.5
                }
            }
            else
            {
                blocks[blockIndex].component.position = 
                {
                    x: blocks[blockIndex].component.position.x,
                    y: blocks[blockIndex].component.position.y + 2.5
                }
            }
            this.waitCount ++
        }
        if (this.waitCount === 30)
        {
            this.isblockQcollision = false
            this.isblockUVcollision = false
            this.waitCount = 0
        }
    }
    block_GO_Drop()
    {
        // 是否觸發block_GO掉落
        if (this.block_GO.component.position.x - this.block_GO.component.sprite.width / 4 <= this.hero.component.position.x &&
            this.hero.component.position.x <= this.block_GO.component.position.x + this.block_GO.component.sprite.width / 4 &&
            this.hero.component.position.y >= this.block_GO.component.position.y)
        {
            this.isBlockGo_Drop = true
        }

        // block_GO是否繼續掉落 (當砸到人物時會停止掉落)
        if (this.isBlockGo_Drop && !this.block_GO_Drop_stop)
        {
            this.matter.setBody(this.block_GO.component.body, 
                "position", 
                {x: this.block_GO.component.position.x, y: this.block_GO.component.position.y + 5})
        }
    }
    update() 
    {
        console.log(this.dieUpdateCount)
        // this.hero.animationDie()
        // console.log(this.floors[this.floors.length - 1].component.position)
        // console.log(this.hero.component.position)

        //#region triggle UDIE
        if (this.isUDIEcollision[0] === true &&
            this.isUDIEcollision[1] === true &&
            this.isUDIEcollision[2] === true &&
            this.isUDIEcollision[3] === true &&
            this.isUDIEcollision[4] === true &&
            this.isUDIEcollision[5] === true)
        {
            // load rocket\
            this.isShouldRemoveFloor = true
            
        }
        if (this.isShouldRemoveFloor && !this.isRemoveFloor)
        {
            console.log("remove floor")
            console.log(this.floors[49].component.position, this.floors[50].component.position)
            this.floors[49].pic = null
            this.floors[50].pic = null
            this.matter.removeBody(this.floors[49].component.body)
            this.matter.removeBody(this.floors[50].component.body)
            this.isRemoveFloor = true
        }
        //#endregion

        this.blockUpDown(this.isblockQcollision, this.BlockQs,this.blockIndex)  // 方塊上下移動
        
        if (this.isCollisionQ1 && !this.isBlockGo)
        {
            this.rootScene.attach(this.block_GO)
            this.block_GO.component.position = this.block_GOPos
            this.isBlockGo = true
        }
        
        // 判斷block_Go是否向下掉落並執行
        this.block_GO_Drop()

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
        
        //#region update 註解和非註解 有奇怪的差異...
        this.matter.setBody(this.camera.component.body, 
            "position", 
            {x: this.camera.component.position.x + 0, y: this.camera.y})
        
        this.hero.update()
        this.matter.update()
        this.rootScene.update() // 對齊 component & sprite
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
            Framework.Game._levels.splice(2,1,{name : "level1", level : new Level1()})
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
                    this.hero.isOnFloor = true

                    var blockHalfWidth = this.BlockQs[k].component.sprite.width / 2
                    if ((this.hero.component.position.y - this.BlockQs[k].component.position.y - this.BlockQs[k].component.sprite.height >= 0) && (this.hero.component.position.x >= this.BlockQs[k].component.position.x - blockHalfWidth)
                     && (this.hero.component.position.x <= this.BlockQs[k].component.position.x + blockHalfWidth))
                    {
                        this.isblockQcollision = true
                        this.blockIndex = k
                        console.log("blockIndex: " + this.blockIndex)
                        if (pair.bodyA === this.BlockQs[0].component.body) // 碰撞到第一個問號方塊
                        {
                            console.log("撞第一個問號方塊")
                            // add level1-GOBLOCK
                            // this.loadGoBlock()
                            this.isCollisionQ1 = true
                        }
                    }
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
                }
                
            }
        }
        //#endregion
    
        // region collision between hero and blockUV
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.blockUVsPos.length; k++)
            {
                if ((pair.bodyA === this.blockUVs[k].component.body && pair.bodyB === this.hero.component.body) || 
                    (pair.bodyB === this.blockUVs[k].component.body && pair.bodyA === this.hero.component.body)) 
                {
                    console.log("isOnFloor")
                    this.hero.isOnFloor = true

                    var blockHalfWidth = this.blockUVs[k].component.sprite.width / 2
                    if ((this.hero.component.position.y - this.blockUVs[k].component.position.y - this.blockUVs[k].component.sprite.height >= 0) && (this.hero.component.position.x >= this.BlockQs[k].component.position.x - blockHalfWidth)
                     && (this.hero.component.position.x <= this.blockUVs[k].component.position.x + blockHalfWidth))
                    {
                        this.isblockQcollision = true
                        this.blockIndex = k
                        console.log("blockIndex: " + this.blockUVIndex)
                        
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
                        this.blockUVs[k] = new block('images/blockQ.png', 
                                            this.matter,
                                            this.blockUVsOpsNEW)
                        this.blockUVs[k].load()
                        this.blockUVs[k].initialize()
                        this.blockUVs[k].component.position = this.tempPos
                        this.rootScene.attach(this.blockUVs[k])
                    }
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
                }
                
            }
        }
        
        //#endregion
    

        // region collision between hero and UDIEs
        for (var i = 0, j = pairs.length; i != j; ++i) 
        {
            var pair = pairs[i];

            for (var k = 0; k < this.UDIEsPos.length; k++)
            {
                if ((pair.bodyA === this.UDIEs[k].component.body && pair.bodyB === this.hero.component.body) || 
                    (pair.bodyB === this.UDIEs[k].component.body && pair.bodyA === this.hero.component.body)) 
                {
                    console.log("isOnFloor")
                    this.hero.isOnFloor = true

                    var blockHalfWidth = this.UDIEs[k].component.sprite.width / 2
                    if ((this.hero.component.position.y - this.UDIEs[k].component.position.y - this.UDIEs[k].component.sprite.height >= 0) && (this.hero.component.position.x >= this.UDIEs[k].component.position.x - blockHalfWidth)
                     && (this.hero.component.position.x <= this.UDIEs[k].component.position.x + blockHalfWidth))
                    {
                        this.isUDIEcollision[k] = true
                        console.log(this.isUDIEcollision)
                        // this.blockIndex = k
                        // console.log("blockIndex: " + this.blockUVIndex)
                        
                        this.tempPos = this.UDIEs[k].component.sprite.position

                        this.UDIEs[k].pic = null
                        this.matter.removeBody(this.UDIEs[k].component.body)
                        this.blockUDIEsOpsNEW = 
                        {
                            label: 'UDIE', 
                            friction: 0.05, 
                            density:0.002, 
                            isStatic:true, 
                            isSensor:false
                        }
                        console.log("UDIE")
                        this.UDIEs[k] = new block('images/UDIE'+ k + '.png', 
                                            this.matter,
                                            this.blockUDIEsOpsNEW)
                        this.UDIEs[k].load()
                        this.UDIEs[k].initialize()
                        this.UDIEs[k].component.position = this.tempPos
                        this.rootScene.attach(this.UDIEs[k])
                    }
                } 
                else if (pair.bodyA === this.hero.component.body || pair.bodyB === this.hero.component.body)
                {
                    // console.log("No Collision")
                }
                
            }
        }

        //#endregion
       
        // region collision between hero and pipe
        for(var i=0; i < this.Pipes.length; i++)
        {
            if (pair.bodyA === this.Pipes[i].component.body && pair.bodyB === this.hero.component.body)
            {
                this.hero.isOnFloor = true
            }
        }
        // endregion


        // region collision between hero and block_GO
        if (pair.bodyA === this.hero.component.body && pair.bodyB === this.block_GO.component.body)
        {
            this.hero.isOnFloor = true

            // 如果人物碰觸到block_GO下方 (有兩種情況)
            if(this.hero.component.position.y >= this.block_GO.component.position.y && !this.isblock_Go_thorn)
            {
                // 被block_Go刺死
                if (!this.isBlockGo_Drop)
                {
                    this.isblock_Go_thorn = true
                    this.rootScene.attach(this.block_GO_thorn)
                    this.block_GO_thorn.position = 
                    {
                        x: this.block_GO.component.position.x - this.block_GO.component.sprite.width / 2,
                        y: this.block_GO.component.position.y - this.block_GO.component.sprite.height / 2,
                    }
                    this.block_GO.pic = null
                    // this.matter.stopWorld()
                }
                // 被block_Go砸死
                else
                {
                    this.block_GO_Drop_stop = true
                }
                this.heroAlive = false
                // console.log("hero die")
            }
        }
        // endregion

        // region collision between hero and cloud
        if (pair.bodyA === this.cloudMonsters[0].component.body && pair.bodyB === this.hero.component.body)
        {
            this.iscloud_thorn = true   // 出現尖刺
            this.rootScene.attach(this.cloudMonster_thorn)
            this.cloudMonster_thorn.position =
            {
                x: this.cloudMonsters[0].component.position.x - this.cloudMonsters[0].component.sprite.width / 2 - 25,
                y: this.cloudMonsters[0].component.position.y - this.cloudMonsters[0].component.sprite.height / 2 - 13
            }
            console.log(this.cloudMonster_thorn.dwposition)
            this.heroAlive = false
            console.log("hero die")
        }
        // endregion

        // #region  collision between hero and princess
        if (pair.bodyA === this.princess.component.body && pair.bodyB === this.hero.component.body)
        {
            console.log("win")
            Framework.Game.records[0].record = Framework.Game.userIQ
            Framework.Game._goToLevelIs = ""
            Framework.Game.userIQ = 250

            Framework.Game.items[0].item = true
            Framework.Game.goToLevel("chooseLevel");
            Framework.Game._levels.splice(2,1,{name : "level1", level : new Level1()})
        }
        //#endregion
    }
};
