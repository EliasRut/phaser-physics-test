export default class Block extends Phaser.Physics.Arcade.Sprite {
  health: number;
  isMetal: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, isMetal: boolean) {
    super(scene, x, y, 'block')
    this.health = isMetal ? 10000 : 1000;
    this.isMetal = isMetal;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true).setBounce(0.8);
  }

  update() {
    if (this.isMetal) {
      this.tint = 0xaa0000 + (0x00aaaa * (this.health / 10000));
    } else {
      this.tint = 0xff0000 + (0x00ffff * (this.health / 1000));
    }
  }
}
