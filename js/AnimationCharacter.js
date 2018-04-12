class AnimationCharacter
{
    constructor(_url, _option, _matter, _characterPos, _componentOps)
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
        this.componentOps = _componentOps

        this.isWalking = 0
        this.onFloor = false
    }
    
    load()
    {
        this.component = new Framework
    }

    Animation_GoRight()
    {
        console.log("A-goRight")
        this.sprite.start({ from: this.options.goRight.from, to: this.options.goRight.to, loop: true })

    }
    Animation_GoLeft()
    {
        this.sprite.start({ from: this.options.goLeft.from, to: this.options.goLeft.to, loop: true });
    }
    
}