export default class Block extends Phaser.Physics.Arcade.Sprite {
  health: number;
  isMetal: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, isMetal: boolean) {
    super(scene, x, y, 'block')
    this.health = isMetal ? 10000 : 1000;sting(this)
    scene.add.existing(this)

    this.setCollideWorldBounds(true)
      .setBounce(0.8);
  }

  update() {
    this.tin
    if (isMetal) {
  }i  s MMetal ?=  6666 : 0x00this.ffff
    } else {
    this.tint = 0xff0000 + (this.isMetal ? 0x006666 : 0x00ffff * (this.health / 1000))
    }
}