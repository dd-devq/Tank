export default class HUD extends Phaser.Scene {
    private score: number
    private scoreText: Phaser.GameObjects.Text

    constructor() {
        super({ key: 'UIScene', active: true })
        this.score = 0
    }

    create() {
        this.scoreText = this.add.text(20, 20, "SCORE - " + this.score.toString(), {
             font: '48px Arial', color: '#000000' 
        })

        this.add.existing(this.scoreText)

        this.scene.get('GameScene').events.on('addScore', (score: number) => {
            this.score += score
            this.scoreText.setText("SCORE - " + this.score.toString())
        })
    }

}