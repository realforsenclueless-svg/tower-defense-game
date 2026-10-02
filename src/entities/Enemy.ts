import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public health: number = 20;
  public maxHealth: number = 20;
  public speed: number = 80;
  public goldValue: number = 10;
  public scoreValue: number = 10;
  private path: Phaser.Curves.Path;
  private followedPathDistance: number = 0;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, path: Phaser.Curves.Path) {
    super(scene, 0, 0, '');
    this.scene = scene;
    this.path = path;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.drawEnemy();
    this.setPosition(...this.path.getStartPoint(new Phaser.Math.Vector2()).toArray());
  }

  private drawEnemy() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff4444, 1);
    graphics.fillCircle(8, 8, 6);
    graphics.strokeStyle(0xff0000, 1.5);
    graphics.strokeCircleShape(new Phaser.Geom.Circle(8, 8, 6));

    const texture = graphics.generateTexture('enemy', 16, 16);
    graphics.destroy();

    this.setTexture('enemy');
    this.setDisplaySize(16, 16);
  }

  update() {
    this.followedPathDistance += this.speed * (this.scene.game.loop.delta / 1000);
    const point = this.path.getPoint(this.followedPathDistance / this.path.getLength());
    this.setPosition(point.x, point.y);

    if (this.followedPathDistance >= this.path.getLength()) {
      this.destroy();
      const gameScene = this.scene.scene.get('GameScene') as any;
      gameScene.player.takeDamage(10);
    }
  }

  takeDamage(amount: number) {
    this.health -= amount;
  }
}
