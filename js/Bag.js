var Bag = Framework.exClass(Framework.GameMainMenu,
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
            this.backYellowGround = new Framework.Sprite(define.imagePath + 'bagYellowground.png');
            this.backGround = new Framework.Sprite(define.imagePath + 'bagBackground.png');
            this.bagTitle = new Framework.Sprite(define.imagePath + 'bagTitlepic.png');
            this.bagSquareArray = []
            for(var i = 0; i < 8; i++)
            {
                this.bagSquareArray.push(new Framework.Sprite(define.imagePath + 'bagNone.png'))
            }
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
                x: Framework.Game.getCanvasWidth()/8,
                y: Framework.Game.getCanvasHeight()/6 + 35
            };
            this.backGround.scale = 1;

            //背包標題
            this.bagTitle.position = {
                x: Framework.Game.getCanvasWidth()/2 - 200,
                y: Framework.Game.getCanvasHeight()/9 + 20
            }
            this.bagTitle.scale = 0.3

            this.rootScene.attach(this.backYellowGround);
            this.rootScene.attach(this.backGround);
            this.rootScene.attach(this.bagTitle);

            //背包欄位
            for(var i = 0; i < 4; i++)
            {
                this.bagSquareArray[i].position = {
                    x: Framework.Game.getCanvasWidth()/8 + 180 + i*240,
                    y: Framework.Game.getCanvasHeight()/3 + 50
                }
                this.bagSquareArray[i].scale = 0.7
                this.rootScene.attach(this.bagSquareArray[i]);
            }
            for(var i = 4; i < 8; i++)
            {
                this.bagSquareArray[i].position = {
                    x: Framework.Game.getCanvasWidth()/8 + 180 + (i-4) * 240,
                    y: Framework.Game.getCanvasHeight()/3 + 300
                }
                this.bagSquareArray[i].scale = 0.7
                this.rootScene.attach(this.bagSquareArray[i]);
            }

            this.rectPosition = {
                x: Framework.Game.getCanvasWidth() / 2 - 130,
                y: Framework.Game.getCanvasHeight() / 2
            };
        },

        update: function () {
            //this.rootScene.update();一定要在第一行
            this.rootScene.update();
            //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update
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
            // 點擊關閉(返回關卡選單)
            if (e.x >= 1270 && 
                e.x <= 1390 && 
                e.y >= 181 && 
                e.y <= 300) 
            {
                Framework.Game.goToLevel("chooseLevel");
            }
            // 點擊物品1
            if (e.x >= 295 && 
                e.x <= 465 && 
                e.y >= 265 && 
                e.y <= 430) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品2
            if (e.x >= 535 && 
                e.x <= 705 && 
                e.y >= 265 && 
                e.y <= 430) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品3
            if (e.x >= 775 && 
                e.x <= 945 && 
                e.y >= 265 && 
                e.y <= 430) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品4
            if (e.x >= 1015 && 
                e.x <= 1185 && 
                e.y >= 265 && 
                e.y <= 430) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品5
            if (e.x >= 295 && 
                e.x <= 465 && 
                e.y >= 515 && 
                e.y <= 680) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品6
            if (e.x >= 535 && 
                e.x <= 705 && 
                e.y >= 515 && 
                e.y <= 680) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品7
            if (e.x >= 775 && 
                e.x <= 945 && 
                e.y >= 515 && 
                e.y <= 680) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
            // 點擊物品8
            if (e.x >= 1015 && 
                e.x <= 1185 && 
                e.y >= 515 && 
                e.y <= 680) 
            {
                alert("你還沒拿到這樣東西呢，傻瓜！")
            }
        },

        mousemove: function (e) 
        {
            console.log(e.x + "  " + e.y)    
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