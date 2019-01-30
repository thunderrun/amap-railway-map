// create map
const map = new AMap.Map("container", {
  mapStyle: "amap://styles/ab8e6d6ef2ba3500d70346b36f66dba2"
});
const satelliteLayer = new AMap.TileLayer.Satellite({
  zIndex: -1
});
map.add(satelliteLayer);

let gameMode = false;
let toogleZIndex = true;

// set up controls

let intervals = { w: null, a: null, s: null, d: null };
const interval = 100;

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
    addInfantry("blue");
  } else if (e.key === "r") {
    addInfantry("red");
  } else if (e.key === ";") {
    const store = images.map(image => image._memory);
    localforage.setItem("store", store).then(() => {
      console.log("Game Saved");
    });
  } else if (e.key === "l") {
    localforage.getItem("store").then(data => {
      data.forEach(item => {
        addInfantry(item.faction, item.lnglat);
      });
    });
  } else if (e.key === "z") {
    toogleZIndex = !toogleZIndex;
    customLayer.setzIndex(toogleZIndex ? 300 : 10);
  } else {
    clearInterval(intervals[e.key]);
    document.onkeydown = keyHandler;
  }
};

// game layer

let draw;
let images = [];
let dargging = false;
let currentImage;
let currentMousePosition;
let customLayer;

map.plugin(["AMap.CustomLayer"], function() {
  var size = map.getSize();
  var canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  canvas.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  canvas.setAttribute("width", size.width);
  canvas.setAttribute("height", size.height);

  draw = SVG(canvas);

  customLayer = new AMap.CustomLayer(canvas, {
    zIndex: 300
  });
  customLayer.render = onRender;
  map.add(customLayer);
});

const addInfantry = (faction, lnglat) => {
  const image = draw.image(`./${faction}.png`);
  image.addClass("move");
  image.size(60, 40);
  if (!lnglat) {
    lnglat = map.containerToLngLat(currentMousePosition);
    image.center(currentMousePosition.x, currentMousePosition.y);
  } else {
    const center = map.lngLatToContainer([lnglat.lng, lnglat.lat]);
    image.center(center.x, center.y);
  }
  image.remember("lnglat", lnglat);
  image.remember("faction", faction);
  image.mousedown(e => {
    if (e.which === 3) {
      image.remove();
    }
    currentImage = image;
    map.setStatus({ dragEnable: false });
    image.center(e.clientX, e.clientY);
    dargging = true;
  });
  images.push(image);
};

function onRender() {
  images.forEach(image => {
    const center = map.lngLatToContainer([
      image._memory.lnglat.lng,
      image._memory.lnglat.lat
    ]);
    image.center(center.x, center.y);
  });
}

let inThrottle = false;
map.on("mousemove", e => {
  currentMousePosition = e.pixel;
  if (dargging) {
    if (inThrottle) return;
    inThrottle = true;
    currentImage.center(e.pixel.x, e.pixel.y);
    setTimeout(() => (inThrottle = false), 40);
  }
});
map.on("mouseup", e => {
  if (dargging) {
    dargging = false;
    currentImage.center(e.pixel.x, e.pixel.y);
    currentImage.remember("lnglat", e.lnglat);
    map.setStatus({ dragEnable: true });
  }
});
