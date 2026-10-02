import Enemy from '../entities/Enemy';

export default class WaveManager {
  private scene: Phaser.Scene;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private gridSize: number;
  private currentWave: number = 0;
  private enemiesToSpawn: number = 0;
  private spawnRate: number = 500;
  private lastSpawnTime: number = 0;
  private waveActive: boolean = false;

  constructor(scene: Phaser.Scene, enemyGroup: Phaser.Physics.Arcade.Group, gridSize: number) {
    this.scene = scene;
    this.enemyGroup = enemyGroup;
    this.gridSize = gridSize;
  }

  startNextWave() {
    this.currentWave++;
    this.enemiesToSpawn = 5 + this.currentWave * 2;
    this.spawnRate = Math.max(200, 500 - this.currentWave * 30);
    this.lastSpawnTime = this.scene.time.now;
    this.waveActive = true;
  }

  update() {
    if (!this.waveActive) return;

    const now = this.scene.time.now;
    if (now - this.lastSpawnTime > this.spawnRate && this.enemiesToSpawn > 0) {
      this.spawnEnemy();
      this.enemiesToSpawn--;
      this.lastSpawnTime = now;
    }

    if (this.enemiesToSpawn === 0 && this.enemyGroup.children.length === 0) {
      this.waveActive = false;
    }
  }

  private spawnEnemy() {
    const path = new Phaser.Curves.Path(50, 100);
    path.lineTo(300, 100);
    path.lineTo(300, 400);
    path.lineTo(700, 400);
    path.lineTo(700, 200);
    path.lineTo(900, 200);

    const enemy = new Enemy(this.scene, path);
    this.enemyGroup.add(enemy);
  }

  isComplete(): boolean {
    return !this.waveActive && this.enemyGroup.children.length === 0;
  }
}
