class Character
{
    constructor(_url, _matter, _characterOps)
    {
        this.component
        this.matter = _matter
        this.url = _url
        this.characterOps = _characterOps
        this.playerOnFloor = false
        this.isWalking = 0
    }
    
    load()
    {
        this.pic = new Framework.Sprite(this.url)
        this.component = new Framework.RectangleComponent(
            this.matter, 
            this.pic, 
            this.characterOps)   
    }
    initialize() 
    {
        // this.component.scale = 0.5
    }
    update() 
    {
        // lock rotation
        // this.component.setBody('angularVelocity', 0)
        // this.component.setBody('angle', 0)
        
        this.component.update()
    }
    draw()
    {
        if (this.pic != null)
        {
            this.pic.draw()
        }
    }

    goRight()
    { 
        // let force = (0.0004 * this.component.body.mass) ;
        // console.log("hero goRight")
        this.matter.setBody(this.component.body, "velocity", {x: 5, y:this.component.body.velocity.y})
    }
    goLeft()
    {
        // console.log("hero goLeft")
        this.matter.setBody(this.component.body, "velocity", {x: -5, y:this.component.body.velocity.y})
    }
    
    jump()
    {
        // console.log("herojump")
        // let force = (-0.0004 * this.component.body.mass)
        this.matter.setBody(this.component.body, "velocity", {x: this.component.body.velocity.x, y:-10})
    }
}