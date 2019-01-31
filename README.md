# Amap Railway Map / Digital Campaign Simulator 高德铁路地图 / 战役模拟器

![](./assets/screenshot1.jpg)
![](./assets/screenshot2.jpg)

## Control

### Basic

- `w` move up
- `a` move left
- `s` move down
- `d` move right
- `g` game mode (Display Cities and Strategic Railways only)
- `b` spawn a Friendly Infantry at mouse position
- `r` spawn a Hostile Infantry at mouse position
- `v` duplicate last spawned unit at mouse position
- `l` load last saved game
- `;` save game(info displayed in console `F12`)
- `z` change NATO symbol z-index
- `RMB` delete symbol
- `LMB` move(drag) symbol
- `]` increase size of symbols
- `[` decrease size of symbols
- `\` reset size of symbols

### Unit Spawn Shortcuts

- `F` toogle Friendly/Hostile
- `1` spawn a Motorized Infantry at mouse position
- `2` spawn a Mechanized Infantry at mouse position
- `3` spawn an Armor at mouse position
- `0` spawn an Infantry at mouse position

## Console `F12`

### Spawn a Unit

```ts
// method 1:
addUnit(syntax: String = "SFGPUCI-----", lnglat: [longitude: Number, latitude: Number] = <mouse position>)

// example 1: spawn a Hostile Infantry at mouse position
addUnit("SHGPUCI-----");
// example 2: spawn a Friendly Infantry at (118.797466, 32.087265)
addUnit("SFGPUCI-----", [118.797466, 32.087265]);

// method 2:
syntaxStore = "SFGPUCIM----"
// then press `v` to spawn a Friendly Motorized Infantry at mouse position
```

[syntax reference](https://spatialillusions.com/unitgenerator/)

### Set Symbols Size

```ts
width = 60; // (pixel)
onRender();
```
