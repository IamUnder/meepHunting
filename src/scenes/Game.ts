import Phaser from "phaser"
import TextureKeys from "../consts/TextureKey"
import SceneKeys from "../consts/SceneKey"
import RocketMouse from "../game/RocketMouse"
import LaserObstacle from "../game/LaserObstacle"

export default class Game extends Phaser.Scene {

    // Creamos la clase del background
    private background!: Phaser.GameObjects.TileSprite
    // Clase del personake
    private mouseHole!: Phaser.GameObjects.Image
    // Creamos la clase para la decoracion
    private window1!: Phaser.GameObjects.Image
    private window2!: Phaser.GameObjects.Image
    private bookcase1!: Phaser.GameObjects.Image
    private bookcase2!: Phaser.GameObjects.Image
    // Clase para los obstaculos
    private laserObstacle!: LaserObstacle
    // Clases para evitar el overlapping
    private windows: Phaser.GameObjects.Image[] = []
    private bookcases: Phaser.GameObjects.Image[] = []

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

        this.bookcase1 = this.add.image(
            Phaser.Math.Between(2200, 2700),
            580,
            TextureKeys.Bookcase1
        ).setOrigin(0.5, 1)

        this.bookcase2 = this.add.image(
            Phaser.Math.Between(2900, 3400),
            580,
            TextureKeys.Bookcase2
        ).setOrigin(0.5, 1)

        // Inicializamos los array
        this.windows = [this.window1, this.window2]
        this.bookcases = [this.bookcase1, this.bookcase2]

        // Creacion de los obstaculos
        this.laserObstacle = new LaserObstacle(this, 900, 100)
        this.add.existing(this.laserObstacle)

        // Creacion del personaje
        const mouse = new RocketMouse(this, width * 0.5, height - 30)
        this.add.existing(mouse)

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

        // Overlappin entre personaje y obstaculo
        this.physics.add.overlap(
            this.laserObstacle,
            mouse,
            this.hadleOverlapLaser,
            undefined,
            this
        )
    }

    // Funcion de actualizacion de ventana
    update(time: number, delta: number): void {
        
        this.wrapMouseHole()
        this.wrapWindows()
        this.wrapBookcase()
        this.wrapLaserObstacle()

        this.background.setTilePosition(this.cameras.main.scrollX)
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

    // Funcion para recalcular la posicion de la ventana
    private wrapWindows () {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let width = this.window1.width * 2
        if (this.window1.x + width < scrollX) {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )

            const overlap = this.bookcases.find(bc => {
                return Math.abs(this.window1.x - bc.x) <= this.window1.width
            })

            this.window1.visible = !overlap
        }

        width = this.window2.width
        if (this.window2.x + width < scrollX) {
            this.window2.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )

            const overlap = this.bookcases.find(bc => {
                return Math.abs(this.window2.x - bc.x) <= this.window2.width
            })

            this.window2.visible = !overlap
        }

    }

    // Funcion para recalcular la posicion de la libreria
    private wrapBookcase () {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let width = this.bookcase1.width * 2
        if (this.bookcase1.x + width < scrollX ) {
            this.bookcase1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )

            const overlap = this.windows.find(win => {
                return Math.abs(this.bookcase1.x - win.x) <= win.width
            })

            this.bookcase1.visible = !overlap
        }

        width = this.bookcase2.width
        if (this.bookcase2.x + width < scrollX) {
            this.bookcase2.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )
    
            const overlap = this.windows.find(win => {
                return Math.abs(this.bookcase2.x - win.x) <= win.width
            })

            this.bookcase2.visible = !overlap
        }
    }

    // Funcion para la repeteticion de obstaculos
    private wrapLaserObstacle () {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody    

        const width = body.width
        if (this.laserObstacle.x + width < scrollX) {
            this.laserObstacle.x = Phaser.Math.Between(
                rightEdge + 800,
                rightEdge + width + 1000
            )

            this.laserObstacle.y = Phaser.Math.Between(0, 300)

            body.position.x = this.laserObstacle.x + body.offset.x
            body.position.y = this.laserObstacle.y
        }
    }

    private hadleOverlapLaser (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        console.log('overlap!!!!!');
    }
}