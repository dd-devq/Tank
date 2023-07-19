export default class HUD extends Phaser.Scene {
    private score: number
    constructor() {
        super({ key: 'UIScene', active: true })
        this.score = 0
    }

    create() {
        this.scene.get('GameScene').events.on('addScore', (score: number) => {
            this.score += score
        })
    }
}