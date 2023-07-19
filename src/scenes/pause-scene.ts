import { AudioManager } from "../objects/AudioManager"
import Button from "../objects/Button"

export default class PauseScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics
    private newBtn: Button
    private continuetBtn: Button
    private muteBtn: Button
    private displayZone: Phaser.GameObjects.Zone

    constructor() {
        super({ key: 'PauseScene' })
    }

    create() {
        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(0.75)
        this.graphics.fillRect(0, 0, this.scale.canvas.width, this.scale.canvas.height)
        this.graphics.setVisible(true)

        this.displayZone = this.add.zone(0, 0, window.innerWidth, window.innerHeight).setDepth(-1)
        this.setupContinueBtn()
        this.setupNewBtn()
        this.setupMuteBtn()
    }

    private setupContinueBtn(): void {
        this.continuetBtn = new Button({
            scene: this,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            texture: "continue",
            textContent: undefined
        })

        const btnConfig = {
            POINTER_OVER: {
                isActive: true,
                callback: () => {
                    this.continuetBtn.isOver = true
                    this.continuetBtn.sprite.setTint(0xff0000)

                }
            },
            POINTER_DOWN: {
                isActive: true,
                callback: () => {
                    this.continuetBtn.sprite.setTint(0x00ff00)
                }
            },
            POINTER_OUT: {
                isActive: true,
                callback: () => {
                    this.continuetBtn.isOver = false
                    this.continuetBtn.sprite.clearTint()
                }
            },
            POINTER_UP: {
                isActive: true,
                callback: () => {
                    if (this.continuetBtn.isOver) {
                        this.scene.stop()
                        this.scene.resume('GameScene')
                        this.scene.resume('UIScene')
                    }
                    this.continuetBtn.sprite.clearTint()
                }
            },
        }
        this.continuetBtn.setupCallback(btnConfig)

        Phaser.Display.Align.In.Center(this.displayZone, this.continuetBtn)
    }


    private setupNewBtn(): void {

        this.newBtn = new Button({
            scene: this,
            x: window.innerWidth / 2 - 200,
            y: window.innerHeight / 2,
            texture: "new",
            textContent: undefined
        })

        const btnConfig = {
            POINTER_OVER: {
                isActive: true,
                callback: () => {
                    this.newBtn.isOver = true
                    this.newBtn.sprite.setTint(0xff0000)
                }
            },
            POINTER_DOWN: {
                isActive: true,
                callback: () => {
                    this.newBtn.sprite.setTint(0x00ff00)
                }
            },
            POINTER_OUT: {
                isActive: true,
                callback: () => {
                    this.newBtn.isOver = false
                    this.newBtn.sprite.clearTint()
                }
            },
            POINTER_UP: {
                isActive: true,
                callback: () => {
                    if (this.newBtn.isOver) {
                        this.scene.stop("UIScene")
                        this.scene.launch("UIScene")
                        this.scene.stop("GameScene")
                        this.scene.start("GameScene")
                        this.scene.stop()
                    }
                    this.newBtn.sprite.clearTint()
                }
            },
        }
        this.newBtn.setupCallback(btnConfig)

        Phaser.Display.Align.In.Center(this.displayZone, this.newBtn)
    }

    private setupMuteBtn(): void {

        this.muteBtn = new Button({
            scene: this,
            x: window.innerWidth / 2 + 200,
            y: window.innerHeight / 2,
            texture: "volume",
            textContent: undefined
        })

        if (AudioManager.Instance.IsMuted) {
            this.muteBtn.sprite.setTint(0x808080)
        }
        
        const btnConfig = {
            POINTER_OVER: {
                isActive: true,
                callback: () => {
                    this.muteBtn.isOver = true
                    this.muteBtn.sprite.setTint(0xff0000)
                }
            },
            POINTER_DOWN: {
                isActive: true,
                callback: () => {
                    this.muteBtn.sprite.setTint(0x00ff00)
                }
            },
            POINTER_OUT: {
                isActive: true,
                callback: () => {
                    this.muteBtn.isOver = false
                    if (!AudioManager.Instance.IsMuted) {
                        this.muteBtn.sprite.clearTint()
                    }
                    else {
                        this.muteBtn.sprite.setTint(0x808080)
                    }
                }
            },
            POINTER_UP: {
                isActive: true,
                callback: () => {
                    if (this.muteBtn.isOver) {
                        console.log(AudioManager.Instance.IsMuted)
                        if (!AudioManager.Instance.IsMuted) {
                            AudioManager.Instance.IsMuted = true
                            this.muteBtn.sprite.setTint(0x808080)
                        }
                        else {
                            AudioManager.Instance.IsMuted = false
                            AudioManager.Instance.resumeBGM()
                            this.muteBtn.sprite.clearTint()
                        }
                    }
                }
            },
        }
        this.muteBtn.setupCallback(btnConfig)

        Phaser.Display.Align.In.Center(this.displayZone, this.muteBtn)
    }
}