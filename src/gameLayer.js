let draw;
let images = [];
let dargging = false;
let selected;
let currentMousePosition;
let customLayer;

map.plugin(["AMap.CustomLayer"], function() {
  const size = map.getSize();
  const canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

const addUnit = (syntax = "SFGPUCI-----", options, lnglat) => {
  syntaxStore = syntax;
  const symbol = new ms.Symbol(syntax, { size, ...options });
  const svg = symbol.toDataURL();
  const image = draw.image(svg);
  image.addClass("move");
  if (!lnglat) {
    lnglat = map.containerToLngLat(currentMousePosition);
    setTimeout(() => {
      image.center(currentMousePosition.x, currentMousePosition.y);
    });
  } else {
    const center = map.lngLatToContainer([lnglat.lng, lnglat.lat]);
    setTimeout(() => {
      image.center(center.x, center.y);
    });
  }
  image.remember("lnglat", lnglat);
  image.remember("syntax", syntax);
  image.remember("options", options);
  image.remember("symbol", symbol);

  const remove = () => {
    image.remove();
    const index = images.indexOf(image);
    if (index !== -1) {
      images.splice(index, 1);
    }
  };

  image.mousedown(e => {
    if (e.which === 2) {
      remove();
      return;
    }
    if (e.which === 3) {
      selected = image;
      console.log("selected", selected);
      return;
    }
    selected = image;
    map.setStatus({ dragEnable: false });
    image.center(e.clientX, e.clientY);
    dargging = true;
  });
  images.push(image);

  image.update = (syntax2 = syntax, options2 = options, lnglat2 = lnglat) => {
    remove();
    addUnit(syntax2, options2, lnglat2);
  };
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
    selected.center(e.pixel.x, e.pixel.y);
    setTimeout(() => (inThrottle = false), 40);
  }
});
map.on("mouseup", e => {
  if (dargging) {
    dargging = false;
    selected.center(e.pixel.x, e.pixel.y);
    selected.remember("lnglat", e.lnglat);
    map.setStatus({ dragEnable: true });
  }
});
