require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "dojo/domReady!"
], function (WebScene, SceneView, Camera, Home) {
  /*var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });*/
  var scene = new WebScene({
    portalItem: {
      id: "8046207c1c214b5587230f5e5f8efc77"
    }
  });
  //looking at Fenway Park (42.341962853043725, -71.09736095971333)
  var camera1 = new Camera({
    position: [
      -71.09736095971333, // lon
      42.341962853043725, // lat
      500 // elevation in meters
    ],
    tilt: 45,
    heading: 0
  });
  // looking at Beacon Hill (42.352177504852975, -71.06756123042399)
  var camera2 = new Camera({
    position: {
      x: -71.06756123042399,
      y: 42.352177504852975,
      z: 550
    },
    tilt: 45,
    heading: -15
  });

  var view = new SceneView({
    container: "viewDiv",
    map: scene,
    // doesn't work to set to local, but local scene did work in AGOL
    viewingMode: "global",
    camera: camera1,
    environment: {
      lighting: {
        date: new Date(),
        directShadowsEnabled: true,
        // don't update the view time when user pans.
        // The clock widget drives the time
        cameraTrackingEnabled: false
      }
    }
  });

  var homeBtn = new Home({
    view: view
  });

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");

  [v1, v2, v3].forEach(function (button) {
    button.style.display = "flex";
    view.ui.add(button, "top-right");
  });

  v2.addEventListener("click", function () {
    // reuse the default camera position already established in the homeBtn
    view.goTo({
      target: camera2
    });
  });

  v1.addEventListener("click", function () {
    // reuse the default camera position already established in the homeBtn
    view.goTo({
      target: camera1
    });
  });

  v3.addEventListener("click", function () {
    // downtown Boston from Atlantic Ocean (42.35783219758882, -71.02998372556466)
    view.goTo({
      position: {
        x:-71.02998372556466,
        y:42.35783219758882,
        z:500
      },
      tilt:75,
      heading:-95
    });
  });
});
