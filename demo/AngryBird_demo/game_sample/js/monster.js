var monster = function () {
this.arraySize = [];
    this.component; this.mbox2D; this.isDead = false;
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
    var mMonster = this;
    this.contactCallBack = function (bodyB, force) {
        if (Math.abs(force) > 5) {
            mMonster.dead();
        }
    }
    this.init = function (sprite, box2D) {
        this.mbox2D = box2D;
        this.pic = new Framework.Sprite(define.imagePath + sprite); this.component = new Framework.squareComponent(this.pic,
            box2D.bodyType_Dynamic, box2D); this.component.fixtureDef.m_restitution = 0; this.component.registerContact(this.contactCallBack); this.component.Body.m_userData = "monster";
    };

    this.update = function () {
        this.component.update(); if (this.isDead) {
            this.mbox2D.world.DestroyBody(this.component.Body);
        }
    };
    this.draw = function () {
        this.pic.draw();
    };
    this.dead = function () {
        this.mbox2D.world.DestroyBody(this.component.Body); this.isDead = true;
    }
}