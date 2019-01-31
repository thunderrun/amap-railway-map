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

const addUnit = (syntax = "SFGPUCI-----", lnglat) => {
  syntaxStore = syntax;
  const svg = new ms.Symbol(syntax).asSVG();
  const svgDataURL = svgToDataURL(svg);
  const image = draw.image(svgDataURL);
  image.addClass("move");
  if (!lnglat) {
    lnglat = map.containerToLngLat(currentMousePosition);
    setTimeout(() => {
      image.width(width);
      image.center(currentMousePosition.x, currentMousePosition.y);
    });
  } else {
    const center = map.lngLatToContainer([lnglat.lng, lnglat.lat]);
    setTimeout(() => {
      image.width(width);
      image.center(center.x, center.y);
    });
  }
  image.remember("lnglat", lnglat);
  image.remember("syntax", syntax);
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
    image.width(width);
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
