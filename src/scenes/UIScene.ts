import Phaser from 'phaser';
import Player from '../entities/Player';

export default class UIScene extends Phaser.Scene {
  private goldText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private healthText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;
  private selectedTowerText!: Phaser.GameObjects.Text;

  constructor() {
    super('UIScene');
  }

  create() {
    const gameScene = this.scene.get('GameScene');

    // UI Background
    const bg = this.add.rectangle(0, 0, this.scale.width, 60, 0x1a1a1a, 0.9);
    bg.setOrigin(0, 0);
    bg.setScrollFactor(0);

    // Texts
    this.goldText = this.add.text(20, 15, 'Gold: 200', {
      fontSize: '18px',
      color: '#ffd700',
      fontFamily: 'Arial',
    });
    this.goldText.setScrollFactor(0);

    this.scoreText = this.add.text(200, 15, 'Score: 0', {
      fontSize: '18px',
      color: '#00ff00',
      fontFamily: 'Arial',
    });
    this.scoreText.setScrollFactor(0);

    this.healthText = this.add.text(400, 15, 'Health: 100', {
      fontSize: '18px',
      color: '#ff4444',
      fontFamily: 'Arial',
    });
    this.healthText.setScrollFactor(0);

    this.waveText = this.add.text(600, 15, 'Wave: 1', {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
    });
    this.waveText.setScrollFactor(0);

    this.selectedTowerText = this.add.text(this.scale.width - 300, 15, '', {
      fontSize: '16px',
      color: '#ffaaff',
      fontFamily: 'Arial',
    });
    this.selectedTowerText.setScrollFactor(0);

    // Listen to game events
    gameScene.events.on('playerUpdate', (player: Player) => {
      this.goldText.setText(`Gold: ${player.gold}`);
      this.scoreText.setText(`Score: ${player.score}`);
      this.healthText.setText(`Health: ${player.health}`);
    });

    gameScene.events.on('towerSelected', (tower: any) => {
      this.selectedTowerText.setText(`Tower Lvl: ${tower.level}`);
    });
  }
}
