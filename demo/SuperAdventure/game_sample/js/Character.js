class Character
{
    constructor()
    {
        this.component
        this.arraySize = []
        this.mbox2D
        this.isDead = false
    }
    
    
    get position()
    {
        return this.component.position
    }
    set position(newValue)
    {
        this.component.position = newValue
    }

    get scale()
    {
        return this.component.scale
    }
    set scale(newValue)
    {
        this.component.scale = newValue
    }

    get rotation()
    {
        return this.component.rotation
    }
    set rotation(newValue)
    {
        this.component.rotation = newValue
    }

    get isSensor()
    {
        return this.component.isSensor
    }
    set isSensor(newValue)
    {
        this.component.isSensor = newValue
    }

    // load()
    // {
    //     this.pic = new Framework.Sprite(define.imagePath + 'Character1.png')
    //     this.pic.position = 
    //     {
    //         x: 100,
    //         y: 300
    //     }
    //     this.pic.rotation = 0
    // }

    init(sprite, box2D) 
    {
        this.mbox2D = box2D;
        this.pic = new Framework.Sprite(define.imagePath + sprite)
        this.component = new Framework.circleComponent(this.pic,
            box2D.bodyType_Dynamic, box2D)
            this.component.fixtureDef.m_restitution = 0
            this.component.Body.m_userData = "hero"
    }

    update() 
    {
        this.component.update()
    }
    draw() 
    {
        this.pic.draw()
    }
    // keydown(e, list)
    // { 
    //     if (e.key === 'Right')
    //     {
    //         console.log(this.hero.position())
    //         //this.hero.position(this.hero.position()+10)
    //     }
    //     if (e.key === 'Left')
    //     {
    //         this.hero.position(this.hero.position()-10)
    //     }
    // }
    
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