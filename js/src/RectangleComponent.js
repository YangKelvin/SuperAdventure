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
        if(!this.hasFirstUpdate && this.sprite.texture) 
        {
            // console.log("X")
            // if (this.sprite.texture)
            // {
            //     console.log(this.sprite.texture.width + " " + this.sprite.texture.height)
            // }
            
            // console.log(this.body)
            
			this.hasFirstUpdate = true
			let realWidth = this.sprite.texture.width * this.sprite.scale
            let realHeight = this.sprite.texture.height * this.sprite.scale
            // console.log(realWidth + " " + realHeight)
            // this.matter.scaleBody(this.body, realWidth, realHeight)
            this.matter.removeBody(this.body)
            // console.log("W : " + realWidth)
            // console.log("H : " + realHeight)

            // let tempWidth = 41
            // let tempHeight = 54

            // this.body = this.matter.createRectangleBody(this.sprite.position.x, this.sprite.position.y, tempWidth, tempHeight, this.bodyOptions)

            this.body = this.matter.createRectangleBody(this.sprite.position.x, this.sprite.position.y, realWidth, realHeight, this.bodyOptions)
        } 
        else if(this.hasFirstUpdate) 
        {
			this.sprite.position = this.body.position
			this.sprite.rotation = this.body.angle / Math.PI * 180
		}
    }
}