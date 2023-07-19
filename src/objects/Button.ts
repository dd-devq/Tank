import { IButtonCallbackConfig, IButtonConstructor } from "../interfaces/button.interface"

export default class Button extends Phaser.GameObjects.Container {
    
    
    constructor(btnConstructor:IButtonConstructor) {
        super(btnConstructor.scene, btnConstructor.x, btnConstructor.y)

        for (const texture in btnConstructor.texture) {
            const sprite = this.scene.add.image(this.x, this.y, texture)
            this.add(sprite)
        }

        if (btnConstructor.textContent !== undefined) {
            this.scene.add.text(this.x, this.y, btnConstructor.textContent, {
                font: '48px Arial', 
                color: '#000000' 
            })
        }
        
        this.setInteractive()
    }

    public setupCallback(config: IButtonCallbackConfig):void {
        if (config.POINTER_OVER.isActive) {
            this.on(Phaser.Input.Events.POINTER_OVER, config.POINTER_OVER.callback, this)
        }

        if (config.POINTER_OUT.isActive) {
            this.on(Phaser.Input.Events.POINTER_OVER, config.POINTER_OUT.callback, this)
        }

        if (config.POINTER_DOWN.isActive) {
            this.on(Phaser.Input.Events.POINTER_OVER, config.POINTER_DOWN.callback, this)
        }

        if (config.POINTER_UP.isActive) {
            this.on(Phaser.Input.Events.POINTER_OVER, config.POINTER_UP.callback, this)
        }
    }    
}