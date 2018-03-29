class Character
{
    constructor()
    {
        this.component
        this.arraySize = []
        this.mbox2D
        this.isDead = false
        this.isWalking = 0
        this.isJump = false
    }

    get position()
    {
        return this.component.position;
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
        this.mbox2D = box2D;
        this.pic = new Framework.Sprite(define.imagePath + sprite)
        //this.component = new Framework.circleComponent(this.pic, box2D.bodyType_Dynamic, box2D)
        this.component = new Framework.squareComponent(this.pic, box2D.bodyType_Dynamic, box2D)
        this.component.fixtureDef.m_restitution = 0
        this.component.Body.m_userData = "hero"
    }

    update(isWalking) 
    {
        //0 停
        //1 右
        //2 左
        console.log(this.isWalking)
        if (this.isWalking === 1)
        {
            //this.goRight()
        }
        if (this.isWalking === 2)
        {
            this.goLeft()
        }


        this.component.update()
    }
    draw() 
    {
        this.pic.draw()
    }

    move(angle)
    {
        
    }
    goRight()
    { 
        
        //this.hero.position(this.hero.position()+10)
        
        var power = 100
        
        if(this.position.x >= 600)
        {
            this.position.x = 600
            console.log("600")
        }
        this.component.Body.ApplyForce(
            new this.mbox2D.b2Vec2(
                                Math.cos(0 * (Math.PI / 180)) * power, 
                                Math.sin(0 * (Math.PI / 180)) * power),
                                this.component.Body.GetWorldCenter())
        
    }
    goLeft()
    {
        var power = 100
        this.component.Body.ApplyForce(
            new this.mbox2D.b2Vec2(
                                Math.cos(180 * (Math.PI / 180)) * power, 
                                Math.sin(180 * (Math.PI / 180)) * power),
                                this.component.Body.GetWorldCenter())
    }
    
    jump()
    {
        var power = 15000
        this.component.Body.ApplyForce(
            new this.mbox2D.b2Vec2(
                                Math.cos(90 * (Math.PI / 180)) * power, 
                                Math.sin(90 * (Math.PI / 180)) * power),
                                this.component.Body.GetWorldCenter())
    }
}