class block
{
    constructor(_url, _matter, _blockOps)
    {
        this.matter = _matter
        this.url = _url
        this.blockOps = _blockOps

        this.component
    }

    load()
    {
        this.pic = new Framework.Sprite(this.url)
        this.component = new Framework.RectangleComponent(this.matter, this.pic, this.blockOps)
    }
    initialize() 
    {
        this.component.scale = 0.2
    }
    update()
    {
        this.component.update()
    }
    draw()
    {
        if (this.pic != null)
        {
            this.pic.draw()
        }
    }
}