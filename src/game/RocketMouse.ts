import Phaser from "phaser"

import TextureKeys from "../consts/TextureKey"
import AnimationKeys from "../consts/AnimationKey"

export default class RocketMouse extends Phaser.GameObjects.Container {

    private flames!: Phaser.GameObjects.Sprite
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        // Configuracion de los controles
        this.cursors = scene.input.keyboard.createCursorKeys()

        // Creacion del personaje
        const mouse = scene.add.sprite(
            0,
            0, // Ponemos y en el tope del suelo
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        ).setOrigin(1.75, 1) // Lo establecemos como pie
        .play(AnimationKeys.RocketMouseRun)

        this.flames = scene.add.sprite(
            -225,
            -25,
            TextureKeys.RocketMouse
        ).play(AnimationKeys.RocketFlaresOn)

            this.enableFlames(false)

        this.add(this.flames)
        this.add(mouse)

        // Añadimos fisicas al personaje
        scene.physics.add.existing(this)
        
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(mouse.width, mouse.height)
        body.setOffset(mouse.width * -1.75, -mouse.height)
    }

    preUpdate () {
        const body = this.body as Phaser.Physics.Arcade.Body

        if (this.cursors.space?.isDown) {
            body.setAccelerationY(-600)
            this.enableFlames(true)
        } else {
            body.setAccelerationY(0)
            this.enableFlames(false)
        }
    }

    enableFlames (enabled: boolean) {
        this.flames.setVisible(enabled)
    }

}