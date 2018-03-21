class Character
{
    constructor()
    {
        this.component;
        this.mbox2D;
        this.isDead = false;
    }
    
    
    get position()
    {
        return this.component.position
    }
    set position(newValue)
    {
        this.component.position = newValue
    }

    init(sprite, box2D) 
    {
        this.mbox2D = box2D;
        this.pic = new Framework.Sprite(define.imagePath + sprite) 
        this.component = new Framework.squareComponent(this.pic,
            box2D.bodyType_Dynamic, box2D); this.component.fixtureDef.m_restitution = 0
            this.component.registerContact(this.contactCallBack)
            this.component.Body.m_userData = "monster"
    }

    update() 
    {
        this.component.update(); if (this.isDead) {
            this.mbox2D.world.DestroyBody(this.component.Body)
        }
    }
    draw() 
    {
        this.pic.draw()
    }
    dead()
    {
        this.mbox2D.world.DestroyBody(this.component.Body); this.isDead = true
    }
    
}

// var Character = function()
// {
//     this.component;
//     this.mbox2D;
//     this.isDead = false;
    
//     Object.defineProperty(this, 'position', {
//         get: function()
//         {
//             this.component.position;
//         },
//         set: function(newValue)
//         {
//             this.component.position = newValue
//         },
//     })

//     this.init = function (sprite, box2D) {
//         this.mbox2D = box2D;
//         this.pic = new Framework.Sprite(define.imagePath + sprite); this.component = new Framework.squareComponent(this.pic,
//             box2D.bodyType_Dynamic, box2D); this.component.fixtureDef.m_restitution = 0; this.component.registerContact(this.contactCallBack); this.component.Body.m_userData = "monster";
//     };

//     this.update = function () {
//         this.component.update(); if (this.isDead) {
//             this.mbox2D.world.DestroyBody(this.component.Body);
//         }
//     };
//     this.draw = function () {
//         this.pic.draw();
//     };
//     this.dead = function () {
//         this.mbox2D.world.DestroyBody(this.component.Body); this.isDead = true;
//     }
// }