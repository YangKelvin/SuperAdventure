var MyBox2D = Framework.Class(Framework.Level, 
{
	load : function () 
	{
		this.box2D = new Framework.Box2D()
		this.box2D.createWorld()
		this.box2D.setContactListener();

		this.background = new Framework.Sprite(define.imagePath+'background.jpg')
		this.background.position = 
		{
			x: 800,
			y: 300
		}

		var ground = this.box2D.createSquareBody(1000, 1.0, this.box2D.bodyType_Static)
		ground.SetPosition(new this.box2D.b2Vec2(0,26))
		
		//angryBird
		this.angryBird = new angryBird()
		this.angryBird.init('hero.png',this.box2D)
		this.angryBird.position = 
		{
			x: 180,
			y: 100
		}
		//monster
		this.monstersValue =
		[
			{x: 1000, y: 550},
			{x: 700, y: 550}
		]
		this.monsters = new Array()
		for(var i=0; i<this.monstersValue.length; i++)
		{
			this.monsters[i] = new monster()
			this.monsters[i].init('monster.png', this.box2D)
			this.monsters[i].position = 
			{
				x: this.monstersValue[i].x,
				y: this.monstersValue[i].y
			}
		}
		

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
		//roof position
		this.roofsValue =
		[
			{x: 1000, y:300},
			{x: 1400, y:300},
			{x: 1200, y:150},
		]
		/////////////////
		this.walls = new Array();
		for(var i=0; i<this.wallsValue.length; i++)
		{
			this.walls[i] = new wall(); 
			this.walls[i].init('wall.png', this.box2D)
			this.walls[i].position = 
			{
				x: this.wallsValue[i].x,
				y: this.wallsValue[i].y 
			}
			this.walls[i].scale = 1.0
			this.walls[i].rotation = 0
		}
		
		this.floor = new wall(); 
		this.floor.init('floor.png', this.box2D); 
		this.floor.position = 
		{
			x: 1200,
			y: 270 
		};

		this.roofs = new Array();
		for(var i=0; i<this.roofsValue.length; i++)
		{
			this.roofs[i] = new roof();
			this.roofs[i].arraySize = 
			[
				new this.box2D.b2Vec2(-5, 1), 
				new this.box2D.b2Vec2(0, -1), 
				new this.box2D.b2Vec2(5, 1),
			];
			this.roofs[i].init('roof.png', this.box2D); this.roofs[i].position = 
			{
				x: this.roofsValue[i].x,
				y: this.roofsValue[i].y 
			}
		};
		///////////////
		//joint
		//將物件兩兩相連, 範例為將原本房子的上半部三個物件相連
		this.box2D.weldJoint(this.walls[5].component.body, this.roofs[2].component.body)
		this.box2D.weldJoint(this.walls[4].component.body, this.roofs[2].component.body)
		
		sensor
		this.sensor = new sensor()
		this.sensor.init('sensor.png', this.box2D)
		this.sensor.position = 
		{
			x: 500,
			y: 300
		}
		this.sensor.isSensor = true
	},
	
	initialize : function () 
	{
		this.rootScene.attach(this.background)

		for	(var i = 0; i<this.walls.length; i++)
		{
			this.rootScene.attach(this.walls[i].pic)
		}
		this.rootScene.attach(this.floor.pic)
		for	(var i = 0; i<this.roofs.length; i++)
		{
			this.rootScene.attach(this.roofs[i].pic)
		}

		this.rootScene.attach(this.angryBird.pic)
		
		for(var i=0; i<this.monsters.length; i++)
		{
			this.rootScene.attach(this.monsters[i].pic)
		}
		this.rootScene.attach(this.sensor.pic)
	},
	update : function () 
	{
		//angryBird
		this.angryBird.update()

		for(var i=0; i<this.walls.length; i++)
		{
			this.walls[i].update()
		}
		this.floor.update()
		
		for (var i=0; i<this.roofs.length; i++)
		{
			this.roofs[i].update()
		}

		for (var i=0; i<this.monsters.length; i++)
		{
			this.monsters[i].update()
		}

		this.sensor.update()
		this.box2D.draw()

	},
	draw : function (parentCtx) 
	{
		this.box2D.draw()
		this.rootScene.draw()
	},
	click:function(e)
	{
		angle = Math.atan2(
			e.y-this.angryBird.component.position.y, 
			e.x-this.angryBird.component.position.x)
			angle = angle * 180 / Math.PI+90;
			this.angryBird.shoot(angle);
	}
});
