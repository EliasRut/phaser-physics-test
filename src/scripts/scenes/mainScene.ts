import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Block from '../objects/block'

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'MainScene' })
  }

  blocks: Phaser.Physics.Arcade.Group;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  create() {
    const logo = new PhaserLogo(this, this.cameras.main.width / 4, 0)
 
    this.fpsText = new FpsText(this)

    this.blocks = this.physics.add.group({
        bounceY: 0.2,
        bounceX: 0.2,
        collideWorldBounds: true,
        velocityX: 0,
        velocityY: 0
    });


    this.physics.add.collider(this.blocks, this.blocks);

    this.physics.add.collider(logo, this.blocks, (projectile, target) => {
      const blockTarget = target as Block;
      const damage = Math.abs(projectile.body.velocity.x) + Math.abs(projectile.body.velocity.y);
      blockTarget.health = Math.max(0, blockTarget.health - damage);
    });
    // this.physics.add.collider(logo, this.block2, (projectile, target) => {
    //   const blockTarget = target as Block;
    //   const damage = Math.abs(projectile.body.velocity.x) + Math.abs(projectile.body.velocity.y);
    //   blockTarget.health = Math.max(0, blockTarget.health - damage);

    // });
    // this.physics.add.collider(this.block1, this.block2);

    const particles = this.add.particles('block');

    this.emitter = particles.createEmitter({
        speed: 300,
        lifespan: 800,
        alpha: 1,
        angle: {
            onEmit: function (particle, key, t, value)
            {
                var v = Phaser.Math.Between(-180, 180);
                return v;
            }
        },
        scale: { start: 0.5, end: 0 },
    } as any);

    this.input.setDraggable(logo);

    this.input.on('dragstart', function (pointer, obj)
    {
        obj.body.moves = false;
    });


    this.input.on('dragend', function (pointer, obj)
    {
        obj.body.moves = true;
    });

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)
  }

  update() {
    if (this.blocks.getLength() < 40 && Math.random() < 0.01) {
      const spawnMetal = Math.random() < 0.2;
      if (spawnMetal) {
        const block = new Block(this, this.cameras.main.width * Math.random(), 0, true);
        block.body.mass = 3;
        this.blocks.add(block);
      } else {
        const block = new Block(this, this.cameras.main.width * Math.random(), 0, false);
        block.body.mass = 1;
        this.blocks.add(block);
      }
    }
    this.fpsText.update();
    const blockLength = this.blocks.getLength();
  //  this.block1 = new Block(this, this.cameras.main.width - 150, this.cameras.main.height - 200);
  //   this.block2 = new Block(this, this.cameras.main.width - 150, this.cameras.main.height);
    const blocks = this.blocks.getChildren() as Array<Block>;
    blocks.forEach((block: Block) => {
      if (block.health <= 0) {
        this.emitter.explode(10, block.x, block.y);
        block.destroy();
      } else {
        block.update();
      }
    })
    
  //   if (this.block1 && this.block1.health <= 0) {
  //     this.block1.destroy();
  //   } else {
  //     this.block1?.update();
  //   }
  //   if (this.block2 && this.block2.health <= 0) {
  //     this.block2.destroy();
  //   } else {
  //     this.block2?.update();
  //   }
  }
}
