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
        const mouse = this.physics.add.sprite(
            width * 0.5,
            height * 0.5,
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).play(AnimationKeys.RocketMouseRun)

        // Colocamos colision al personaje
        const body = mouse.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)

        // Añadimos velocidad de movimiento en el eje X
        body.setVelocityX(200)

        // Colocamos las fisicas necesarias
        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER, height - 38 // width, height
        )

        // Hacemos que la camara siga a nuestro personaje
        this.cameras.main.startFollow(mouse)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
    }

}