var MyBox2D = Framework.Class(Framework.Level, 
    {
        load : function () 
        {
            //box2D
            this.box2D = new Framework.Box2D()
            this.box2D.createWorld()
            this.box2D.setContactListener();
            
            //background
            this.background = new Framework.Sprite(define.imagePath+'background1.png')
            this.background.position = 
            {
                x: 800,
                y: 300
            }
            
            //ground
            var ground = this.box2D.createSquareBody(1000, 1.0, this.box2D.bodyType_Static)
            ground.SetPosition(new this.box2D.b2Vec2(0,26))
            
    
            //wall position
            this.wallsValue =
            [
                {x: 900, y:500},
                {x: 1100, y:500},
                {x: 1300, y:500},
                {x: 1500, y:500},
                {x: 1150, y:200},
                {x: 1250, y:200},
            ]
            this.walls = new Array();
            for(var i=0; i<this.wallsValue.length; i++)
            {
                this.walls[i] = new wall()
                this.walls[i].init('wall.png', this.box2D)
                this.walls[i].position = 
                {
                    x: this.wallsValue[i].x,
                    y: this.wallsValue[i].y 
                }
                this.walls[i].scale = 1.0
                this.walls[i].rotation = 0
            }
            ///////////////

            this.hero = new Character()
            this.hero.init('Character1.png', this.box2D)
            this.hero.position =
            {
                x: 180,
                y: 300
            }
            this.hero.pic.scale = 0.2
        },
        
        initialize : function () 
        {
            this.rootScene.attach(this.background)
    
            for	(var i = 0; i<this.walls.length; i++)
            {
                this.rootScene.attach(this.walls[i].pic)
            }

            this.rootScene.attach(this.hero.pic)
        },

        update : function () 
        {
            for(var i=0; i<this.walls.length; i++)
            {
                this.walls[i].update()
            }
            this.hero.update()
            this.box2D.draw()
        },
        draw : function (parentCtx) 
        {
            this.box2D.draw()
            this.rootScene.draw()
        },
        keydown(e, list)
        {
            if (e.key === 'Right')
            {
                this.hero.position=
                {
                    x:this.hero.position.x + 10,
                    y:this.hero.position.y
                }
                //console.log(this.hero.position.x)
                //this.hero.update()
                //this.hero.position(this.hero.position()+10)
            }
            if (e.key === 'Left')
            {
                this.hero.position=
                {
                    x:this.hero.position.x - 10,
                    y:this.hero.position.y - 20
                }
            }
        }
    });
    