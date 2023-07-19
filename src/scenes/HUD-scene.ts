import Button from "../objects/Button"

export default class HUD extends Phaser.Scene {
    private score: number
    private scoreText: Phaser.GameObjects.Text
    private displayZone: Phaser.GameObjects.Zone
    private pauseBtn: Button
    private initialized = false
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
                        this.scene.pause('UIScene')
                        this.scene.launch('PauseScene')
                    }
                    this.pauseBtn.sprite.clearTint()
                }
            },
        }
        this.pauseBtn.setupCallback(btnConfig)

        Phaser.Display.Align.In.TopRight(this.displayZone, this.pauseBtn)
    }

}