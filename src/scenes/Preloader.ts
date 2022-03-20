import Phaser from "phaser"

export default class Preloader extends Phaser.Scene {

    constructor () {
        super('preloader')
    }

    preload () {
        // Carga del fondo
        this.load.image('background', 'house/bg_repeat_340x640.png')

        // Carga del personaje
        this.load.atlas(
            'rocket-mouse',
            'characters/rocket-mouse.png',
            'characters/rocket-mouse.json'
        )
    }

    create () {
        this.scene.start('game')
    }

}