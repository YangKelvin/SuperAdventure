class floor
{
    constructor(_url, _matter, _floorOps)
    {
        this.component
        this.url = _url
        this.matter = _matter
        this.floorOps = _floorOps
    }
    
    
    load()
    {
        //character.pic
        this.pic = new Framework.Sprite(this.url)
        //createComponent
        this.component = new Framework.RectangleComponent(this.matter, this.pic, this.floorOps)
        this.component.scale = 2
    }
    initialize() 
    {
    }
    update() 
    {
        this.component.update()
    }
    draw()
    {
        this.pic.draw()
    }
}