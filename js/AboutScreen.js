var AboutScreen = Framework.exClass(Framework.GameMainMenu,
    {
        //初始化loadingProgress需要用到的圖片
        initializeProgressResource: function () 
        {
            this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
            this.loading.position = 
            { 
                x: Framework.Game.getCanvasWidth() / 2, 
                y: Framework.Game.getCanvasHeight() / 2 
            };
            //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)
                    
        },

        //在initialize時會觸發的事件
        loadingProgress: function (ctx, requestInfo) 
        {
            //console.log(Framework.ResourceManager.getFinishedRequestPercent())
            this.loading.draw(ctx);
            ctx.font = '90px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.fillText(Math.round(requestInfo.percent) + '%', ctx.canvas.width / 2, ctx.canvas.height / 2 + 300);
        },
        
        load: function () {
            this.matter = new Framework.Matter() 

            this.backYellowGround = new Framework.Sprite(define.imagePath + 'background-yellow.png');
            this.backGround = new Framework.Sprite(define.imagePath + 'background-AboutScreen.png');
            // this.bagTitle = new Framework.Sprite(define.imagePath + 'bagTitlepic.png');
            
            this.lv1_clear = new Framework.Sprite(define.imagePath + 'clear.png');
            this.lv1_unclear = new Framework.Sprite(define.imagePath + 'unclear.png');

            this.lv2_clear = new Framework.Sprite(define.imagePath + 'clear.png');
            this.lv2_unclear = new Framework.Sprite(define.imagePath + 'unclear.png');

            this.lv3_clear = new Framework.Sprite(define.imagePath + 'clear.png');
            this.lv3_unclear = new Framework.Sprite(define.imagePath + 'unclear.png');
        
            this.lv1Clear = false
            this.lv2Clear = false
            this.lv3Clear = false


            this.txt_GoldSwordAtk = new Textbox()
            this.txt_GoldSwordAtk._width = 60
            this.txt_GoldSwordAtk._height = 0
            this.txt_GoldSwordAtk._fontColor = 'black'
            this.txt_GoldSwordAtk.position = {x:590, y:415}

            this.txt_GoldSwordCount = new Textbox()
            this.txt_GoldSwordCount._width = 60
            this.txt_GoldSwordCount._height = 0
            this.txt_GoldSwordCount._fontColor = 'black'
            this.txt_GoldSwordCount.position = {x:590, y:480}

            this.txt_KeyboardSwordAtk = new Textbox()
            this.txt_KeyboardSwordAtk._width = 60
            this.txt_KeyboardSwordAtk._height = 0
            this.txt_KeyboardSwordAtk._fontColor = 'black'
            this.txt_KeyboardSwordAtk.position = {x:590, y:545}

            this.txt_KeyboardSwordCount = new Textbox()
            this.txt_KeyboardSwordCount._width = 60
            this.txt_KeyboardSwordCount._height = 0
            this.txt_KeyboardSwordCount._fontColor = 'black'
            this.txt_KeyboardSwordCount.position = {x:590, y:610}
        },


        initialize: function () {
            //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
            //注意, Position都是用中心點
            
            //最底層背景
            this.backYellowGround.position = {
                x: 0,
                y: 0
            };
            this.backYellowGround.scale = 5;

            //背包框架
            this.backGround.position = {
                x: Framework.Game.getCanvasWidth() / 8,
                y: Framework.Game.getCanvasHeight() / 8
            };
            this.backGround.scale = 1;


            this.rootScene.attach(this.backYellowGround);
            this.rootScene.attach(this.backGround);

            

            this.rectPosition = {
                x: Framework.Game.getCanvasWidth() / 2 - 130,
                y: Framework.Game.getCanvasHeight() / 2
            };

            //#region 關卡是否通關
            
            //#endregion
            
        },

        update: function () {
            //this.rootScene.update();一定要在第一行
            

            //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update

            this.rootScene.update()
        },

        draw: function (parentCtx) {
            //this.rootScene.draw();一定要在第一行
            // this.rootScene.draw(parentCtx);
            // this.menu.draw(parentCtx);
            //this.rootScene.draw();
            //可支援畫各種單純的圖形和字
        },

        mouseup: function (e) {

        },

        mousedown: function (e) {
            //console.log為Browser提供的function, 可以在debugger的console內看到被印出的訊息                    
            // Framework.Game.goToNextLevel();
        },

        click: function (e) {
            console.log(e.x + " " + e.y)
            // 點擊關閉(返回關卡選單)
            if (e.x >= 1275 && 
                e.x <= 1390 && 
                e.y >= 115 && 
                e.y <= 230) 
            {
                Framework.Game.goToLevel("myMenu")
            }

            //#region change clear
            if (e.x >= 520 && 
                e.x <= 685 && 
                e.y >= 195 && 
                e.y <= 240) 
            {
                Framework.Game.items[0].item = !(Framework.Game.items[0].item)
            }

            if (e.x >= 520 && 
                e.x <= 685 && 
                e.y >= 255 && 
                e.y <= 300) 
            {
                Framework.Game.items[1].item = !(Framework.Game.items[1].item)
            }

            if (e.x >= 520 && 
                e.x <= 685 && 
                e.y >= 315 && 
                e.y <= 360) 
            {
                Framework.Game.items[2].item = !(Framework.Game.items[2].item)
            }
            //#endregion
       
            //#region add atk & count
            if (e.x >= 725 && 
                e.x <= 765 && 
                e.y >= 415 && 
                e.y <= 455 && Framework.Game.goldSwordAtk < 100)
            {
                Framework.Game.goldSwordAtk += 5
                console.log('goldSwordAtk += 5')
            }
            else if (e.x >= 780 && 
                e.x <= 820 && 
                e.y >= 415 && 
                e.y <= 455 && Framework.Game.goldSwordAtk > 2)
            {
                Framework.Game.goldSwordAtk -= 5
                console.log('goldSwordAtk -= 5')
            }
            //----------------------------------------------------
            if (e.x >= 725 && 
                e.x <= 765 && 
                e.y >= 475 && 
                e.y <= 515 && Framework.Game.goldSwordCount < 1000)
            {
                Framework.Game.goldSwordCount += 10
                console.log(Framework.Game.goldSwordCount)
                console.log('goldSwordCount += 10')
            }
            else if (e.x >= 780 && 
                e.x <= 820 && 
                e.y >= 475 && 
                e.y <= 515 && Framework.Game.goldSwordCount >= 10)
            {
                Framework.Game.goldSwordCount -= 10
                console.log('goldSwordCount -= 10')
            }
            //----------------------------------------------------
            if (e.x >= 725 && 
                e.x <= 765 && 
                e.y >= 540 && 
                e.y <= 580 && Framework.Game.keyboardAtk < 100)
            {
                Framework.Game.keyboardAtk += 5
                console.log('keyboardAtk += 5')
            }
            else if (e.x >= 780 && 
                e.x <= 820 && 
                e.y >= 540 && 
                e.y <= 580 && Framework.Game.keyboardAtk > 2)
            {
                Framework.Game.keyboardAtk -= 5
                console.log('keyboardAtk -= 5')
            }
            //----------------------------------------------------
            if (e.x >= 725 && 
                e.x <= 765 && 
                e.y >= 605 && 
                e.y <= 645 && Framework.Game.keyboardCount < 1000)
            {
                Framework.Game.keyboardCount += 10
                console.log('keyboardCount += 10')
            }
            else if (e.x >= 780 && 
                e.x <= 820 && 
                e.y >= 605 && 
                e.y <= 645 && Framework.Game.keyboardCount > 10)
            {
                Framework.Game.keyboardCount -= 10
                console.log('keyboardCount -= 10')
            }
            //#endregion
        },

        mousemove: function (e) 
        {
            // console.log(e.x + "  " + e.y)    
        },

        mouseup: function (e) {
            this.isTouchArrow = false;
        },

        touchstart: function (e) {
            //為了要讓Mouse和Touch都有一樣的事件
            //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
            this.mousedown(e[0]);
        },

        touchend: function (e) {
            this.mouseup();
        },

        touchmove: function (e) {
            this.mousemove(e[0]);
        }
    });