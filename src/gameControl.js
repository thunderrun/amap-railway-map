let gameMode = false;
let toogleZIndex = true;
let intervals = { w: null, a: null, s: null, d: null };
const interval = 100;
let size = 35;
let syntaxStore = "SFGPUCI-----";
let friendly = true;

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
        document.title = "Digital Campaign Simulator";
        map.setMapStyle("amap://styles/aebe189d2072666f6fccc6c2d4946af7");
      } else {
        document.title = "Amap Railyway Map";
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
      await localforage.setItem("size", size);
      console.log("Game Saved");
      break;
    case "l":
      size = await localforage.getItem("size");
      const data = await localforage.getItem("store");
      data.forEach(item => {
        addUnit(item.syntax, item.options, item.lnglat);
      });
      break;
    case "z":
      toogleZIndex = !toogleZIndex;
      customLayer.setzIndex(toogleZIndex ? 300 : 10);
      break;
    case "]":
      size *= 1.2;
      resize();
      break;
    case "[":
      size *= 0.8;
      resize();
      break;
    case "\\":
      size = 35;
      resize();
      break;
    case "f":
      friendly = !friendly;
      bind();
      break;
    default:
      // w, a, s, d
      clearInterval(intervals[e.key]);
      document.onkeydown = keyHandler;
      break;
  }
};

const resize = (sizeParam) => {
  if (sizeParam) size = sizeParam;
  const tmp = images;
  images = [];
  tmp.forEach(image => {
    addUnit(image._memory.syntax, image._memory.options, image._memory.lnglat);
    image.remove();
  });
};

let combokeys = new Combokeys(document);

const bind = () => {
  const faction = friendly ? "F" : "H";
  const shortcuts = [
    {
      key: "1",
      syntax: `S${faction}GPUCIM----`
    },
    {
      key: "2",
      syntax: `S${faction}GPUCIZ----`
    },
    {
      key: "3",
      syntax: `S${faction}GPUCA-----`
    },
    {
      key: "0",
      syntax: `S${faction}GPUCI----`
    }
  ];
  shortcuts.forEach(shortcut => {
    combokeys.bind(shortcut.key, () => {
      addUnit(shortcut.syntax);
    });
  });
};

bind();
