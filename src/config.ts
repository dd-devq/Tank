import HUD from './scenes/HUD-scene'
import { BootScene } from './scenes/boot-scene'
import { GameScene } from './scenes/game-scene'
import { MenuScene } from './scenes/menu-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    version: '2.0',
    width: window.innerWidth,
    height: window.innerHeight,
    // zoom: 0.75,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, MenuScene, GameScene, HUD],
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
    render: { pixelArt: false, antialias: true },
}
