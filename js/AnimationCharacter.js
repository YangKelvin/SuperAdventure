class AnimationCharacter
{
    constructor(_url, _option, _matter, _characterPos, _componentOpt)
    {
        //AnimationSprite
        this.url = _url
        this.options = _option
        this.sprite = new Framework.AnimationSprite({url:this.url, col:4 , row:4 , loop:true , speed:1})
        this.sprite.position = this.options.position || {x: 0, y: 0}
        this.sprite.scale = this.options.scale || 1
    
        //matter
        this.component
        this.matter = _matter
        this.characterPos = _characterPos
        this.componentOps = _componentOpt

        this.isWalking = 0
        this.onFloor = false
    }
    
    load()
    {
        this.sprite = new Framework.AnimationSprite({url:this.url, 
                                                        col:4, 
                                                        row:4, 
                                                        loop:true, 
                                                        speed:2}); 
        
        this.component = new Framework.AnimationRectangleComponent(this.matter, 
                                                                    this.sprite, 
                                                                    this.componentOps)
        
        this.sprite.position = this.options.position || {x: 0, y: 0};
        this.sprite.scale = this.options.scale || 1;

        // console.log("sprScale : " + this.sprite.scale)
    }
    initialize() 
    {
        this.component.scale = 0.3
    }
    update() 
    {
        this.component.setBody('angle', 0) // 讓物體永遠不旋轉
        this.component.update()

        if (this.isWalking === 1)
        {
            this.goRight()
        }
        if (this.isWalking === 2)
        {
            this.goLeft()
        }
        if (this.isWalking === 3)
        {
            this.jump()   
        }
    }

    //charcter move
    goRight()
    { 
        this.matter.setBody(this.component.body, 
                            "velocity", 
                            {x: 5, y:this.component.body.velocity.y})
    }
    goLeft()
    {
        this.matter.setBody(this.component.body, 
                            "velocity", 
                            {x: -5, y:this.component.body.velocity.y})
    }
    jump()
    {
        this.matter.setBody(this.component.body, 
                            "velocity", 
                            {x: this.component.body.velocity.x, y:-10})
    }

    //animation
    animationGoRight()
    {
        this.sprite.start({ from: this.options.goRight.from, 
                            to: this.options.goRight.to, 
                            loop: true})

    }
    animationGoLeft()
    {
        this.sprite.start({ from: this.options.goLeft.from, 
                            to: this.options.goLeft.to, 
                            loop: true });
    }
    animationStand()
    {
        this.sprite.start( {from: 1, to: 1, loop:false})
    }

}