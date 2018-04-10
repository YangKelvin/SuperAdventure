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

//         let componentOptions = { label: 'floor', friction: 0.05, density:0.002, isStatic:true}
//         this.component = new Framework.RectangleComponent(this.matter, this.pic, componentOptions);
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
class floor
{
    constructor(_matter)
    {
        this.component
        this.pic
        this.matter = _matter
    }
    
    
    load()
    {
        //character.pic
        this.pic = new Framework.Sprite('images/floor2.png')
        //componentOptions friction:摩擦, density:密度
        let componentOptions = { label: 'floor', friction: 0.05, density:0.002, isStatic:true}
        //createComponent
        this.component = new Framework.RectangleComponent(this.matter, this.pic, componentOptions)
        this.component.scale = 2
    }
    initialize() 
    {
        // super.initialize()
    }
    update() 
    {
        // super.update()
        this.component.update()
    }
    draw()
    {
        this.pic.draw()
    }
}