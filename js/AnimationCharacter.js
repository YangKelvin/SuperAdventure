class AnimationCharacter
{
    constructor(_url, _option)
    {
        this.url = _url
        this.options = _option
        this.sprite = new Framework.AnimationSprite({url:this.url, col:8 , row:2 , loop:true , speed:2})
        this.sprite.position = this.options.position || {x: 0, y: 0};
        this.sprite.scale = this.options.scale || 1; 
    }
    
    goRight()
    {
        this.sprite.start({ from: options.run.from, to: options.run.to, loop: true })

    }
    goLeft()
    {
        this.sprite.start({ from: options.run.from, to: options.run.to, loop: true });
    }
    
}