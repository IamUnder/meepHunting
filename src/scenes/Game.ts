import Phaser from "phaser"
import TextureKeys from "../consts/TextureKey"
import SceneKeys from "../consts/SceneKey"
import AnimationKeys from "../consts/AnimationKey"

export default class Game extends Phaser.Scene {

    constructor () {
        super(SceneKeys.Game)
    }

    create () {

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
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).play(AnimationKeys.RocketMouseRun)
    }

}