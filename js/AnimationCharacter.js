class AnimationCharacter
{
    constructor(_url, _option)
    {
        this.url = _url
        this.options = _option
        this.sprite = new Framework.AnimationSprite({url:this.url, col:8 , row:2 , loop:true , speed:1})
        this.sprite.position = this.options.position || {x: 0, y: 0};
        this.sprite.scale = this.options.scale || 1; 
    }
    
    goRight()
    {
        console.log("A-goRight")
        this.sprite.start({ from: this.options.goRight.from, to: this.options.goRight.to, loop: true })

    }
    goLeft()
    {
        this.sprite.start({ from: this.options.goLeft.from, to: this.options.goLeft.to, loop: true });
    }
    
}