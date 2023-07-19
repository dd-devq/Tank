import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'
import { Obstacle } from '../objects/obstacles/obstacle'
import { AudioManager } from '../objects/AudioManager'
import HUD from './HUD-scene'

export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset | null
    private layer: Phaser.Tilemaps.TilemapLayer | null

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group
    private escKey: Phaser.Input.Keyboard.Key

    private initialized = false

    constructor() {
        super({
            key: 'GameScene',
        })
    }


    create(): void {
        if (this.input.keyboard !== null) {
            this.escKey = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.ESC
            )
            }
        if (!this.initialized) {

            this.events.on('outTime', () => {
                // Lose
            })
            this.initialized = true
        }

        AudioManager.Instance.initialize(this)
        
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })
        this.tileset = this.map.addTilesetImage('tiles')
        if (this.tileset !== null) {
            this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0)
            if (this.layer !== null) {
                this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
                this.cameras.main.setZoom(1.35)

                this.layer.setOrigin(0)
                this.layer.setCollisionByProperty({ collide: true })
            }
        }



        this.obstacles = this.add.group({
            classType: Obstacle,
            runChildUpdate: true,
        })

        this.enemies = this.add.group({
            classType: Enemy,
        })

        this.convertObjects()

        // collider layer and obstacles
        if (this.layer != undefined) {
            this.physics.add.collider(this.player, this.layer)
            this.physics.add.collider(
                this.player.getBullets(),
                this.layer,
                this.bulletHitLayer,
                undefined,
                this
            )
        }
        this.physics.add.collider(this.player, this.obstacles)

        // collider for bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles,
            undefined,
            this
        )

        this.enemies.children.each((enemy: Phaser.GameObjects.GameObject) => {
            this.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                this.playerBulletHitEnemy,
                undefined,
                this
            )

            this.physics.add.overlap(
                (<Enemy>enemy).getBullets(),
                this.player,
                this.enemyBulletHitPlayer,
                undefined
            )

            this.physics.add.collider(
                (<Enemy>enemy).getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                undefined
            )
            if (this.layer !== null) {
                this.physics.add.collider(
                    (<Enemy>enemy).getBullets(),
                    this.layer,
                    this.bulletHitLayer,
                    undefined,
                    this
                )
            }
            return true
        }, this)
        if (AudioManager.Instance.bgm === undefined) {
            AudioManager.Instance.bgm = this.sound.add('soundtrack')
        }
        AudioManager.Instance.playBGM(0.1, true)
        this.cameras.main.startFollow(this.player)
    }

    update(): void {
        this.player.update()

        this.enemies.children.each((enemy: Phaser.GameObjects.GameObject) => {

            enemy.update()
            if (this.player.active && enemy.active) {
                if (enemy.body !== null) {
                    const angle = Phaser.Math.Angle.Between(
                        (<Enemy>enemy).body.x,
                        (<Enemy>enemy).body.y,
                        this.player.body.x,
                        this.player.body.y
                    )

                        ; (<Enemy>enemy).getBarrel().angle =
                            (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
                }
            }
            return true
        }, this)

        if (this.enemies.getLength() == 0 || this.escKey.isDown) {
            AudioManager.Instance.stopAllSound()
            this.scene.stop('UIScene')
            this.scene.stop('GameScene')
            this.scene.start('GameOverScene', {score: (<HUD> this.scene.get('UIScene')).score })
        }
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects')?.objects as any[]

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue',
                })
            } else if (object.type === 'enemy') {
                const enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed',
                })

                this.enemies.add(enemy)
            } else {
                const obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type,
                })

                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer(
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        bullet.destroy()
    }

    private bulletHitObstacles(
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        obstacle: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        bullet.destroy()
    }

    private enemyBulletHitPlayer(
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        bullet.destroy()
            ; (<Player>player).updateHealth()
    }

    private playerBulletHitEnemy(
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        enemy: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ): void {
        bullet.destroy()
            ; (<Enemy>enemy).updateHealth()
    }
}
