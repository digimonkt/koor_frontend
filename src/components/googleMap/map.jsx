import { useRef, useEffect } from "react";

function Map({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-new
    const newMap = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    // eslint-disable-next-line no-new
    const marker = new window.google.maps.Marker({
      position: center,
      map: newMap,
      title: "Marker Title",
    });
    console.log({ marker });
  }, []);

  return <div ref={ref} id="map" style={{ height: "100%" }} />;
}
export default Map;
