var Level4 = Framework.exClass(Framework.GameMainMenu,
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
            this.backYellowGround = new Framework.Sprite(define.imagePath + 'background-yellow.png')
            this.endScreen = new Framework.Sprite(define.imagePath + 'endScreen.png')
            this.stop = false
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
            this.rootScene.attach(this.backYellowGround)

            //結束畫面
            this.endScreen.position = {x: 0, y: 0}
            this.endScreen.scale = 1;
            this.rootScene.attach(this.endScreen)
        },

        update: function () {
            //this.rootScene.update();一定要在第一行
            if (this.endScreen.position.y > -3752)
            {
                this.endScreen.position = {x: this.endScreen.position.x, y: this.endScreen.position.y - 2}
            }
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
            // 點擊"重新開始"(返回關卡選單)
            if (e.x >= 325 && 
                e.x <= 717 && 
                e.y >= 620 && 
                e.y <= 740 && this.endScreen.position.y <= -3752)
            {
                Framework.Game.goToLevel("chooseLevel");
            }
            // 點擊"結束遊戲"(返回關卡選單)
            if (e.x >= 887 && 
                e.x <= 1275 && 
                e.y >= 620 && 
                e.y <= 740 && this.endScreen.position.y <= -3752)
            {
                Framework.Game.goToLevel("chooseLevel");
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