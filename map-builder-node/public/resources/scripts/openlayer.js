function initMap (toolbarId) {
    var map = new ol.Map({
        target: 'map',
        layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
        ],
        view: new ol.View({
        center: ol.proj.fromLonLat([14.52, 46.06]),
        zoom: 12.00,
        constrainRotation: 16
        })
    });
    
              // a normal select interaction to handle click
    var select = new ol.interaction.Select();
    map.addInteraction(select);
    
    var selectedFeatures = select.getFeatures();
    
    // a DragBox interaction used to select features by drawing boxes
    var dragBox = new ol.interaction.DragBox({
      condition: ol.events.condition.platformModifierKeyOnly,
    });
    
    map.addInteraction(dragBox);
    
    dragBox.on('boxend', function () {
      // features that intersect the box geometry are added to the
      // collection of selected features
    
      // if the view is not obliquely rotated the box geometry and
      // its extent are equalivalent so intersecting features can
      // be added directly to the collection
      var rotation = map.getView().getRotation();
      var oblique = rotation % (Math.PI / 2) !== 0;
      var candidateFeatures = oblique ? [] : selectedFeatures;
      var extent = dragBox.getGeometry().getExtent();
    //   vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
    //     candidateFeatures.push(feature);
    //   });
    
      // when the view is obliquely rotated the box extent will
      // exceed its geometry so both the box and the candidate
      // feature geometries are rotated around a common anchor
      // to confirm that, with the box geometry aligned with its
      // extent, the geometries intersect
      if (oblique) {
        var anchor = [0, 0];
        var geometry = dragBox.getGeometry().clone();
        geometry.rotate(-rotation, anchor);
        var extent$1 = geometry.getExtent();
        candidateFeatures.forEach(function (feature) {
          var geometry = feature.getGeometry().clone();
          geometry.rotate(-rotation, anchor);
          if (geometry.intersectsExtent(extent$1)) {
            selectedFeatures.push(feature);
          }
        });
      }
      console.log("selectedFeatures:",selectedFeatures);
      document.getElementById(toolbarId).style.display="block";
    });
    
    // clear selection when drawing a new box and when clicking on the map
    dragBox.on('boxstart', function () {
      console.log("start");
      selectedFeatures.clear();
      document.getElementById(toolbarId).style.display="none";
    });
    
    var infoBox = document.getElementById('info');
    
    selectedFeatures.on(['add', 'remove'], function () {
      var names = selectedFeatures.getArray().map(function (feature) {
        return feature.get('name');
      });
      if (names.length > 0) {
        infoBox.innerHTML = names.join(', ');
      } else {
        infoBox.innerHTML = 'No countries selected';
      }
    });    
}