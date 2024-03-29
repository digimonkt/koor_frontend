import { Grid, IconButton } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { SVG } from "../../assets/svg";
import { setErrorToast } from "../../redux/slice/toast";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLES } from "../../utils/enum";
import { getKeysByValue } from "@utils/constants/utility";
import { mimeTypes } from "@utils/constants/constants";

function AttachmentDragNDropInputComponent({
  files,
  handleDrop,
  deleteFile,
  single,
}) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (e, error) => {
      if (error.length && error[0]?.errors) {
        dispatch(setErrorToast("File is too large"));
      }
      if (e.length && handleDrop) {
        const renamedFiles = e.map((file) => {
          const renamedFile = new File(
            [file],
            file.name.replace(/\.[^/.]+$/, "").slice(0, 40) +
              getKeysByValue(mimeTypes, file.type),
            {
              type: file.type,
            }
          );
          return renamedFile;
        });
        handleDrop(renamedFiles);
      }
    },
    multiple: !single,
    maxFiles: single ? 1 : 10,
    maxSize: 200 * 1024 * 1024,
    onError: (e) => console.log({ e }),
  });
  const acceptedFileItems = (files || []).map((file, index) => {
    return (
      <li key={index}>
        <div className="text-tracate">
          <IconButton
            sx={{
              background: role === USER_ROLES.jobSeeker ? "#FEEFD3" : "#D5E3F7",
              color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
              "&:hover": {
                background:
                  role === USER_ROLES.jobSeeker ? "#FEEFD3" : "#D5E3F7",
              },
              mr: 2,
            }}
          >
            <SVG.AttachIcon />
          </IconButton>
          <span
            style={{
              color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
            }}
          >
            {file.name || file.title || file.path || "Untitled File"}
          </span>
        </div>
        <IconButton
          onClick={() => deleteFile(file, index)}
          disableFocusRipple
          sx={{
            color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <SVG.DeleteICon className="attachment_delete_icon" />
        </IconButton>
      </li>
    );
  });
  return (
    <>
      <Grid container spacing={{ lg: 3, xs: 0, sm: 2, md: 2 }}>
        <Grid item xl={6} lg={6} sm={6} xs={12}>
          <div {...getRootProps({ className: "dropzone styles_attachment" })}>
            <input {...getInputProps()} />
            <div className="text-center">
              <p>
                Drag here or{" "}
                <span
                  style={{
                    color:
                      role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
                  }}
                >
                  upload an attachment
                </span>
              </p>
              {!single && <small>File name could be 40 character long</small>}
            </div>
          </div>
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          sm={6}
          xs={12}
          className="attachment-box inline-attacment"
        >
          <ul>{acceptedFileItems}</ul>
        </Grid>
      </Grid>
    </>
  );
}

export default AttachmentDragNDropInputComponent;
