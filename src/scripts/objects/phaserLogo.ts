export default class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'phaser-logo')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
      .setBounce(0.8)
      .setInteractive()

      .on('dragend', (pointer) => {
        const deltaX = pointer.upX - pointer.downX;
        const deltaY = pointer.upY - pointer.downY;
        this.setVelocity(-deltaX * 2, -deltaY * 2);
      })
  }
}
