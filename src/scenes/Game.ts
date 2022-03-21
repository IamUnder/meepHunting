import Phaser from "phaser"
import TextureKeys from "../consts/TextureKey"
import SceneKeys from "../consts/SceneKey"
import AnimationKeys from "../consts/AnimationKey"

export default class Game extends Phaser.Scene {

    // Creamos la clase del background
    private background!: Phaser.GameObjects.TileSprite
    // Creamos la clase para la decoracion
    private mouseHole!: Phaser.GameObjects.Image
    private window1!: Phaser.GameObjects.Image
    private window2!: Phaser.GameObjects.Image

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

        this.window1 = this.add.image(
            Phaser.Math.Between(900, 1300),
            200,
            TextureKeys.Window1
        )

        this.window2 = this.add.image(
            Phaser.Math.Between(1600, 2000),
            200,
            TextureKeys.Window2
        )

        
        // Creacion del personaje
        const mouse = this.physics.add.sprite(
            width  - 100,
            height - 30, // Ponemos y en el tope del suelo
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).setOrigin(1.75, 1) // Lo establecemos como pie
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

    // Funcion de actualizacion de ventana
    update(time: number, delta: number): void {
        this.background.setTilePosition(this.cameras.main.scrollX)

        this.wrapMouseHole()
        this.wrapWindows()
    }

    // Funcion para recalcular la posicion del agujero
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

    // Funcion para recalcular la funcion de la ventana
    private wrapWindows () {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let width = this.window1.width * 2
        if (this.window1.x + width < scrollX) {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )
        }

        width = this.window2.width
        if (this.window2.x + width < scrollX) {
            this.window2.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )
        }


    }
}