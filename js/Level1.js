var Level1 = Framework.Class(Framework.Level, 
    {
        load : function () 
        {
            //#region box2D
            this.box2D = new Framework.Box2D()
            this.world = this.box2D.createWorld()
            this.box2D.setContactListener()
            //#endregion

            //#region ground
            //ground的最左邊位置 會被width 和 position.x影響
            var ground = this.box2D.createSquareBody(100, 1.0, this.box2D.bodyType_Static);
            ground.SetPosition(new this.box2D.b2Vec2(10,26))
            
            //var ground2 = this.box2D.createSquareBody(5, 1.0, this.box2D.bodyType_Static)
            //b2Vec2(x, y)
            //x愈小 愈左邊
            //y愈小 愈上面

            //ground2.SetPosition(new this.box2D.b2Vec2(40,20))

            //#endregion

            //攝影機 w:遊戲畫面的寬 h:遊戲畫面的高
            var w = document.body.clientWidth;
            var h = document.body.clientHeight;
            var camera = new Camera()
            camera.mWidth(w)
            camera.mHeight(h)
            this.camera = camera

            //#region CharacterInfo
            this.CharacterInfo_x = new Score()
            this.CharacterInfo_x.position = {x:1000, y:0}
            this.CharacterInfo_x._text= "Character_x"

            this.CharacterInfo_y = new Score()
            this.CharacterInfo_y.position = {x:1000, y:80}
            this.CharacterInfo_y._text = "Character_y"

            this.CharacterInfo_isWalking = new Score()
            this.CharacterInfo_isWalking.position = {x:1000, y:160}
            this.CharacterInfo_isWalking._text = "isWalking"
            //#endregion

            //#region map
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
                {x: 1500, y: 500},
                {x: 1800, y: 400},
                {x: 1950, y: 600},
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
            //#endregion

            //#region Character
            this.hero = new Character()
            this.hero.init('Character2.png', this.box2D)
            this.hero.position =
            {
                x: 180,
                y: 300
            }
            this.hero.pic.scale = 0.2
            //#endregion
        },
        
        initialize : function () 
        {
            this.camera.setLocation(this.w, this.h);//應該設畫面中央，目前設在角色位置
            for	(var i = 0; i<this.mapfloor.length; i++)
            {
                this.rootScene.attach(this.mapfloor[i].pic)
            }

            this.rootScene.attach(this.hero.pic)
        },

        update : function () 
        {
            this.box2D.draw()
            this.hero.update()

            if (this.hero.position.x > 750)
            {
                for	(var i = 0; i<this.mapfloor.length; i++)
                {
                    this.mapfloor[i].position = 
                    {
                        x: this.mapfloorValue[i].x - (this.hero.position.x - 750),
                        y: this.mapfloorValue[i].y
                    }
                }
            }

            this.camera.setLocation(this.hero.position.x, this.hero.position.y)

            this.CharacterInfo_x._score=this.hero.position.x
            this.CharacterInfo_y._score=this.hero.position.y
            this.CharacterInfo_isWalking._score = this.hero.isWalking
            if (this.hero.position.x >= 600 && this.hero.isWalking===1)
            {
                this.hero.position.x=600
                for	(var i = 0; i<this.mapfloor.length; i++)
                {

                    this.mapfloor[i].position.x -= 10;
                }
            }
            // if (this.hero.position.x <= 350)
            // {
            //     this.hero.position.x=350
            //     for	(var i = 0; i<this.mapfloor.length; i++)
            //     {
            //         this.mapfloor[i].position.x += 10;
            //     }
            // }
        },
        draw : function (parentCtx) 
        {
            this.box2D.draw()
            this.rootScene.draw()

            this.CharacterInfo_x.draw(parentCtx)
            this.CharacterInfo_y.draw(parentCtx)
            this.CharacterInfo_isWalking.draw(parentCtx)
        },

        keydown(e, list)
        {
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
            if (e.key === 'Q')
            {
                // Framework.Game.stop()
            }
        },
        keyup(e, list)
        {
            if(e.key === 'Left' || e.key === 'Right')
            {
                console.log("keyup")
                this.hero.isWalking = 0;
            }
        },
        
    });
    