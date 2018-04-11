class Character
{
    constructor(_matter)
    {
        this.component
        this.matter = _matter
        this.pic
        this.isWalking = false
        this.playerOnFloor = false

        this.isWalking = 0
    }
    
    load()
    {
        //character.pic
        this.pic = new Framework.Sprite('images/character2.png')
        //characterOption friction:摩擦, density:密度
        let componentOptions = { label: 'hero', friction: 0.05, density:0.002, }
        //createComponent
        this.component = new Framework.RectangleComponent(this.matter, this.pic, componentOptions)
        
    }
    initialize() 
    {
        // super.initialize()
		// this.component.lockRotation = true
        this.component.scale = 0.2
        // this.component.body.setAngularVelocity(staticAngleBody, 0);
		// this.map.level.rootScene.attach(this.pic)
    }
    update() 
    {
        // super.update()
        // lock rotation
        // this.component.setBody('angularVelocity', 0)
        this.component.setBody('angle', 0)
        
        this.component.update()

        
        if (this.isWalking === 1)
        {
            this.goRight()
        }
        if (this.isWalking === 2)
        {
            console.log("left")
            this.goLeft()
        }
        if (this.isWalking === 3)
        {
            this.jump()   
        }
    }
    draw()
    {
        this.pic.draw()
    }

    goRight()
    { 
        // let force = (0.0004 * this.component.body.mass) ;
        console.log("hero goRight")
        this.matter.setBody(this.component.body, "velocity", {x: 5, y:this.component.body.velocity.y})
    }
    goLeft()
    {
        console.log("hero goLeft")
        this.matter.setBody(this.component.body, "velocity", {x: -5, y:this.component.body.velocity.y})
    }
    
    jump()
    {
        console.log("herojump")
        // let force = (-0.0004 * this.component.body.mass)
        this.matter.setBody(this.component.body, "velocity", {x: this.component.body.velocity.x, y:-10})
    }
}