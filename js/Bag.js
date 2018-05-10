class Bag extends Framework.GameMainMenu
{
    constructor()
    {
        this.BackGround = new Framework.Sprite(define.imagePath + 'bagBackground.PNG');
    }

    load()
    {

    }

    initialize()
    {

    }

    update()
    {

    }

    draw(parentCtx)
    {
        this.BackGround.sprite.draw(parentCtx)
    }
}