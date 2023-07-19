export class AudioManager {
    private static instance: AudioManager
    private isMuted = false
    private scene: Phaser.Scene

    public bgm: Phaser.Sound.BaseSound

    public initialize(scene: Phaser.Scene): void {
        this.scene = scene
    }

    static get Instance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager()
        }

        return AudioManager.instance
    }

    get IsMuted(): boolean {
        return this.isMuted
    }

    set IsMute(isMuted: boolean) {
        this.isMuted = isMuted
        if (this.isMuted) {
            this.stopBGM()
            this.stopAllSoundFX()
        }
    }

    public playSoundFX(audioKey: string, volume = 1, isLoop = false): void {
        if (this.isMuted) {
            return
        }
        this.scene.sound.add(audioKey, { volume: volume, loop: isLoop })
        this.scene.sound.play(audioKey)
    }

    public stopSoundFX(audioKey: string): void {
        const audioList = this.scene.sound.getAllPlaying()
        audioList.forEach((audio) => {
            if (audio.key === audioKey) {
                audio.stop()
            }
        })
    }

    public stopAllSoundFX(): void {
        const audioList = this.scene.sound.getAllPlaying()
        audioList.forEach((audio) => {
            audio.stop()
        })
    }

    public playBGM(volume = 1, isLoop = false) {
        if (this.isMuted) {
            return
        }
        this.bgm.play({ volume: volume, loop: isLoop })
    }

    public stopBGM() {
        this.bgm.stop()
    }

    public resumeBGM() {
        if (this.isMuted) {
            return
        }
        this.bgm.resume()
    }

    public pauseBGM() {
        this.bgm.pause()
    }
}
