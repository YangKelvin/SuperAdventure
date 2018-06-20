//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
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
				loadGameEnd = true;
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
    var listScript = 
    [
        { src: 'js/define.js', lookFor: 'define' },
        { src: 'js/myMenu.js', lookFor: 'MyMenu' },
        { src: 'js/CheatScreen.js', lookFor: 'CheatScreen' },
        { src: 'js/InstructionScreen.js', lookFor: 'InstructionScreen' },
        { src: 'js/AboutScreen.js', lookFor: 'AboutScreen' },
        { src: 'js/Bag.js', lookFor: 'Bag' },
        { src: 'js/RecordScreen.js', lookFor: 'RecordScreen' },
        { src: 'js/ChooseLevel.js', lookFor: 'ChooseLevel' },
        { src: 'js/LevelTest.js', lookFor: 'LevelTest' },
        { src: 'js/Level1.js', lookFor: 'Level1' },
        { src: 'js/Level2.js', lookFor: 'Level2' },
        { src: 'js/Level3.js', lookFor: 'Level3' },
        { src: 'js/Level4.js', lookFor: 'Level4' },
        { src: 'js/DieScreen.js', lookFor: 'DieScreen' },
        { src: 'js/EndLevel.js', lookFor: 'EndLevel' },
        { src: 'js/Character.js', lookFor: 'Character' },
        { src: 'js/block.js', lookFor: 'block' },
        { src: 'js/Camera.js', lookFor: 'Camera' },
        { src: 'js/textbox.js', lookFor: 'Textbox' },
        { src: 'js/AnimationCharacter.js', lookFor: 'AnimationCharacter' },
        { src: 'js/mainGame.js'}
    ]

    importJS(listScript)
    
})()


    
