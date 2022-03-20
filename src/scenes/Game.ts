import Phaser from "phaser"
import TextureKeys from "../consts/TextureKey"
import SceneKeys from "../consts/SceneKey"
import AnimationKeys from "../consts/AnimationKey"

export default class Game extends Phaser.Scene {

    // Creamos la clase del background
    private background!: Phaser.GameObjects.TileSprite
    // Creamos la clase para la decoracion
    private mouseHole!: Phaser.GameObjects.Image

    constructor () {
        super(SceneKeys.Game)
    }

    create () {

        // Medidas de la ventana
        const width = this.scale.width
        const height = this.scale.height

        
        //this.add.image(0, 0, 'background').setOrigin(0, 0)
        // Estructura para poner una imagen que repita de manera automatica el tamaño de la ventana
        this.background = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0)
        .setScrollFactor(0, 0) // Habilita el scroll infinito del fondo
        // Añadimos la decoración del background
        this.mouseHole = this.add.image(
            Phaser.Math.Between(900, 1500), // x value
            501, // y value
            TextureKeys.MouseHole
        )
        
        // Creacion del personaje
        const mouse = this.physics.add.sprite(
            width * 0.5,
            height - 30, // Ponemos y en el tope del suelo
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).setOrigin(0.5, 1) // Lo establecemos como pie
        .play(AnimationKeys.RocketMouseRun)

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

    update(time: number, delta: number): void {
        this.background.setTilePosition(this.cameras.main.scrollX)

        this.wrapMouseHole()
    }

    private wrapMouseHole () {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if (this.mouseHole.x + this.mouseHole.width < scrollX) {
            
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            )

        }
    }

}