import Phaser from "phaser"
import TextureKeys from "../consts/TextureKey"
import SceneKeys from "../consts/SceneKey"
import AnimationKeys from "../consts/AnimationKey"

export default class Preloader extends Phaser.Scene {

    constructor () {
        super(SceneKeys.Preloader)
    }

    preload () {
        // Carga del fondo
        this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')

        // Carga de decoracion del background
        this.load.image(TextureKeys.MouseHole, 'house/object_mousehole.png') // Agujero 
        this.load.image(TextureKeys.Window1, 'house/object_window1.png') // ventana 1
        this.load.image(TextureKeys.Window2, 'house/object_window2.png') // ventana 2
        this.load.image(TextureKeys.Bookcase1, 'house/object_bookcase1.png') // libreria 1
        this.load.image(TextureKeys.Bookcase2, 'house/object_bookcase2.png') // libreria 2

        // Carga del personaje
        this.load.atlas(
            TextureKeys.RocketMouse,
            'characters/rocket-mouse.png',
            'characters/rocket-mouse.json'
        )
    }

    create () {

        // Animacion del personaje de correr
        this.anims.create({
            key: AnimationKeys.RocketMouseRun, // Nombre de la animacion
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

        this.scene.start(SceneKeys.Game)
    }

}