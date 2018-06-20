Framework.AnimationRectangleComponent = class AnimationRectangleComponent extends Framework.Component 
{
    constructor(_matter, sprite, options) {
        super(_matter, sprite, options)
        // autoBind(this)
        this.bodyOptions = options
        this.matter = _matter
		this.body = this.matter.createRectangleBody(0, 0, 1, 1, this.bodyOptions)
    }

    update() 
    {
        if(!this.hasFirstUpdate && this.sprite.texture) 
        {
			this.hasFirstUpdate = true
            
            this.matter.removeBody(this.body)
            let realWidth = this.sprite.texture.width
            let realHeight = this.sprite.texture.height

            this.body = this.matter.createRectangleBody(
                this.sprite.position.x + this.sprite.texture.width / 2, 
                this.sprite.position.y + this.sprite.texture.height / 2, 
                realWidth, 
                realHeight, 
                this.bodyOptions)
        } 
        else if(this.hasFirstUpdate) 
        {
            this.sprite.position = 
            {
                x: this.body.position.x,
                y: this.body.position.y
            }

            this.sprite.rotation = this.body.angle / Math.PI * 180
		}
    }
}