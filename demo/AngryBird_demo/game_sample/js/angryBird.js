class angryBird
{
    constructor()
    {
        this.arraySize = [];
        this.component; 
        this.mbox2D;
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
        this.mbox2D = box2D;
        this.pic = new Framework.Sprite(define.imagePath + sprite)
        this.component = new Framework.circleComponent(this.pic,
            box2D.bodyType_Dynamic, box2D)
            this.component.fixtureDef.m_restitution = 0
            this.component.Body.m_userData = "angryBird"
    }
    update() 
    {
        this.component.update();
    };
    draw() 
    {
        this.pic.draw();
    };
    shoot(angle) 
    {
        var degrees = angle - 90;
        var power = 4000
        this.component.Body.ApplyForce(new
            this.mbox2D.b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI /
                180)) * power),
            this.component.Body.GetWorldCenter());
    };
}