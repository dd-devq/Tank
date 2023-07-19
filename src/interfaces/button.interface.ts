export interface IButtonConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string[],
    textContent:string | undefined
}

export interface IButtonCallbackConfig {
    POINTER_OVER: {
        isActive: boolean,
        callback: ()=> void
    },
    POINTER_DOWN: {
        isActive: boolean,
        callback: ()=> void
    },
    POINTER_OUT: {
        isActive: boolean,
        callback: ()=> void
    },
    POINTER_UP: {
        isActive: boolean,
        callback: ()=> void
    },   
}