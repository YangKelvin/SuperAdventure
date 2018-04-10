Framework.Matter = class MatterUtil 
{
        constructor() 
        {
            this.engine = Matter.Engine.create()
            this.world = this.engine.world
            this.body = Matter.Body
            this.render = Matter.Render.create(
                {
                element: Framework.Game._canvasContainer,
                canvas: Framework.Game._canvas,
                engine: this.engine,
                options: {
                    width: Framework.Config._canvasWidth,
                    height:Framework.Config._canvasHeight,
                    wireframes: true
                }
            })
            this.isWireframeRendering = false
        }

        toggleRenderWireframes() 
        {
            // console.log("P")
            if(this.isWireframeRendering) 
            {
                Matter.Render.stop(this.render)
                console.log("P")
            } 
            else 
            {
                Matter.Render.run(this.render)
            }
            this.isWireframeRendering = !this.isWireframeRendering
        }

        createRectangleBody(originX, originY, width, height, options) {
            let body = Matter.Bodies.rectangle(originX, originY, width, height, options)
            Matter.World.add(this.world, body)
            return body
        }

        createCircleBody(originX, originY, radius, options) {
            let body = Matter.Bodies.circle(originX, originY, radius, options)
            Matter.World.add(this.world, body)
            return body
        }

        removeBody(body) {
            Matter.Composite.remove(this.world, body)
        }

        setBody(body, settings, value) {
            Matter.Body.set(body, settings, value)
        }

        scaleBody(body, scaleX, scaleY){
            Matter.Body.scale(body, scaleX, scaleY)
        }

        addEventListener(eventName, callback) {
            Matter.Events.on(this.engine, eventName, callback)
        }

        update() {
            Matter.Engine.update(this.engine, 1000 / Framework.Config.fps, 1)
        }
    }