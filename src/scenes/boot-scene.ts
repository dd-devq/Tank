export class BootScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics
    private progressBar: Phaser.GameObjects.Graphics

    constructor() {
        super({
            key: 'BootScene',
        })
    }

    preload(): void {
        if (!localStorage.getItem('tank-highscore')) {
            localStorage.setItem('tank-highscore', '0')
        }
        this.cameras.main.setBackgroundColor(0x000000)
        this.createLoadingGraphics()

        this.load.on('progress', (value: number) => {
            this.progressBar.clear()
            this.progressBar.fillStyle(0x88e453, 1)
            this.progressBar.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
            )
        })

        this.load.on('complete', () => {
            this.progressBar.destroy()
            this.loadingBar.destroy()
        })
        this.load.atlas('confetti', 'assets\\particles\\cofetti.png', 'assets\\particles\\cofetti.json')
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json')
        this.load.pack('preload', './assets/pack.json', 'preload')
    }

    update(): void {
        this.scene.start('MenuScene')
    }

    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics()
        this.loadingBar.fillStyle(0xffffff, 1)
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        )
        this.progressBar = this.add.graphics()
    }
}
