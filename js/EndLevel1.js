class EndLevel1 extends Framework.Level 
{
    constructor()
    {
        super() // 繼承
        
    }

    
    
    
    
    
    loadAudio()
    {
        this.audio = new Framework.Audio(
        {
            bgm1: {mp3: 'music/bgm1.mp3'},
            coin: {mp3: 'music/coin.mp3'},
            jump: {mp3: 'music/jump.mp3'},
            haha: {wav: 'music/haha.wav'}
        })
    }
    

    load() 
    {
        if (confirm("submit?"))
        {
            alert("yes")
        }
        else
        {
            alert("no")
        }
        
    }

    initialize() 
    {
        
    }

    update() 
    {
        
        //#region update
        
        this.matter.update()
        this.rootScene.update()

        // textBox
        this.map1.heroInfoX._value = Math.round(this.hero.component.position.x)
        this.map1.heroInfoY._value = Math.round(this.hero.component.position.y)
        this.map1.mapInfoL._value = this.camera.component.position.x

        //#endregion

    }
    draw(parentCtx) 
    {
        this.map1.draw(parentCtx)
    }

    keydown(e)
    {

    }
    keyup(e, list)
    {

    }

    
};
