import HUD from './scenes/HUD-scene'
import { BootScene } from './scenes/boot-scene'
import GameOver from './scenes/game-over-scene'
import { GameScene } from './scenes/game-scene'
import { MenuScene } from './scenes/menu-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    version: '2.0',
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, MenuScene, GameScene, HUD, GameOver],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    backgroundColor: '#000000',
    render: { pixelArt: true, antialias: true },
}
