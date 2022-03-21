import Phaser from "phaser"

import TextureKeys from "../consts/TextureKey"
import AnimationKeys from "../consts/AnimationKey"

export default class RocketMouse extends Phaser.GameObjects.Container {

    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Creacion del personaje
        const mouse = scene.add.sprite(
            0,
            0, // Ponemos y en el tope del suelo
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).setOrigin(1.75, 1) // Lo establecemos como pie
        .play(AnimationKeys.RocketMouseRun)

        this.add(mouse)

        // Añadimos fisicas al personaje
        scene.physics.add.existing(this)
        
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(mouse.width, mouse.height)
        body.setOffset(mouse.width * -1.75, -mouse.height)
    }

}