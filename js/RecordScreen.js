var RecordScreen = Framework.exClass(Framework.GameMainMenu,
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
            // load background
            this.backYellowGround = new Framework.Sprite(define.imagePath + 'background-yellow.png');
            this.backYellowGround.position = {
                x: 0,
                y: 0
            };
            this.backYellowGround.scale = 5;
            this.rootScene.attach(this.backYellowGround)

            //load icon
            this.back = new Framework.Sprite(define.imagePath + 'icon-back.png')
            this.back.position =
            {
                x: 60,
                y: 60
            }
            this.back.scale = 0.2
            this.rootScene.attach(this.back)

            
            
            this.records = new Array()

            for (var i = 0; i < 6; i++)
            {
                this.records[i] = new Textbox()
                this.records[i]._fillStyle = "white"
                this.records[i]._fontColor = "black"
                this.records[i].position = 
                {
                    x: 100,
                    y: 150 + i * 100
                }
                this.records[i]._text = "Level" + (i+1) + " : "
                this.records[i]._value = Framework.Game.records[i].record
                this.rootScene.attach(this.records[i])
            }
            
            console.log(Framework.Game.items)
        },

        initialize: function () {
            //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
            //注意, Position都是用中心點
            
            //最底層背景
            
            
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
            if (e.x >= 3 && 
                e.x <= 105 && 
                e.y >= 10 && 
                e.y <= 110) 
            {
                Framework.Game.goToLevel("chooseLevel");
                Framework.Game._levels.splice(3,1,{name : "levelTest", level : new LevelTest()})
                Framework.Game.userIQ = 250
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