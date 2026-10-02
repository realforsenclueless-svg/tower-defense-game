import Tower from '../entities/Tower';

export default class TowerManager {
  private scene: Phaser.Scene;
  private towerGroup: Phaser.Physics.Arcade.Group;
  private gridSize: number;
  private towers: Map<string, typeof Tower> = new Map();

  constructor(scene: Phaser.Scene, towerGroup: Phaser.Physics.Arcade.Group, gridSize: number) {
    this.scene = scene;
    this.towerGroup = towerGroup;
    this.gridSize = gridSize;
    this.registerTowerTypes();
  }

  private registerTowerTypes() {
    this.towers.set('basic', Tower);
  }

  createTower(x: number, y: number, type: string): Tower | null {
    const TowerClass = this.towers.get(type);
    if (!TowerClass) return null;

    const tower = new Tower(this.scene, x, y);
    this.towerGroup.add(tower);
    return tower;
  }
}
