var ChooseLevel = Framework.exClass(Framework.GameMainMenu,
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
            console.log(Framework.Game._levels) // 顯示現有的levels
            this.menu = new Framework.Sprite(define.imagePath + 'chooseLevel_background3.png')
            
            this.item1 = false
            this.item2 = false
            this.item3 = false
            //讀取背包圖示
            this.bag = new Framework.Sprite(define.imagePath + 'bag.png');
            this.record = new Framework.Sprite(define.imagePath + 'record2.png')

            

            
            Framework.Game.items[0].item = true


            this.locks = new Array()

            this.locksPos = 
            [
                {x: 440, y: 390},
                {x: 800, y: 390},
                {x: 1160, y: 390},

                {x: 440, y: 715},
                {x: 800, y: 715},
                {x: 1160, y: 715},
            ]
            for (var i = 0; i < this.locksPos.length; i++)
            {
                this.locks[i] = new Framework.Sprite('images/lock.png')
                this.locks[i].scale = 0.3
                this.locks[i].position = this.locksPos[i]
                this.rootScene.attach(this.locks[i])
            }

            
        },

        initialize: function () {
            //為了讓之後的位置較好操控, new出一個位於中心點且可以黏貼任何東西的容器
            //注意, Position都是用中心點
            this.menu.position = {
                x: Framework.Game.getCanvasWidth() / 2,
                y: Framework.Game.getCanvasHeight() / 2
            };
            this.menu.scale = 1.5;
            this.rootScene.attach(this.menu);

            //設定背包圖示位置
            this.bag.position =
            {
                x: Framework.Game.getCanvasWidth() * 14 / 15,
                y: Framework.Game.getCanvasHeight() / 5
            }
            this.bag.scale = 0.2
            this.rootScene.attach(this.bag);

            // 設定紀錄圖示位置
            this.record.position = 
            {
                x: Framework.Game.getCanvasWidth() * 14 / 15,
                y: Framework.Game.getCanvasHeight() / 2
            }
            this.record.scale = 0.3
            this.rootScene.attach(this.record)



            this.rectPosition = {
                x: Framework.Game.getCanvasWidth() / 2 - 130,
                y: Framework.Game.getCanvasHeight() / 2
            };


            for (var i = 1; i < this.locksPos.length; i++)
            {
                this.rootScene.attach(this.locks[i])
            }


            for (var i = 0; i < 6; i++)
            {
                // console.log(Framework.Game.items[i].item)
                if (Framework.Game.items[i].item === true)
                {
                    // console.log(i)
                    this.locks[i+1].position = {x: -500, y: -500}
                }
            }
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
            console.log(e.x + "  " + e.y)  
            // level1
            if (e.x >= 340 && 
                e.x <= 540 && 
                e.y >= 285 && 
                e.y <= 485) 
            {
                Framework.Game.goToLevel("level1");
            }
            // level2
            if (e.x >= 705 && 
                e.x <= 905 && 
                e.y >= 285 && 
                e.y <= 485) 
            {
                // Framework.Game.goToLevel("level2");
                console.log("startGame")
                alert("想玩？沒門！ 還沒通過前面關卡，還想來挑戰")
            }
            // level3
            if (e.x >= 1065 && 
                e.x <= 1265 && 
                e.y >= 285 && 
                e.y <= 485) 
            {
                // Framework.Game.goToLevel("level1");
                // console.log("startGame")
                alert("想玩？沒門！ 因為還沒有這一關")
            }
            // level4
            if (e.x >= 340 && 
                e.x <= 530 && 
                e.y >= 615 && 
                e.y <= 815) 
            {
                // Framework.Game.goToLevel("level1");
                // console.log("startGame")
                alert("想玩？沒門！ 因為還沒有這一關")
            }
            // level5
            if (e.x >= 705 && 
                e.x <= 905 && 
                e.y >= 615 && 
                e.y <= 815) 
            {
                // Framework.Game.goToLevel("level1");
                // console.log("startGame")
                alert("想玩？沒門！ 因為還沒有這一關")
            }
            // level6
            if (e.x >= 1065 && 
                e.x <= 1265 && 
                e.y >= 615 && 
                e.y <= 815) 
            {
                // Framework.Game.goToLevel("level1");
                // console.log("startGame")
                alert("想玩？沒門！ 因為還沒有這一關")
            }
            // 打開背包
            if (e.x >= 1437 && 
                e.x <= 1545 && 
                e.y >= 80 && 
                e.y <= 245)
            {
                Framework.Game.goToLevel("bag")
                console.log("Open Bag")
            }

            // 打開紀錄
            if (e.x >= 1437 && 
                e.x <= 1545 && 
                e.y >= 360 && 
                e.y <= 540)
            {
                Framework.Game.goToLevel("recordScreen")
                console.log("Open Bag")
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