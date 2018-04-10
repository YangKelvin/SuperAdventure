Framework.RectangleComponent = class RectangleComponent extends Framework.Component 
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
        super.update()
		if(!this.hasFirstUpdate && this.sprite.texture) {
			this.hasFirstUpdate = true
			let realWidth = this.sprite.texture.width * this.sprite.scale
            let realHeight = this.sprite.texture.height * this.sprite.scale
            this.matter.scaleBody(this.body, realWidth, realHeight)
		} else if(this.hasFirstUpdate) {
			this.sprite.position = this.body.position
			this.sprite.rotation = this.body.angle / Math.PI * 180
		}
    }
}