class MapTile
{
    constructor(_matter, _tileType)
    {
        this.matter = _matter
        var PIXEL_CONST = 70
        this.mapPosition = {x:0, y:0};
        this.tileType = _tileType

        /*this.mapCoin = new block('images/coin.png', this.matter
                                                  , this.coinOps)
        this.mapPrincess = new Character('images/princess.png', this.matter
                                                              , this.princessOps
                                                              , this.princessPos)*/
    }

    load()
    {
        this.floorOps = 
        {
            label: 'floor', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true
        }
        this.wallOps = 
        {
            label : 'wall',
            friction: 0.05,
            density: 0.002,
            isStatic: true
        }
        this.coinOps = 
        {
            label: 'Coin', 
            friction: 0.05, 
            density:0.002, 
            isStatic:true, 
            isSensor:true
        }
    }
    initialize()
    {
        if(this.tileType === 1)
        {
            // console.log("This is Floor")
            this.mapTile = new floor('images/grass.png', this.matter
                                                    , this.floorOps)
            this.mapTile.load()
            this.mapTile.initialize()
        }
        else if(this.tileType === 2)
        {
            this.mapTile = new floor('images/brickWall.png', this.matter
                                                   , this.wallOps)
            this.mapTile.load()
            this.mapTile.initialize()
        }
        else if(this.tileType === 3)
        {
            this.mapTile = new block('images/coin.png', 
                                            this.matter,
                                            this.coinOps)
            this.mapTile.load()
            this.mapTile.initialize()
        }
    }
    update(heroPosition_x,cameraPosition_x)
    {
        
        // this.mapTile.component.position = 
        // {
        //     x: this.mapPosition.x * 70 - cameraPosition_x + 500 + this.mapTile.component.sprite.width / 2,
        //     y: this.mapPosition.y * 70 + this.mapTile.component.sprite.height / 2
        // }

        //更新地圖方塊
        if(heroPosition_x >= 500)
        {
            // for	(var i = 0; i<this.floorsArray.length; i++)
            // {
            //     this.floorsArray[i].update(cameraPosition_x)
            // }
            // for	(var i = 0; i<this.wallsArray.length; i++)
            // {
            //     this.wallsArray[i].update(cameraPosition_x)
            // }
            this.mapTile.component.position = 
            {
                x: this.mapPosition.x * 70 - cameraPosition_x + 500 + this.mapTile.component.sprite.width / 2,
                y: this.mapPosition.y * 70 + this.mapTile.component.sprite.height / 2
            }
        } 
        this.mapTile.update()
    }
    draw()
    {
        // console.log("draw")
        this.mapTile.draw()
        /*else if(this.titleType === 3)
        {
            this.mapCoin.draw(Ctx)
        }
        else if(this.titleType === 4)
        {
            this.mapPrincess.draw(Ctx)
        }*/
    }
    setPosition(newValue)
    {
        console.log("MapTile setPosition")
        this.mapPosition = newValue
        this.mapTile.component.position = {x: this.mapPosition.x * 70, y: this.mapPosition.y * 70}
        console.log(this.mapTile.component.position)
        // this.mapWall.component.position = {x: this.mapPosition.x * 70, y: this.mapPosition.y * 70}
        // this.mapCoin.component.position = {x: this.mapPosition.x * 70, y: this.mapPosition.y * 70}
        // this.mapPrincess.component.position = {x: this.mapPosition.x * 70, y: this.mapPosition.y * 70}
    }
}