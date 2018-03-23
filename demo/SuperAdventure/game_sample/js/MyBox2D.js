var MyBox2D = Framework.Class(Framework.Level, 
    {
        load : function () 
        {
            //#region box2D
            this.box2D = new Framework.Box2D()
            this.world = this.box2D.createWorld()
            this.box2D.setContactListener();
            //#endregion

            //#region background
            // this.background = new Framework.Sprite(define.imagePath+'map0.png')
            // this.background.position = 
            // {
            //     x: 0,
            //     y: 0
            // }
            //#endregion
            
            //#region map
            //0:空 1:牆壁 2箱子
            // this.mapArray = [];
            // this.mapArray.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); //1
            // this.mapArray.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); //2
            // this.mapArray.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); //3
            // this.mapArray.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); //4
            // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //5
            // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //6
            // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //7
            // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //8
            // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //9
            // this.mapArray.push([1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]); //10
            // this.mapArray.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1]); //11
            // this.mapArray.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1]); //12

            // this.map = new Map(tihs.mapArray);
            // this.map.load();
            //#endregion

            //#region ground
            var ground = this.box2D.createSquareBody(35, 1.0, this.box2D.bodyType_Static)
            ground.SetPosition(new this.box2D.b2Vec2(10,26))
            // var wallLeft = this.box2D.createBox(this.world, 0, 0, 10, 600, 'fixed');
            // var wallRight = this.box2D.createBox(this.world, 1290, 0, 10, 400, 'fixed');
            // var ground = this.box2D.createBox(this.world, 30, 595, 1200, 5, 'fixed');

            //#endregion
    
            //#region wall position
            // this.wallsValue =
            // [
            //     {x: 900, y:500},
            //     {x: 1100, y:500},
            //     {x: 1300, y:500},
            //     {x: 1500, y:500},
            //     {x: 1150, y:200},
            //     {x: 1250, y:200},
            // ]
            // this.walls = new Array();
            // for(var i=0; i<this.wallsValue.length; i++)
            // {
            //     this.walls[i] = new wall()
            //     this.walls[i].init('wall.png', this.box2D)
            //     this.walls[i].position = 
            //     {
            //         x: this.wallsValue[i].x,
            //         y: this.wallsValue[i].y 
            //     }
            //     this.walls[i].scale = 1.0
            //     this.walls[i].rotation = 0
            // }
            //#endregion
            
            this.mapfloorValue = 
            [
                {x: 30, y: 782},
                {x: 95, y: 782},
                {x: 155, y: 782},
                {x: 215, y: 782},
                {x: 275, y: 782},
                {x: 335, y: 782},
                {x: 395, y: 782},
                {x: 455, y: 782},
                {x: 515, y: 782},
                {x: 575, y: 782},
                {x: 635, y: 782},
                {x: 695, y: 782},
                {x: 755, y: 782},
                {x: 815, y: 782},
                {x: 875, y: 782},
                {x: 935, y: 782},
                {x: 995, y: 782},
                {x: 1055, y: 782},
                {x: 1115, y: 782},
                {x: 1175, y: 782},
                {x: 1235, y: 782},
                {x: 1295, y: 782},
            ]

            this.mapfloor = new Array()
            for (var i = 0; i < this.mapfloorValue.length; i++)
            {
                this.mapfloor[i] = new floor()
                this.mapfloor[i].init('floor2.png', this.box2D)
                this.mapfloor[i].position = 
                {
                    x: this.mapfloorValue[i].x,
                    y: this.mapfloorValue[i].y
                }
                this.mapfloor[i].scale = 2
                this.mapfloor[i].rotation = 0
            }

            //#region hero
            this.hero = new Character()
            this.hero.init('Character2.png', this.box2D)
            this.hero.position =
            {
                x: 180,
                y: 300
            }
            this.hero.pic.scale = 0.2
            //#endregion
            
            //#region map
            
            //#endregion

            //#region  blockQ
            this.blocks_Q_Value =
            [
                {x: 150, y:518},
                {x: 900, y:600},
                {x: 1100, y:500},
                {x: 1300, y:500},
                {x: 1500, y:500},
                {x: 1100, y:200},
                {x: 1200, y:200},
            ]
            //console.log(blocksQValue.length)
            this.block_Qs = new Array()
            for (var i = 0; i < this.blocks_Q_Value.length; i++)
            {
                this.block_Qs[i] = new block_Q()
                this.block_Qs[i].init('blockQ.png', this.box2D)
                this.block_Qs[i].position = 
                {
                    x: this.blocks_Q_Value[i].x,
                    y: this.blocks_Q_Value[i].y
                }
                this.block_Qs[i].scale = 0.2
                this.block_Qs[i].rotation = 0
            }
            
            
            //#endregion
        },
        
        initialize : function () 
        {
            //#region attach pic
            //this.rootScene.attach(this.background)
            //this.map.init();
    
            // for	(var i = 0; i<this.walls.length; i++)
            // {
            //     this.rootScene.attach(this.walls[i].pic)
            // }

            this.rootScene.attach(this.hero.pic)

            for	(var i = 0; i<this.block_Qs.length; i++)
            {
                this.rootScene.attach(this.block_Qs[i].pic)
            }

            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                this.rootScene.attach(this.mapfloor[i].pic)
            }
            //#endregion
        },

        update : function () 
        {
            //this.map.update();
            // for(var i=0; i<this.walls.length; i++)
            // {
            //     this.walls[i].update()
            // }
            for(var i=0; i<this.block_Qs.length; i++)
            {
                this.block_Qs[i].update()
            }
            for(var i=0; i<this.mapfloor.length; i++)
            {
                this.mapfloor[i].update()
            }
            
            this.hero.update()
            this.box2D.draw()
        },
        draw : function (parentCtx) 
        {
           // this.map.draw();
            this.box2D.draw()
            this.rootScene.draw()
        },

        
        keydown(e, list)
        {
            var heroPosition = this.hero.position;
            if (e.key === 'Right')
            {
                console.log("Right")
                this.hero.isWalking = 1
                //console.log(this.hero.component.sprite.rotation)
                //this.hero.goRight()
                //this.hero.update(1)
            }
            if (e.key ==='Left')
            {
                console.log("Left")
                this.hero.isWalking = 2
                //console.log(this.hero.rotation)
                //this.hero.goLeft()
                
                //this.hero.update(2)
            }
            if (e.key === 'Space')
            {
                console.log("Jump")
                this.hero.jump()
            }
        },
        keyup(e, list)
        {
            if(e.key === 'Left' || e.key === 'Right')
            {
                console.log("AAA")
                this.hero.isWalking = 0;
            }
        }
    });
    