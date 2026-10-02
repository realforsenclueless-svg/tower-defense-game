export default class Player {
  public gold: number = 200;
  public health: number = 100;
  public score: number = 0;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
  }

  addGold(amount: number) {
    this.gold += amount;
  }

  spendGold(amount: number) {
    if (this.gold >= amount) {
      this.gold -= amount;
      return true;
    }
    return false;
  }

  addScore(amount: number) {
    this.score += amount;
  }

  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      this.scene.scene.stop('GameScene');
      this.scene.scene.stop('UIScene');
      // Restart or game over logic
    }
  }
}
