var sensor = function () {
this.arraySize = [];
    this.component;
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
    var mSensor = this;
    this.contactCallBack = function (bodyB, force) {
        if (bodyB.m_userData === "angryBird") {
            bodyB.m_linearVelocity.x += 10;
        }
    }
    this.init = function (sprite, box2D) {
        this.pic = new Framework.Sprite(define.imagePath + sprite); this.component = new Framework.squareComponent(this.pic,
            box2D.bodyType_Static, box2D); this.component.registerContact(this.contactCallBack); this.component.fixtureDef.m_restitution = 0;
    };
    this.update = function () {
        this.component.update();
    };
    this.draw = function () {
        this.pic.draw();
    };
}