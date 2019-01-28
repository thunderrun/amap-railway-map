// create map
const map = new AMap.Map("container", {
  mapStyle: "amap://styles/ab8e6d6ef2ba3500d70346b36f66dba2"
});
const satelliteLayer = new AMap.TileLayer.Satellite({
  zIndex: -1
});
map.add(satelliteLayer);

// set up wasd control

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
  clearInterval(intervals[e.key]);
  document.onkeydown = keyHandler;
};
