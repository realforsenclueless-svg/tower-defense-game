import Phaser from 'phaser';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  public damage: number = 10;
  private target: any = null;
  private speed: number = 300;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, '');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.drawProjectile();
  }

  private drawProjectile() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffff44, 1);
    graphics.fillCircle(4, 4, 3);

    const texture = graphics.generateTexture('projectile', 8, 8);
    graphics.destroy();

    this.setTexture('projectile');
    this.setDisplaySize(8, 8);
  }

  fire(target: any, damage: number) {
    this.target = target;
    this.damage = damage;
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(this.x, this.y);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (!this.target || !this.target.active) {
      this.setActive(false);
      this.setVisible(false);
      return;
    }

    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
    this.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
  }

  hit(enemy: any) {
    enemy.takeDamage(this.damage);
    this.setActive(false);
    this.setVisible(false);
  }
}
