import { Bullet } from './bullet'
import { IImageConstructor } from '../interfaces/image.interface'

export class Player extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body

    // variables
    private health: number
    private lastShoot: number
    private speed: number

    // children
    private barrel: Phaser.GameObjects.Image
    private lifeBar: Phaser.GameObjects.Graphics

    // game objects
    private bullets: Phaser.GameObjects.Group

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private shootingKey: Phaser.Input.Keyboard.Key
    private upKey: Phaser.Input.Keyboard.Key
    private downKey: Phaser.Input.Keyboard.Key
    private leftKey: Phaser.Input.Keyboard.Key
    private rightKey: Phaser.Input.Keyboard.Key

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initImage()
        this.scene.add.existing(this)
    }

    private initImage() {
        // variables
        this.health = 100
        this.lastShoot = 0
        this.speed = 200

        // image
        this.setOrigin(0.5, 0.5)
        this.setDepth(0)
        this.angle = 180

        this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)
        this.barrel.angle = 180

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // input
        if (this.scene.input.keyboard !== null) {
            this.cursors = this.scene.input.keyboard.createCursorKeys()
            this.shootingKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            )

            this.upKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.W
            )

            this.downKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.S
            )

            this.leftKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.A
            )

            this.rightKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.D
            )
        }

        this.scene.input.on('pointermove', this.updateBarrel, this)
        // physics
        this.scene.physics.world.enable(this)
    }

    update(): void {
        if (this.active) {
            this.barrel.x = this.x
            this.barrel.y = this.y
            this.lifeBar.x = this.x
            this.lifeBar.y = this.y
            this.handleInput()
            this.handleShooting()
        } else {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    private handleInput() {
        if (this.cursors.up.isDown || this.upKey.isDown) {
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                this.speed,
                this.body.velocity
            )

        } else if (this.cursors.down.isDown || this.downKey.isDown) {

            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                -this.speed,
                this.body.velocity
            )
        }
        else {
            this.body.setVelocity(0, 0)
        }

        if ((this.cursors.left.isDown || this.leftKey.isDown) && ((this.cursors.down.isDown || this.downKey.isDown) || (this.cursors.up.isDown || this.upKey.isDown))) {
            this.rotation += 0.02
        } else if ((this.cursors.right.isDown || this.rightKey.isDown) && ((this.cursors.down.isDown || this.downKey.isDown) || (this.cursors.up.isDown || this.upKey.isDown))) {
            this.rotation -= 0.02
        }

    }

    updateBarrel(pointer: Phaser.Input.Pointer): void {
        const angle = (pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2).subtract(new Phaser.Math.Vector2(this.x, this.y)).angle()
        this.barrel.rotation = angle + Phaser.Math.PI2 / 4
    }

    private handleShooting(): void {
        if ((this.shootingKey.isDown && this.scene.time.now > this.lastShoot) ||

            (this.scene.input.activePointer.isDown && this.scene.time.now > this.lastShoot)) {
            // this.scene.cameras.main.shake(20, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: 'Power1',
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false,
            })

            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletBlue',
                    })
                )

                this.lastShoot = this.scene.time.now + 100
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health / 100, 15)
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05
            this.redrawLifebar()
        } else {
            this.health = 0
            this.active = false
            this.scene.scene.start('MenuScene')
        }
    }
}
