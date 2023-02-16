import DialogBox from "@components/dialogBox";
import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

function ImageCropper({ open, handleClose, image }) {
  const [imageSrc, setImageSrc] = useState("");
  const [zoom, setZoom] = useState("");
  const [crop, setCrop] = useState("");
  useEffect(() => {
    if (image) setImageSrc(image);
  }, [image]);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };
  return (
    <DialogBox open={open} handleClose={handleClose}>
      <div>
        <div className="crop-container">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
          )}
        </div>
        <div className="controls">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => onZoomChange(zoom)}
            classes={{ container: "slider" }}
          />
        </div>
      </div>
    </DialogBox>
  );
}

export default ImageCropper;
