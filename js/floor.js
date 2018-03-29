class floor 
{ 
    constructor()
    {
        this.arraySize = [];
        this.component;
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
    

    init(sprite, box2D) 
    {
        this.pic = new Framework.Sprite(define.imagePath + sprite); 
        this.component = new Framework.squareComponent(this.pic,box2D.bodyType_Static, box2D);
        this.component.fixtureDef.m_restitution = 0;
        this.component.Body.m_userData = "floor"; 
    };
    update() 
    { 
        this.component.update();
    };

    draw() 
    { 
        this.pic.draw();
    };
}
// var floor = function () 
// { 
//     this.arraySize = [];
//     this.component;
//     Object.defineProperty(this, 'position', 
//     { 
//         get : function () 
//         {
//             this.component.position; 
//         },
//         set : function (newValue) 
//         { 
//             this.component.position = newValue;
//         }, 
//     });

//     Object.defineProperty(this, 'scale', 
//     { 
//         get : function () 
//         {
//             this.component.scale; 
//         },
//         set : function (newValue) 
//         { 
//             this.component.scale = newValue;
//         }, 
//     });

//     Object.defineProperty(this, 'rotation', 
//     { 
//         get : function () 
//         {
//             this.component.rotation; 
//         },
//         set : function (newValue) 
//         { 
//             this.component.rotation = newValue;
//         },
//     });

//     Object.defineProperty(this, 'isSensor', 
//     { 
//         get : function () 
//         {
//             this.component.isSensor;
//         },
//         set : function (newValue) 
//         { 
//             this.component.isSensor = newValue;
//         }, 
//     });

//     this.init = function (sprite, box2D) 
//     {
//         this.pic = new Framework.Sprite(define.imagePath + sprite); 
//         this.component = new Framework.squareComponent(this.pic,box2D.bodyType_Static, box2D);
//         this.component.fixtureDef.m_restitution = 0;
//         this.component.Body.m_userData = "floor"; 
//     };
//     this.update = function () 
//     { 
//         this.component.update();
//     };

//     this.draw = function () 
//     { 
//         this.pic.draw();
//     };
// }