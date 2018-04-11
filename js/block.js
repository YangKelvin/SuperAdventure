class block
{
    constructor(_matter)
    {
        this.matter = _matter
        this.pic
        this.component
    }

    load()
    {
        this.pic = new Framework.Sprite('images/coin.png')
        //componentOptions friction:摩擦, density:密度
        let componentOptions = { label: 'blockQ', friction: 0.05, density:0.002, isStatic:true}
        //createComponent
        this.component = new Framework.RectangleComponent(this.matter, this.pic, componentOptions)
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