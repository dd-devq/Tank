import Button from "../objects/Button"
import { AudioManager } from "../objects/AudioManager"
export default class HUD extends Phaser.Scene {
    public score: number
    private scoreText: Phaser.GameObjects.Text
    private displayZone: Phaser.GameObjects.Zone
    private pauseBtn: Button
    private initialized = false

    private pauseMenuContainer: Phaser.GameObjects.Container
    private graphics: Phaser.GameObjects.Graphics
    private newBtn: Button
    private continuetBtn: Button
    private muteBtn: Button

    constructor() {
        super({ key: 'UIScene' })
    }

    create() {
        this.score = 0

        this.displayZone = this.add.zone(0, 0, window.innerWidth, window.innerHeight).setDepth(-1)
        this.scoreText = this.add.text(20, 20, "SCORE - " + this.score.toString(), {
            font: '48px Arial', color: '#000000'
        })

        this.add.existing(this.displayZone)
        this.add.existing(this.scoreText)
        this.setupBtn()

        Phaser.Display.Align.In.TopLeft(this.displayZone, this.scoreText)
        if (!this.initialized) {

            this.scene.get('GameScene').events.on('addScore', (score: number) => {
                this.score += score
                this.scoreText.setText("SCORE - " + this.score.toString())
            })
            this.initialized = true
        }

        this.setupPauseMenu()
    }

    private setupPauseMenu() {

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000).setAlpha(0.75)
        this.graphics.fillRect(0, 0, this.scale.canvas.width, this.scale.canvas.height)
        this.graphics.setVisible(false)
        this.setupContinueBtn()
        this.setupNewBtn()
        this.setupMuteBtn()
        this.pauseMenuContainer = this.add.container(0, 0, [this.newBtn, this.continuetBtn, this.muteBtn, this.graphics])
        Phaser.Display.Align.In.Center(this.displayZone, this.pauseMenuContainer)
        this.add.existing(this.pauseMenuContainer)
        this.pauseMenuContainer.setInteractive()
        this.hidePauseContainer()
    }

    private showPauseContainer() {
        this.graphics.setVisible(true)

        this.newBtn.setActive(true)
        this.continuetBtn.setActive(true)
        this.muteBtn.setActive(true)
        this.newBtn.setVisible(true)
        this.continuetBtn.setVisible(true)
        this.muteBtn.setVisible(true)
        this.newBtn.sprite.setVisible(true)
        this.continuetBtn.sprite.setVisible(true)
        this.muteBtn.sprite.setVisible(true)
        this.pauseBtn.sprite.setDepth(-1)
        this.pauseBtn.setActive(false)
        this.pauseBtn.disableInteractive()
    }

    private hidePauseContainer() {
        this.newBtn.setActive(false)
        this.continuetBtn.setActive(false)
        this.muteBtn.setActive(false)
        this.newBtn.setVisible(false)
        this.continuetBtn.setVisible(false)
        this.muteBtn.setVisible(false)
        this.newBtn.sprite.setVisible(false)
        this.continuetBtn.sprite.setVisible(false)
        this.muteBtn.sprite.setVisible(false)
        this.graphics.setVisible(false)
        this.pauseBtn.sprite.setDepth(5)
        this.pauseBtn.setActive(true)
        this.pauseBtn.setInteractive()
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
                        this.scene.resume('GameScene')
                        this.hidePauseContainer()
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
                        this.scene.stop("GameScene")
                        this.scene.start("GameScene")
                        this.scene.restart()
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

    private setupBtn(): void {

        this.pauseBtn = new Button({
            scene: this,
            x: window.innerWidth - 100,
            y: 50,
            texture: "settings",
            textContent: undefined
        })

        const btnConfig = {
            POINTER_OVER: {
                isActive: true,
                callback: () => {
                    this.pauseBtn.isOver = true
                    this.pauseBtn.sprite.setTint(0xff0000)
                }
            },
            POINTER_DOWN: {
                isActive: true,
                callback: () => {
                    this.pauseBtn.sprite.setTint(0x00ff00)
                }
            },
            POINTER_OUT: {
                isActive: true,
                callback: () => {
                    this.pauseBtn.isOver = false
                    this.pauseBtn.sprite.clearTint()
                }
            },
            POINTER_UP: {
                isActive: true,
                callback: () => {
                    if (this.pauseBtn.isOver) {
                        this.scene.pause('GameScene')
                        // this.scene.pause('UIScene')
                        // this.scene.launch('PauseScene')
                        this.showPauseContainer()
                    }
                    this.pauseBtn.sprite.clearTint()
                }
            },
        }
        this.pauseBtn.setupCallback(btnConfig)

        Phaser.Display.Align.In.TopRight(this.displayZone, this.pauseBtn)
    }

}