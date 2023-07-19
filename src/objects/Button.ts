import { IButtonCallbackConfig, IButtonConstructor } from "../interfaces/button.interface"

export default class Button extends Phaser.GameObjects.Container {
    public isOver = false
    public sprite :Phaser.GameObjects.Sprite
    constructor(btnConstructor:IButtonConstructor) {
        super(btnConstructor.scene, btnConstructor.x, btnConstructor.y)

            this.sprite = this.scene.add.sprite(this.x, this.y, btnConstructor.texture)
            this.add(this.sprite)
            this.scene.add.existing(this.sprite).setScale(3)

        if (btnConstructor.textContent !== undefined) {
            this.scene.add.text(this.x, this.y, btnConstructor.textContent, {
                font: '48px Arial', 
                color: '#000000' 
            })
        
        }

        this.setSize(this.sprite.width*3, this.sprite.height*3)

        this.scene.add.existing(this)        
        this.setInteractive()
    }

    public setupCallback(config: IButtonCallbackConfig):void {
        if (config.POINTER_OVER.isActive) {
            this.on(Phaser.Input.Events.POINTER_OVER, config.POINTER_OVER.callback)
        }

        if (config.POINTER_OUT.isActive) {
            this.on(Phaser.Input.Events.POINTER_OUT, config.POINTER_OUT.callback)
        }

        if (config.POINTER_DOWN.isActive) {
            this.on(Phaser.Input.Events.POINTER_DOWN, config.POINTER_DOWN.callback)
        }

        if (config.POINTER_UP.isActive) {
            this.on(Phaser.Input.Events.POINTER_UP, config.POINTER_UP.callback)
        }
    }    
}