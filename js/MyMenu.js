var MyMenu = Framework.exClass(Framework.GameMainMenu,
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
            this.menu = new Framework.Sprite(define.imagePath + 'menuBackground.jpg')
            // this.startSign = new StartSign()
            // this.startSign.load(Framework.Game.getCanvasWidth() / 2 - 200, Framework.Game.getCanvasHeight() / 2 - 150)
            
            this.startSign = new Framework.Sprite(define.imagePath + 'btn-start.png')
            this.aboutSigh = new Framework.Sprite(define.imagePath + 'btn-about.png')
            this.cheatSign = new Framework.Sprite(define.imagePath + 'btn-cheat.png')
            this.settingSign = new Framework.Sprite(define.imagePath + 'btn-instructions.png')
            this.audio = new Framework.Audio({bgm1: {mp3: 'music/bgm1.mp3'}})
            this.ismusic = false
        },

        initialize: function () {
            //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
            //注意, Position都是用中心點
            this.menu.position = {
                x: Framework.Game.getCanvasWidth() / 2,
                y: Framework.Game.getCanvasHeight() / 2
            };
            this.menu.scale = 1.2;

            // this.rootScene.attach(this.menu);
            

            this.rectPosition = {
                x: Framework.Game.getCanvasWidth() / 2 - 130,
                y: Framework.Game.getCanvasHeight() / 2
            };

            this.startSign.position = 
            {
                x:635,
                y:640
            }
            

            
            this.aboutSigh.position = 
            {
                x:270,
                y:380
            }
            this.settingSign.position = 
            {
                x:650,
                y:380
            }
            this.cheatSign.position =
            {
                x:1030,
                y:380
            }
            this.rootScene.attach(this.startSign)
            this.rootScene.attach(this.aboutSigh)
            this.rootScene.attach(this.settingSign)
            this.rootScene.attach(this.cheatSign)
        },

        update: function () {
            //this.rootScene.update();一定要在第一行
            this.rootScene.update();
            // console.log('update')
            //目前的Framework, 當任何一個GameObject不做attach時, 則必須要自行update
        },

        draw: function (parentCtx) {
            //this.rootScene.draw();一定要在第一行
            // this.rootScene.draw(parentCtx);
            // this.menu.draw(parentCtx);
            //this.rootScene.draw();
            //可支援畫各種單純的圖形和字
            parentCtx.font = '100pt bold';
            parentCtx.fillStyle = 'red';
            parentCtx.textBaseline = 'top';
            parentCtx.textAlign = 'center';
            parentCtx.fillText('Super Adventure', this.rectPosition.x + 130, this.rectPosition.y - 400, 1000);
        },

        mouseup: function (e) {

        },

        mousedown: function (e) {
            //console.log為Browser提供的function, 可以在debugger的console內看到被印出的訊息                    
            // Framework.Game.goToNextLevel();
        },

        click: function (e) 
        {
            if(!this.ismusic)
            {
                this.audio.play({name: 'bgm1', loop: true})
                this.ismusic = true
            }
            
            console.log(e.x + "  " + e.y)    
            // start
            if (e.x >= 630 && 
                e.x <= 980 && 
                e.y >= 640 && 
                e.y <= 865) 
            {
                Framework.Game.goToLevel("chooseLevel");
            }

            // about
            if (e.x >= 270 && 
                e.x <= 570 && 
                e.y >= 380 && 
                e.y <= 570) 
            {
                Framework.Game.goToLevel("aboutScreen");
            }
            // setting
            if (e.x >= 650 && 
                e.x <= 950 && 
                e.y >= 380 && 
                e.y <= 570) 
            {
                Framework.Game.goToLevel("instructionScreen");
            }
            // cheat
            if (e.x >= 1030 && 
                e.x <= 1330 && 
                e.y >= 380 && 
                e.y <= 570) 
            {
                Framework.Game.goToLevel("cheatScreen");
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
        },

        keydown(e)
        {
            if(e.key === 'F11') 
            {
                this.isFullScreen = Framework.Game.isGameFullScreen
                if(!this.isFullScreen)
                {
                    Framework.Game.fullScreen();
                    Framework.Game.isGameFullScreen = true;
                }
                else
                {
                    Framework.Game.exitFullScreen();
                    Framework.Game.isGameFullScreen = false;
                }
            }
        }
    });