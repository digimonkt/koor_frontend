import { Avatar, Stack } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "../../../../assets/svg";
import { Cbutton } from "../../../../components/button";

const UploadFile = ({ title, color, bgcolor, textcolor }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <Fragment key={file.name}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          color: "#CACACA",
          "&.MuiAvatar-circular": {
            background: "#F0F0F0",
          },
        }}
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </Fragment>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <>
      <div className="add-content">
        <h2>{title}</h2>
        <Stack direction="row" spacing={2} className="mt-4">
          {!files.length ? (
            <Avatar
              alt="Remy Sharp"
              sx={{
                width: 100,
                height: 100,
                color: "#CACACA",
                "&.MuiAvatar-colorDefault": {
                  background: "#F0F0F0",
                },
              }}
            >
              <SVG.UserIcon />
            </Avatar>
          ) : (
            <>{thumbs}</>
          )}
          <Stack direction="column" spacing={4}>
            <div className="dropimg-userprofile">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  Drag here or{" "}
                  <span style={{ color: textcolor }}>upload a photo</span>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Cbutton
                variant="outlined"
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",

                    border: `1px solid ${color}`,
                    color: color,
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "6px 30px",
                    "&:hover": { background: bgcolor },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              >
                <span className="me-2 d-inline-flex">
                  <SVG.CheckIcon />
                </span>
                Save photo
              </Cbutton>
            </div>
          </Stack>
        </Stack>
      </div>
    </>
  );
};
export default UploadFile;
