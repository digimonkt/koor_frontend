import { Grid, IconButton } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "@assets/svg";

const AttachmentFile = () => {
  const [myFiles, setMyFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 10,
  });
  const acceptedFileItems = myFiles.map((file) => (
    <li key={file.path}>
      <div className="text-tracate">
        <IconButton
          sx={{
            background: "#D5E3F7",
            color: "#274593",
            "&:hover": {
              background: "#bcd2f1",
            },
            mr: 2,
          }}
        >
          {SVG.AttachIcon}
        </IconButton>
        {file.path}
      </div>
      <IconButton
        onClick={removeFile(file)}
        disableFocusRipple
        sx={{ color: "#274593" }}
      >
        {SVG.DeleteICon}
      </IconButton>
    </li>
  ));

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} xs={12}>
          <div {...getRootProps({ className: "dropzone styles_attachment" })}>
            <input {...getInputProps()} />
            <div className="text-center">
              <p>
                Drag here or{" "}
                <span style={{ color: "#274593" }}>upload an attachment</span>
              </p>
              <small>Max 10 files, each one under 50MB</small>
            </div>
          </div>
        </Grid>

        <Grid
          item
          xl={6}
          lg={6}
          xs={12}
          className="attachment-box inline-attacment"
        >
          <ul>{acceptedFileItems}</ul>
        </Grid>
      </Grid>
    </>
  );
};
export default AttachmentFile;
