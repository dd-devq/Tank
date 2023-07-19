export default class GameOver extends Phaser.Scene {
    private score: number
    private scoreText: Phaser.GameObjects.Text

    constructor() {
        super({key: "GameOverScene"})
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init(data: any) {
        this.score = data.score
    }

    create() {
        this.scoreText = this.add.text(100, 100, this.score.toString(), {
            font: '48px Arial', color: '#f7f7f7'
        })
    }
}