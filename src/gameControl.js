let gameMode = false;
let toogleZIndex = true;
let intervals = { w: null, a: null, s: null, d: null };
const interval = 100;
let width = 60;
let syntaxStore = "SFGPUCI-----";

const coordinates = {
  w: [0, 100],
  a: [100, 0],
  s: [0, -100],
  d: [-100, 0]
};

const keyHandler = e => {
  if (["w", "a", "s", "d"].includes(e.key)) {
    map.panBy(...coordinates[e.key]);
    intervals[e.key] = setInterval(() => {
      map.panBy(...coordinates[e.key]);
    }, interval);
    document.onkeydown = null;
  }
};

document.onkeydown = keyHandler;

document.onkeyup = async e => {
  switch (e.key) {
    case "g":
      gameMode = !gameMode;
      if (gameMode) {
        map.setMapStyle("amap://styles/aebe189d2072666f6fccc6c2d4946af7");
      } else {
        map.setMapStyle("amap://styles/ab8e6d6ef2ba3500d70346b36f66dba2");
      }
      break;
    case "b":
      addUnit();
      break;
    case "r":
      addUnit("SHGPUCI-----");
      break;
    case "v":
      addUnit(syntaxStore);
      break;
    case ";":
      const store = images.map(image => image._memory);
      await localforage.setItem("store", store);
      await localforage.setItem("width", width);
      console.log("Game Saved");
      break;
    case "l":
      width = await localforage.getItem("width");
      const data = await localforage.getItem("store");
      data.forEach(item => {
        addUnit(item.syntax, item.lnglat);
      });
      break;
    case "z":
      toogleZIndex = !toogleZIndex;
      customLayer.setzIndex(toogleZIndex ? 300 : 10);
      break;
    case "]":
      width *= 1.2;
      onRender();
      break;
    case "[":
      width *= 0.8;
      onRender();
      break;
    case "\\":
      width = 60;
      onRender();
      break;
    default:
      // w, a, s, d
      clearInterval(intervals[e.key]);
      document.onkeydown = keyHandler;
      break;
  }
};

// var combokeys = new Combokeys(document);
