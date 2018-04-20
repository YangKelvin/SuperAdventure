class MapTile
{
    constructor()
    {
        var PIXEL_CONST = 70;
        this.mapPosition = {x:0, y:0};
        this._titleType = 0

        this.mapFloor = new floor('images/grass.png', this.matter
                                                    , this.floorOps)
        this.mapWall = new floor('images/grass.png', this.matter
                                                   , this.floorOps)
        this.mapCoin = new block('images/coin.png', this.matter
                                                  , this.coinOps)
        this.mapPrincess = new Character('images/princess.png', this.matter
                                                              , this.princessOps
                                                              , this.princessPos)
    }

    update()
    {

    }
    draw()
    {
        if(this._titleType === 1)
        {
            this.mapWall.draw()
        }
        else if(this._titleType === 2)
        {
            this.mapFloor.draw()
        }
        else if(this._titleType === 3)
        {
            this.mapCoin.draw()
        }
        else if(this._titleType === 4)
        {
            this.mapPrincess.draw()
        }
    }
    setPosition(newValue)
    {
        this.mapPosition = newValue
        this.mapFloor.component.position = {x: this.mapPosition.x * PIXEL_CONST, y: this.mapPosition.y * PIXEL_CONST}
        this.mapWall.component.position = {x: this.mapPosition.x * PIXEL_CONST, y: this.mapPosition.y * PIXEL_CONST}
        this.mapCoin.component.position = {x: this.mapPosition.x * PIXEL_CONST, y: this.mapPosition.y * PIXEL_CONST}
        this.mapPrincess.component.position = {x: this.mapPosition.x * PIXEL_CONST, y: this.mapPosition.y * PIXEL_CONST}
    }
}