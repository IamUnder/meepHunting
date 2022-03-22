import Phaser, { Scene } from "phaser"

import TextureKeys from "../consts/TextureKey"

export default class LaserObstacle extends Phaser.GameObjects.Container {

    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Creamos un top
        const top = scene.add.image(0, 0, TextureKeys.LaserEnd).setOrigin(0.5, 0)

        // Creamos un medio 
        const middle = scene.add.image(
            0,
            top.y + top.displayHeight,
            TextureKeys.LaserMiddle
        ).setOrigin(0.5, 0)

        // Configuramos tamaño
        middle.setDisplaySize(middle.width, 200)

        // Creamos un fondo
        const bottom = scene.add.image(
            0,
            middle.y + middle.displayHeight,
            TextureKeys.LaserEnd
        ).setOrigin(0.5, 0)
        .setFlipY(true)

        // Añadimos al container
        this.add(top)
        this.add(middle)
        this.add(bottom)

    }


}