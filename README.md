# Amap Railway Map / Digital Campaign Simulator 高德铁路地图 / 战役模拟器

![](./assets/screenshot1.jpg)
![](./assets/screenshot2.jpg)
![](./assets/screenshot3.jpg)

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
- `LMB` move(drag) symbol
- `MMB` delete symbol
- `RMB` select symbol
- `]` increase size of symbols(if not specified in symbol options)
- `[` decrease size of symbols(if not specified in symbol options)
- `\` reset size of symbols(if not specified in symbol options)

### Unit Spawn Shortcuts

- `f` toogle Friendly/Hostile
- `1` spawn a Motorized Infantry at mouse position
- `2` spawn a Mechanized Infantry at mouse position
- `3` spawn an Armor at mouse position
- `0` spawn an Infantry at mouse position

## Console `F12`

### Spawn a Unit

```ts
// method 1:
addUnit(
  syntax: String = "SFGPUCI-----",
  options,
  lnglat: [longitude: Number, latitude: Number] = <mouse position>
)

// example 1: spawn a Hostile Infantry at mouse position
addUnit("SHGPUCI-----");
// example 2: spawn a Friendly Infantry at (118.797466, 32.087265)
addUnit("SFGPUCI-----", undefined, [118.797466, 32.087265]);
// example 3:
addUnit("sfgpewrh--mt", {
  size: 35,
  quantity: 200,
  staffComments: "for reinforcements".toUpperCase(),
  additionalInformation: "added support for JJ".toUpperCase(),
  direction: (750 * 360) / 6400,
  type: "machine gun".toUpperCase(),
  dtg: "30140000ZSEP97",
  location: "0900000.0E570306.0N"
});

// method 2:
syntaxStore = "SFGPUCIM----"
// then press `v` to spawn a Friendly Motorized Infantry at mouse position
```

[options reference](https://www.spatialillusions.com/milsymbol/docs/index.html#mssymbolarg1-arg2--argn)   
[syntax reference](https://spatialillusions.com/unitgenerator/)

### Set All Symbols Size(if not specified in symbol options)

```ts
resize(size: Number = 35);
```

### Update Selected Symbol

```ts
// first select a symbol with right click, then:
selected.update(syntax, options, lnglat);

// example: add additionalInformation to selected Symbol
selected.update(undefined, { additionalInformation: 'Rout!' });
```

### Use Milsymbol API

```ts
// example: first select a symbol with right click, then:
selected.remember("symbol").getOptions();
```

[Milsymbol Documentation](https://www.spatialillusions.com/milsymbol/docs/index.html)
