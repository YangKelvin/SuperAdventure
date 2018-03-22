var Map = function(map)
{
    this.mapArray = map;
    this.load = function(){

        this.mapFloor = new Framework.Sprite(define.imagePath + 'floor2.png');
        this.mapFloor.scale = 2;
        this.mapWall = new Framework.Sprite(define.imagePath + 'wall.png');
        //this.mapWall.scale = 2;
        
        // this.player1 = new BombMan(define.imagePath + 'player1.png', {down: {from: 0, to: 2}, left: {from:3, to: 5}, right: {from: 6, to: 8}, up: {from: 9, to: 11}});
        // this.player1.position = {x:1, y:1};
    }

    this.init = function()
    {
        //this.player1.StepMovedCallBack.push(this.playerMovedHandler);
        //this.constants = new Constants();
        //this.mapArray = [];
        this.floorArray = [];
        this.boxArray = [];

        for(var i=0; i<this.mapArray.length; i++){
            var line = this.mapArray[i];
            for(var j=0; j<line.length; j++){
                if(line[j] === 0){
                    var box = new block_Q();
                    box.position = {x:j, y:i};
                    this.boxArray.push(box);

                    var floo = new floor();
                    this.floorArray.push(floo);
                }
                else if(line[j] === 1){
                    
                }
            }
        }
	};

    // this.setPlayerPosition = function(playerPosition){
    //     this.player1.position = playerPosition;
    // }


	this.update = function()
	{
        // if(this.pressWalk === true && this.player1.isWalking === false)
        // {
        //     if(this.checkIsWalkAble(this.player1.position.x+this.playerWalkDirection.x,this.player1.position.y+this.playerWalkDirection.y))
        //     {
        //         this.player1.walk(this.playerWalkDirection);
        //     }
        // }
        // this.player1.update();
	}
	this.draw = function() {
        for(var i=0; i<this.boxArray.length; i++)
        {
            this.boxArray[i].draw();
        }
		// for(var i=0; i<this.mapArray.length; i++){
		// 	var line = this.mapArray[i];
		// 	for(var j=0; j<line.length; j++){
		// 		this.mapFloor.position = {x: j * 64, y: i * 64};
		// 		this.mapFloor.draw(ctx);
  //               if(line[j] === 1){
  //                   this.mapWall.position = {x: j * 64, y: i * 64};
  //                   this.mapWall.draw(ctx);
  //               }else if(line[j] === -1){
  //                   this.increaseBombNum.position = {x: j * 64, y: i * 64};
  //                   this.increaseBombNum.draw(ctx);
  //               }else if(line[j] === -2){
  //                   this.increaseBombPower.position = {x: j * 64, y: i * 64};
  //                   this.increaseBombPower.draw(ctx);
  //               }
		// 	}
		// }


        // for(var i=0; i<this.tileArray.length; i++)
        // {
        //     this.tileArray[i].draw(ctx);
        // }
        // this.player1.draw(ctx);
        
	}	

    

    // this.playerWalkDirection = {x:0,y:0};
    // this.pressWalk = false;
    // this.keyPress = "";
    // this.keydown = function(e, list){
    //     var playerPosition = this.player1.position;
    //     if(e.key === 'Down') {
    //         if(this.checkIsWalkAble(playerPosition.x,playerPosition.y+1)){
    //             //this.player1.walk({x:0,y:1});
    //             this.playerWalkDirection = {x:0,y:1};
    //             this.pressWalk = true;
    //             this.keyPress = "Down";
    //         }
    //     }

    //     if(e.key === 'Left') {
    //         if(this.checkIsWalkAble(playerPosition.x-1,playerPosition.y)){
    //             //this.player1.walk({x:-1,y:0});
    //             this.playerWalkDirection = {x:-1,y:0};
    //             this.pressWalk = true;
    //             this.keyPress = "Left";
    //         }
    //     }

    //     if(e.key === 'Right') {
    //         if(this.checkIsWalkAble(playerPosition.x+1,playerPosition.y)){
    //             //this.player1.walk({x:1,y:0});
    //             this.playerWalkDirection = {x:1,y:0};
    //             this.pressWalk = true;
    //             this.keyPress = "Right";
    //         }
    //     }

    //     if(e.key === 'Up') {
    //         if(this.checkIsWalkAble(playerPosition.x,playerPosition.y-1)){
    //             //this.player1.walk({x:0,y:-1});
    //             this.playerWalkDirection = {x:0,y:-1};
    //             this.pressWalk = true;
    //             this.keyPress = "Up";
    //         }
    //     }

    //     if(e.key === 'Space'){
    //         var bomb = this.player1.placeBomb();
    //         if(!Framework.Util.isNull(bomb))
    //         {
    //             bomb.ExploredCallBack.push(Framework.Game._currentLevel.map.bombExploredHandler);
    //             this.bombArray.push(bomb);
    //             var bombPosition = bomb.position;
    //             this.mapArray[bombPosition.y][bombPosition.x] = 3;
    //         }
    //     }
    // }

    // this.checkIsWalkAble = function(x,y){
    //     if(x < 0 || x > this.mapArray[0].length){ return false; }
    //     if(y < 0 || y > this.mapArray.length){ return false; }

    //     if(this.mapArray[y][x] > 0){ return false; }
    //     else{ return true;}
    // }
}