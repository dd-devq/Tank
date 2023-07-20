import Button from "../objects/Button"

export default class GameOver extends Phaser.Scene {
    private score: number
    private gameOverText: Phaser.GameObjects.BitmapText
    private scoreText: Phaser.GameObjects.Text
    private highScoreText: Phaser.GameObjects.Text
    private newBtn: Button
    private displayZone: Phaser.GameObjects.Zone

    constructor() {
        super({ key: "GameOverScene" })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init(data: any) {
        this.score = data.score
    }

    create() {

        this.cameras.main.setBackgroundColor('#ADD8E6')
        const graphics = this.add.graphics()
        this.displayZone = this.add.zone(0, 0, window.innerWidth, window.innerHeight).setDepth(-1)

        this.scoreText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3, "Score: 0", {
            font: '64px Arial', color: '#f7f7f7'
        }).setOrigin(0.5)

        const start = { scoreValue: 0 }
        const end = { scoreValue: this.score}
        
        this.tweens.add({
            targets: start,
            scoreValue: end.scoreValue,
            duration: 1000,
            onUpdate: () => {
                this.scoreText.setText("Score: " +Math.floor(start.scoreValue).toString())
            },
            callbackScope: this,
        })

        // Set the fill style with color and alpha (0.5 for half transparency)
        graphics.fillStyle(0x000000, 0.5)

        // Draw a transparent rectangle
        graphics.fillRoundedRect(this.cameras.main.width / 2 - this.cameras.main.width / 4, this.cameras.main.height / 2 - this.cameras.main.height / 5, this.cameras.main.width / 2, this.cameras.main.height / 3, 10)
        this.gameOverText = this.add.bitmapText(this.cameras.main.width / 2, this.cameras.main.height / 4, 'font', "GAME OVER", 100).setOrigin(0.5)

        const highScore = localStorage.getItem('tank-highscore')
        if (highScore) {
            if (this.score > parseInt(highScore)) {
                localStorage.setItem('tank-highscore', this.score.toString())
            }
        }

        const newHighScore = localStorage.getItem('tank-highscore')
        if (newHighScore) {
            this.highScoreText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3 + 100, "High Score: " + newHighScore, {
                font: '64px Arial', color: '#f7f7f7'
            }).setOrigin(0.5)

        }
        

        this.setupNewBtn()
        Phaser.Display.Align.In.Center(this.displayZone, this.scoreText)
        Phaser.Display.Align.In.Center(this.displayZone, this.highScoreText)
        Phaser.Display.Align.In.TopCenter(this.displayZone, this.gameOverText)

    }

    private setupNewBtn(): void {

        this.newBtn = new Button({
            scene: this,
            x: window.innerWidth / 2,
            y: window.innerHeight /2 + 50,
            texture: "new",
            textContent: undefined
        })

        this.newBtn.sprite.setScale(6)

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
                        this.scene.start("GameScene")
                        this.scene.launch("UIScene")
                        this.scene.stop()
                    }
                    this.newBtn.sprite.clearTint()
                }
            },
        }
        this.newBtn.setupCallback(btnConfig)

        Phaser.Display.Align.In.Center(this.displayZone, this.newBtn)
        
        this.tweens.add({
            targets: this.newBtn.sprite,
            scale: 7,
            yoyo: true,
            repeat: -1,
            duration: 400,
        })
    }
}