// create map
const map = new AMap.Map("container", {
  mapStyle: "amap://styles/ab8e6d6ef2ba3500d70346b36f66dba2"
});
const satelliteLayer = new AMap.TileLayer.Satellite({
  zIndex: -1
});
map.add(satelliteLayer);

let gameMode = false;

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
  } else {
    clearInterval(intervals[e.key]);
    document.onkeydown = keyHandler;
  }
};

// game layer

const redCenter = [116.42792, 39.902896];
const blueCenter = [118.797466, 32.087265];

let dargging = false;

map.plugin(["AMap.CustomLayer"], function() {
  var size = map.getSize();
  var canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  canvas.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  canvas.setAttribute("width", size.width);
  canvas.setAttribute("height", size.height);

  const draw = SVG(canvas);
  image = draw.image("./blue.png");
  image.addClass("move");
  image.size(60, 40);
  const center = map.lngLatToContainer(blueCenter);
  lnglat = {
    lng: blueCenter[0],
    lat: blueCenter[1]
  };
  image.center(center.x, center.y);
  image.draggable();
  image.on("dragstart.namespace", function(event) {
    dargging = true;
  });
  image.on("dragend.namespace", function(event) {
    dargging = false;
  });

  var customLayer = new AMap.CustomLayer(canvas, {
    zIndex: 300
  });
  customLayer.render = onRender;
  map.add(customLayer);
});

function onRender() {
  const center = map.lngLatToContainer([lnglat.lng, lnglat.lat]);
  image.center(center.x, center.y);
}

map.on("mouseup", e => {
  if (dargging) {
    lnglat = e.lnglat;
  }
});
