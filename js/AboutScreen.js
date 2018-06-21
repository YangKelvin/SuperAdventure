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
            this.loading.draw(ctx)
            ctx.font = '90px Arial'
            ctx.textAlign = 'center'
            ctx.fillStyle = 'white'
            ctx.fillText(Math.round(requestInfo.percent) + '%', ctx.canvas.width / 2, ctx.canvas.height / 2 + 300)
        },
        
        load: function () {
            this.matter = new Framework.Matter()
            
            if (Framework.Game.isGameFullScreen)
            {
                Framework.Game.fullScreen();
            }

            this.backYellowGround = new Framework.Sprite(define.imagePath + 'background-yellow.png')
            this.backGround = new Framework.Sprite(define.imagePath + 'background-AboutScreen.png')
            this.AboutTitle = new Framework.Sprite(define.imagePath + 'AboutScreen-Title.png')
        },


        initialize: function () {
            //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
            //注意, Position都是用中心點
            
            //最底層背景
            this.backYellowGround.position = {
                x: 0,
                y: 0
            }
            this.backYellowGround.scale = 5

            //框架
            this.backGround.position = {
                x: Framework.Game.getCanvasWidth() / 8,
                y: Framework.Game.getCanvasHeight() / 8 + 80
            }
            this.backGround.scale = 1

            //標題
            this.AboutTitle.position =
            {
                x: Framework.Game.getCanvasWidth() / 5 - 30,
                y: Framework.Game.getCanvasHeight() / 10 - 50
            }


            this.rootScene.attach(this.backYellowGround)
            this.rootScene.attach(this.backGround)
            this.rootScene.attach(this.AboutTitle)
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
            // 點擊關閉(返回關卡選單)
            if (e.x >= 1283 && 
                e.x <= 1393 && 
                e.y >= 190 && 
                e.y <= 295) 
            {
                Framework.Game.goToLevel("myMenu")
            }
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