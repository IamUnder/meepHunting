import Phaser from "phaser"

export default class Game extends Phaser.Scene {

    constructor () {
        super('game')
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

        // Animacion del personaje de correr
        this.anims.create({
            key: 'rocket_mouse_run', // Nombre de la animacion
            frames: this.anims.generateFrameNames('rocket-mouse',{
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1 // -1 es loop infinito
        })

        // Medidas de la ventana
        const width = this.scale.width
        const height = this.scale.height

        
        //this.add.image(0, 0, 'background').setOrigin(0, 0)
        // Estructura para poner una imagen que repita de manera automatica el tamaño de la ventana
        this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0)
        
        
        // Creacion del personaje
        this.add.sprite(
            width * 0.5,
            height * 0.5,
            'rocket-mouse', // Key del atlas declarado mas arriba
            'rocketmouse_fly01.png'
        ).play('rocket_mouse_run')
    }

}