//@flow
import { createSelector } from "reselect";
export const get = (path: string) => {
  let split = path.split(".");
  let l = split.length;
  return (a: Object) => {
    for (var i = 0; i < l; i++) a = a[split[i]];
    return a;
  };
};

const getDataGeoJson = createSelector(get("data"), data => ({
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: data.map(d => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: d
      }
    }))
  }
}));

export const getSources = createSelector(
  [get("base.sources"), getDataGeoJson],
  (baseSources, pointData) => ({
    ...baseSources,
    pointData
  })
);

export const getLayers = createSelector(
  [get("base.layers"), get("dataActive")],
  (baseLayers, dataActive) => [
    ...baseLayers,
    {
      id: "points",
      source: "pointData",
      type: "circle",
      paint: {
        "circle-radius": 4,
        "circle-color": "#E91E63"
      },
      layout: {
        visibility: dataActive ? "visible" : "none"
      }
    }
  ]
);

export const getStyle = createSelector(
  [get("base"), getSources, getLayers],
  (base, sources, layers) => ({
    ...base,
    sources,
    layers
  })
);
