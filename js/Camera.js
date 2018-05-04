class Camera
{
    constructor(_url, _matter, _characterOps, _characterPos)
    {
        this.component
        this.matter = _matter
        this.url = _url
        this.characterPos = _characterPos
        this.characterOps = _characterOps
        this.playerOnFloor = false
        this.isWalking = 0
    }
    
    load()
    {
        this.pic = new Framework.Sprite(this.url)

        //createComponent
        this.component = new Framework.RectangleComponent(this.matter, 
                                                            this.pic, 
                                                            this.characterOps)   
    }
    initialize() 
    {
        this.component.scale = 3
        this.component.position = this.characterPos
    }
    update() 
    {
        // super.update()
        // lock rotation
        // this.component.setBody('angularVelocity', 0)
        this.component.setBody('angle', 0)
        this.component.position = {x: this.component.position.x, y:-200}
        this.component.update()
    }
    draw()
    {
        this.pic.draw()
    }

    goRight()
    { 
        // let force = (0.0004 * this.component.body.mass) ;
        // console.log("hero goRight")
        // this.matter.setBody(this.component.body, "velocity", {x: 5, y:this.component.body.velocity.y})
        // this.matter.setBody(this.component.body, 
        //     "velocity", 
        //     {x: 5, y:this.component.body.velocity.y})
        this.component.position = 
        {
            x: this.component.position.x + 5,
            y: -200
        }
    }
    goLeft()
    {
        // console.log("hero goLeft")
        // this.matter.setBody(this.component.body, "velocity", {x: -5, y:this.component.body.velocity.y})
        // this.matter.setBody(this.component.body, 
        //     "velocity", 
        //     {x: -5, y:this.component.body.velocity.y})
        this.component.position = 
        {
            x: this.component.position.x - 5,
            y: -200
        }
    }
    
    jump()
    {
        // console.log("herojump")
        // let force = (-0.0004 * this.component.body.mass)
        this.matter.setBody(this.component.body, "velocity", {x: this.component.body.velocity.x, y:-10})
    }
}