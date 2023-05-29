import { useRef, useEffect, useState } from "react";

function Map({ center, zoom }) {
  const ref = useRef();
  const [newCenter, setNewCenter] = useState({
    lat: 26.2698639,
    lng: 78.1675656,
  });
  useEffect(() => {
    if (
      center &&
      (center.lat !== undefined || center.lat !== null) &&
      (center.long !== undefined || center.long !== null)
    ) {
      setNewCenter({ ...center });
    }
  }, [center]);
  useEffect(() => {
    // console.log({ newCenter, zoom });
    if (newCenter.lat && newCenter.lng) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: newCenter,
        zoom: zoom || 15,
      });
      // eslint-disable-next-line no-new
      new window.google.maps.Marker({
        position: newCenter,
        map: newMap,
        title: "Marker Title",
      });
    }
  }, [newCenter, zoom]);

  return <div ref={ref} id="map" style={{ height: "100%" }} />;
}
export default Map;
