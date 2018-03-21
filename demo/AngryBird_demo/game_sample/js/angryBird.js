var angryBird = function () {
    this.arraySize = [];
    this.component; 
    this.mbox2D;
    Object.defineProperty(this, 'position', {
        get: function () {
            this.component.position;
        },
        set: function (newValue) {
            this.component.position = newValue;
        },
    });
    Object.defineProperty(this, 'scale', {
        get: function () {
            this.component.scale;
        },
        set: function (newValue) {
            this.component.scale = newValue;
        },
    });
    Object.defineProperty(this, 'rotation', {
        get: function () {
            this.component.rotation;
        },
        set: function (newValue) {
            this.component.rotation = newValue;
        },
    });
    Object.defineProperty(this, 'isSensor', {
        get: function () {
            this.component.isSensor;
        },
        set: function (newValue) {
            this.component.isSensor = newValue;
        },
    });
    this.init = function (sprite, box2D) {
        this.mbox2D = box2D;
        this.pic = new Framework.Sprite(define.imagePath + sprite); this.component = new Framework.circleComponent(this.pic,
            box2D.bodyType_Dynamic, box2D); this.component.fixtureDef.m_restitution = 0; this.component.Body.m_userData = "angryBird";
    };
    this.update = function () {
        this.component.update();
    };
    this.draw = function () {
        this.pic.draw();
    };
    this.shoot = function (angle) {
        var degrees = angle - 90;
        var power = 4000; this.component.Body.ApplyForce(new
            this.mbox2D.b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI /
                180)) * power),
            this.component.Body.GetWorldCenter());
    };
}