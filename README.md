# Amap Railway Map / Digital Campaign Simulator  高德铁路地图 / 战役模拟器

![](./assets/screenshot1.jpg)
![](./assets/screenshot2.jpg)

## Control

- `w` move up
- `a` move left
- `s` move down
- `d` move right
- `g` game mode
- `b` spawn Friendly Infantry at mouse position
- `l` load last saved game
- `;` save game(info displayed in console `F12`)
- `z` toogle NATO symbol z-index
- `RMB` delete symbol
- `LMB` move(drag) symbol
- `]` increase size of symbols
- `[` decrease size of symbols
- `\` reset size of symbols

## Console `F12`

```ts
addUnit(syntax: String = "SFGPUCI-----", lnglat: [lng: Number, lat: Number] = <mouse position>)
// example: spawn a Friendly Infantry at mouse position
addUnit("SFGPUCI-----");
```

[syntax reference](https://spatialillusions.com/unitgenerator/)