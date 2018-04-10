class Character
{
    constructor(_matter)
    {
        this.component
        this.matter = _matter
        this.pic
        this.isWalking = 0
        this.playerOnFloor = false
    }
    
    load()
    {
        //character.pic
        this.pic = new Framework.Sprite('images/Character1.png')
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
        this.component.setBody('angularVelocity', 0)
        this.component.setBody('angle', 0)
        
        this.component.update()

    }
    draw()
    {
        this.pic.draw()
    }

    goRight()
    { 
        let force = (0.0004 * player.mass) ;
        this.component.body.applyForce(player,player.position,{x:force,y:0});
    }
    goLeft()
    {
        let force = (-0.0004 * player.mass) ;
        this.component.body.applyForce(player,player.position,{x:force,y:0});
    }
    
    jump()
    {
        let force = (-0.013 * player.mass) ;
        this.component.body.applyForce(player,player.position,{x:0,y:force});
    }
}