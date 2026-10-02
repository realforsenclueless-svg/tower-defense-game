# Tower Defense - Minimalist

A sleek, minimalist tower defense game built with Phaser 3 and TypeScript.

## Features

- 🎮 **Tower Placement**: Click to place towers on a grid
- 🎯 **Auto Targeting**: Towers automatically fire at nearby enemies
- 🌊 **Wave System**: Progressive difficulty with each wave
- 💰 **Economy System**: Earn gold from defeated enemies to buy more towers
- 📊 **Score Tracking**: Accumulate points and track your performance
- 🎨 **Minimalist Art**: Clean, neon-inspired visuals
- 📱 **Mobile Responsive**: Scales to any screen size

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Game will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Game Mechanics

- **Gold**: Start with 200 gold. Towers cost 100 each.
- **Health**: Start with 100 health. Lose health when enemies escape.
- **Enemies**: Progress through waves with increasing difficulty.
- **Upgrades**: Click towers to upgrade them and increase their power.

## Architecture

- `src/scenes/` - Phaser scenes (game logic and UI)
- `src/entities/` - Game objects (Player, Tower, Enemy, Projectile)
- `src/systems/` - Game systems (WaveManager, TowerManager)

## Tech Stack

- **Phaser 3** - Game framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Canvas 2D** - Graphics rendering

## License

MIT
