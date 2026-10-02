import Phaser from 'phaser';
import Player from '../entities/Player';
import Tower from '../entities/Tower';
import Enemy from '../entities/Enemy';
import Projectile from '../entities/Projectile';
import WaveManager from '../systems/WaveManager';
import TowerManager from '../systems/TowerManager';

export default class GameScene extends Phaser.Scene {
  private player!: Player;
  private towers!: Phaser.Physics.Arcade.Group;
  private enemies!: Phaser.Physics.Arcade.Group;
  private projectiles!: Phaser.Physics.Arcade.Group;
  private waveManager!: WaveManager;
  private towerManager!: TowerManager;
  private selectedTower: Tower | null = null;
  private gridSize = 32;
  private gridGraphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super('GameScene');
  }

  create() {
    // Initialize groups
    this.towers = this.physics.add.group({ classType: Tower });
    this.enemies = this.physics.add.group({ classType: Enemy });
    this.projectiles = this.physics.add.group({ classType: Projectile });

    // Initialize player
    this.player = new Player(this, 1000, 700);
    this.events.emit('playerUpdate', this.player);

    // Initialize managers
    this.waveManager = new WaveManager(this, this.enemies, this.gridSize);
    this.towerManager = new TowerManager(this, this.towers, this.gridSize);

    // Draw grid
    this.drawGrid();

    // Input handling
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.handleClick(pointer.x, pointer.y);
    });

    // Collisions
    this.physics.add.overlap(this.projectiles, this.enemies, (projectile: any, enemy: any) => {
      projectile.hit(enemy);
    });

    // Start first wave
    this.waveManager.startNextWave();
  }

  update() {
    // Update tower targeting
    this.towers.children.forEach((tower: any) => {
      tower.update(this.enemies, this.projectiles);
    });

    // Check for defeated enemies
    this.enemies.children.forEach((enemy: any) => {
      if (enemy.health <= 0) {
        this.player.addGold(enemy.goldValue);
        this.player.addScore(enemy.scoreValue);
        enemy.destroy();
      }
    });

    // Check game over
    if (this.enemies.children.length === 0 && this.waveManager.isComplete()) {
      this.waveManager.startNextWave();
    }

    // Emit player update
    this.events.emit('playerUpdate', this.player);
  }

  private handleClick(x: number, y: number) {
    const gridX = Math.floor(x / this.gridSize) * this.gridSize;
    const gridY = Math.floor(y / this.gridSize) * this.gridSize;

    // Check if tower already exists at this position
    const existing = this.towers.children.find(
      (tower: any) => tower.x === gridX + this.gridSize / 2 && tower.y === gridY + this.gridSize / 2
    );

    if (existing) {
      this.selectedTower = existing;
      this.events.emit('towerSelected', existing);
      return;
    }

    // Try to place a new tower
    if (this.player.gold >= 100) {
      const tower = this.towerManager.createTower(gridX + this.gridSize / 2, gridY + this.gridSize / 2, 'basic');
      if (tower) {
        this.player.spendGold(100);
        this.selectedTower = tower;
        this.events.emit('towerSelected', tower);
      }
    }
  }

  private drawGrid() {
    this.gridGraphics = this.add.graphics();
    this.gridGraphics.lineStyle(1, 0x333333, 0.3);

    const width = this.scale.width;
    const height = this.scale.height;

    for (let x = 0; x < width; x += this.gridSize) {
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, height);
    }

    for (let y = 0; y < height; y += this.gridSize) {
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(width, y);
    }

    this.gridGraphics.strokePath();
  }
}
