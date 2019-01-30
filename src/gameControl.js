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

document.onkeyup = e => {
  if (e.key === "g") {
    // game mode
    gameMode = !gameMode;
    if (gameMode) {
      map.setMapStyle("amap://styles/aebe189d2072666f6fccc6c2d4946af7");
    } else {
      map.setMapStyle("amap://styles/ab8e6d6ef2ba3500d70346b36f66dba2");
    }
  } else if (e.key === "b") {
    addUnit();
  } else if (e.key === "v") {
    addUnit(syntaxStore);
  } else if (e.key === ";") {
    const store = images.map(image => image._memory);
    localforage.setItem("store", store).then(() => {
      console.log("Game Saved");
    });
  } else if (e.key === "l") {
    localforage.getItem("store").then(data => {
      data.forEach(item => {
        addUnit(item.syntax, item.lnglat);
      });
    });
  } else if (e.key === "z") {
    toogleZIndex = !toogleZIndex;
    customLayer.setzIndex(toogleZIndex ? 300 : 10);
  } else if (e.key === "]") {
    width *= 1.2;
    images.forEach(image => {
      image.width(width);
    });
    onRender()
  } else if (e.key === "[") {
    width *= 0.8;
    images.forEach(image => {
      image.width(width);
    });
    onRender()
  } else if (e.key === "\\") {
    width = 60;
    images.forEach(image => {
      image.width(width);
    });
    onRender()
  } else {
    clearInterval(intervals[e.key]);
    document.onkeydown = keyHandler;
  }
};

// var combokeys = new Combokeys(document);
