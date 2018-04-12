//立即執行函式, 並封裝所有變數避免衝突
var loadFrameworkEnd;
(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    var  importJS = function(jsConf, src, lookFor) {
        var headID = document.getElementsByTagName("head")[0]; 
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if(jsConf.length > 0) {
                importJS(jsConf, lookFor);
            }else
            {
                loadFrameworkEnd = true;
            }
        });
    }

    var wait_for_script_load = function(jsConf, callback) {
        var interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = '';
            }

            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                    clearInterval(interval);
                    callback();      
                }
            }, 50);
    }

    //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中, 
    //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
    //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
    var frameworklistScript = 
    [
        { src: 'js/src/config.js'},
        { src: 'js/src/Record.js'},
        { src: 'js/src/Replay.js'},
        { src: 'js/src/EqualCondition.js'},
        { src: 'js/src/Util.js'},
        { src: 'js/src/core.js'},
        { src: 'js/src/DebugInfo.js'},
        { src: 'js/src/FpsAnalysis.js'},
        { src: 'js/src/Point.js'},
        { src: 'js/src/GameObject.js'},
        { src: 'js/src/Sprite.js'},
        { src: 'js/src/animationSprite.js'},
        { src: 'js/src/Scene.js'},
        { src: 'js/src/ResourceManager.js'},
        { src: 'js/src/level.js'},
        { src: 'js/src/Game.js'},
        { src: 'js/src/MouseManager.js'},
        { src: 'js/src/KeyBoardManager.js'},
        { src: 'js/src/TouchManager.js'},
        { src: 'js/src/gameMainMenu.js'},
        { src: 'js/src/Audio.js'},
        { src: 'js/src/Box2dWeb-2.1.a.3.js'},
        { src: 'js/src/Box2D.js'},
        { src: 'js/src/Matter-0.14.1.js'},
        { src: 'js/src/MatterUtil.js'},
        { src: 'js/src/circleComponent.js'},    
        { src: 'js/src/polygonComponent.js'},   
        // { src: 'js/src/squareComponent.js'},
        { src: 'js/src/Component.js'},    //update
        { src: 'js/src/triangleComponent.js'},

        { src: 'js/src/AnimationRectangleComponent.js'},
        { src: 'js/src/RectangleComponent.js'},
        
        

        //{ src: 'game_sample/js/loadGame.js'},
    ]
    importJS(frameworklistScript);
    
})();


    
