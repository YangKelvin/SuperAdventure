var Framework;
Framework = (function (Framework) {
	'use strict'
	Framework.Box2D = function () 
	{
		var b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2Fixture = Box2D.Dynamics.b2Fixture,
		b2World = Box2D.Dynamics.b2World,
		b2MassData = Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
		b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
		b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
		
		var debugFlag = true;
		
		var componentDictionary = [];	
		this.bodyType_Dynamic = Box2D.Dynamics.b2Body.b2_dynamicBody;
		this.bodyType_Static = Box2D.Dynamics.b2Body.b2_staticBody;
		this.b2Vec2 = b2Vec2;

		var options = 
		{
			density : 1,
			friction : 0.5
		};
		this.world = null;

		this.addDictionary = function(componentBody, componentCallBack){
			var component = {
				body: componentBody,
				callBack: componentCallBack
			};
			componentDictionary.push(component);
		};
		
		this.createWorld = function (options) {
			if (this.world instanceof b2World) 
			{
				return;
			}

			options = options || {};
			options.gravityY = options.gravityY || 10;
			options.gravityX = options.gravityX || 0;

			if (typeof options.allowSleep === 'undefined') {
				options.allowSleep = true;
			}

			this.world = new b2World(new b2Vec2(options.gravityX, options.gravityY), options.allowSleep);
			this.world.e_locked = 0;
			return this.world;
		};

		this.setContactListener = function () {
			var listener = new Box2D.Dynamics.b2ContactListener;
			this.world.SetContactListener(listener);
			listener.BeginContact = function (contact) {
				for(var i=0; i<componentDictionary.length; i++){
					if(componentDictionary[i].body === contact.GetFixtureA().GetBody()){
						var body = contact.GetFixtureB().GetBody();
						componentDictionary[i].callBack(body, body.m_angularVelocity);
					}
				}
			}
		};

		this.createSquareBody = function (width, height, bodyType, options) {
			this.createWorld();
			var fixDef = new b2FixtureDef;
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			// fixDef.restitution = 0.2;

			var bodyDef = new b2BodyDef;

			bodyDef.type = bodyType;
			bodyDef.position.x = 0;
			bodyDef.position.y = 0;
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox(width, height);
			var squareBody = this.world.CreateBody(bodyDef);
			var squareFixture = squareBody.CreateFixture(fixDef);

			return squareBody;
		};

		this.createCircleBody = function (radius, bodyType, options) {
			this.createWorld();
			var fixDef = new b2FixtureDef;
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.2;

			var bodyDef = new b2BodyDef;

			bodyDef.type = bodyType;
			bodyDef.position.x = 0;
			bodyDef.position.y = 0;
			fixDef.shape = new b2CircleShape(radius);
			var circleBody = this.world.CreateBody(bodyDef);
			var circleFixture = circleBody.CreateFixture(fixDef);

			return circleBody;
		};

		this.weldJoint = function (body1, body2) {
			var jointDef = new b2WeldJointDef();
			jointDef.Initialize(body1, body2, body1.GetWorldCenter());
			var jointBody = this.world.CreateJoint(jointDef);

			return jointBody;
		};
		
		this.revoluteJoint = function (body1, body2) {
			var jointDef = new b2WeldJointDef();
			jointDef.Initialize(body1, body2, body1.GetWorldCenter());
			var jointBody = this.world.CreateJoint(jointDef);

			return jointBody;
		};

		this.initDebugDraw = function () {
			var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("__game_canvas__").getContext("2d"));
			debugDraw.SetDrawScale(30.0);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			this.world.SetDebugDraw(debugDraw);
		};

		this.draw = function () {
			this.world.Step(
				1 / 60 //frame-rate
			, 10 //velocity iterations
			, 10 //position iterations
			);
			// this.world.DrawDebugData();
			this.world.ClearForces();
		};
		//new 
		// this.createBox = function(world, x, y, width, height, custom) 
		// {
		// 	var boxSd = new b2BodyDef; // 创建一个形状Shape，然后设置有关Shape的属性
		// 	boxSd.extents = {width: 1200, height: 5}; // 设置矩形高、宽
		// 	boxSd.density = 1.0; // 设置矩形的密度 
		// 	if (custom === 'fixed') boxSd.density = 0.0; // 若传入'fixed'，则需固定，此时设置密度为0
		// 	else boxSd.userData = custom; // 若传入其他，则视为图片数据
		// 	boxSd.restitution = .3; // 设置矩形的弹性
		// 	boxSd.friction = 1; // 设置矩形的摩擦因子，可以设置为0-1之间任意一个数，0表示光滑，1表示强摩擦
		// 	var boxBd = new b2BodyDef(); // 创建刚体定义
		// 	boxBd.AddShape(boxSd); // 添加形状
		// 	boxBd.position = {x: 10, y: 10}; // 设置位置
		// 	return world.CreateBody(boxBd) // 创建并返回刚体
		// }


		///////
		// this.createCharacter = function (_density, _friction, _restitution, _x, _y, _width, _height, bodyType, sprite, options) 
		// {
		// 	this.createWorld();
		// 	var fixDef = new b2FixtureDef;
		// 	fixDef.density = _density;
		// 	fixDef.friction = _friction;
		// 	fixDef.restitution = _restitution;

		// 	var bodyDef = new b2BodyDef;

		// 	bodyDef.type = bodyType;
		// 	bodyDef.position.x = _x;
		// 	bodyDef.position.y = _y;
		// 	fixDef.shape = new b2PolygonShape;
		// 	fixDef.shape.SetAsBox(_width, _height);
		// 	var squareBody = this.world.CreateBody(bodyDef);
		// 	var squareFixture = squareBody.CreateFixture(fixDef);

		// 	return squareBody;
		// };
		///////
	};
	return Framework;
})(Framework || {});
