// create map
const map = new AMap.Map("container", {
  mapStyle: "amap://styles/ab8e6d6ef2ba3500d70346b36f66dba2"
});
const satelliteLayer = new AMap.TileLayer.Satellite({
  zIndex: -1
});
map.add(satelliteLayer);
