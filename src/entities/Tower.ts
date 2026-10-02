import Phaser from 'phaser';
import Projectile from './Projectile';

export default class Tower extends Phaser.Physics.Arcade.Sprite {
  public level: number = 1;
  public range: number = 150;
  public fireRate: number = 1000;
  public damage: number = 10;
  private lastFired: number = 0;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Draw tower as a circle
    this.drawTower();
  }

  private drawTower() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x4488ff, 1);
    graphics.fillCircle(16, 16, 12);
    graphics.strokeStyle(0x2255ff, 2);
    graphics.strokeCircleShape(new Phaser.Geom.Circle(16, 16, 12));

    const texture = graphics.generateTexture('tower', 32, 32);
    graphics.destroy();

    this.setTexture('tower');
    this.setDisplaySize(24, 24);
  }

  update(enemies: Phaser.Physics.Arcade.Group, projectiles: Phaser.Physics.Arcade.Group) {
    const now = this.scene.time.now;
    if (now - this.lastFired < this.fireRate) return;

    // Find closest enemy in range
    let target: any = null;
    let minDistance = this.range;

    enemies.children.forEach((enemy: any) => {
      const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
      if (distance < minDistance) {
        minDistance = distance;
        target = enemy;
      }
    });

    if (target) {
      this.fire(target, projectiles);
      this.lastFired = now;
    }
  }

  private fire(target: any, projectiles: Phaser.Physics.Arcade.Group) {
    const projectile = projectiles.get(this.x, this.y, '') as Projectile;
    if (projectile) {
      projectile.fire(target, this.damage);
    }
  }

  upgrade() {
    if (this.level < 3) {
      this.level++;
      this.damage += 5;
      this.fireRate = Math.max(300, this.fireRate - 100);
      this.range += 20;
    }
  }
}
