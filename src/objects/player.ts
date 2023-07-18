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
    private rotateKeyLeft: Phaser.Input.Keyboard.Key
    private rotateKeyRight: Phaser.Input.Keyboard.Key
    private shootingKey: Phaser.Input.Keyboard.Key

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
        this.health = 10
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

        this.rotateKeyLeft = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
          )
          this.rotateKeyRight = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
          )
        }
        if (this.scene.input.keyboard !== null) {
            this.cursors = this.scene.input.keyboard.createCursorKeys()
            this.shootingKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            )
        }

        // this.scene.input.on('pointermove', this.updateBarrel, this)
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
        if (this.cursors.up.isDown) {
            if (this.angle <= 180 && this.angle >0) {
                if (this.angle >= 177) {
                    this.angle = 180
                }
                else {
                    this.angle += 4.9
                }
            }            
            else if (this.angle <=0) {
                this.angle -= 5
            }

            this.scene.physics.velocityFromRotation(
                Phaser.Math.DegToRad(this.angle -90),

                // this.rotation - Math.PI / 2,
                -this.speed,
                this.body.velocity
            )
            console.log(this.angle)

        } else if (this.cursors.down.isDown) {
            if (this.angle <= 180 && this.angle >0) {
                if (this.angle >= 177) {
                    this.angle = 180
                }
                else {
                    this.angle += 4.9
                }
            }            
            else if (this.angle <=0) {
                this.angle -= 5
            }

            this.scene.physics.velocityFromRotation(
                Phaser.Math.DegToRad(this.angle -90),
                this.speed,
                this.body.velocity
            )
        } else if (this.cursors.right.isDown) {

            if (this.angle > 91 || this.angle <0) {
                this.angle -= 5
            }

            this.scene.physics.velocityFromRotation(
                Phaser.Math.DegToRad(this.angle - 90),
                +this.speed,
                this.body.velocity
            )

        }
        else if (this.cursors.left.isDown) {
                console.log(this.angle)
            if (this.angle < -91 || this.angle >0) {
                this.angle += 5
            }


            this.scene.physics.velocityFromRotation(
                Phaser.Math.DegToRad(this.angle + 90),
                -this.speed,
                this.body.velocity
            )

        }
        else {
            this.body.setVelocity(0, 0)
        }


    if (this.rotateKeyLeft.isDown) {
        this.barrel.rotation -= 0.025
      } else if (this.rotateKeyRight.isDown) {
        this.barrel.rotation += 0.025
      }
    }

    updateBarrel(pointer: Phaser.Input.Pointer):void {

        const angle = Phaser.Math.Angle.BetweenPoints(
            this.barrel,
            pointer
          )
          this.barrel.angle = angle
          
    }

    private handleShooting(): void {
        if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
            this.scene.cameras.main.shake(20, 0.005)
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

                this.lastShoot = this.scene.time.now + 33
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health / 10, 15)
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
