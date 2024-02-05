import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillInputComponent = ({
  value = "",
  placeholder = "",
  onChange,
  ...rest
}) => {
  const [editorValue, setEditorValue] = useState("");

  const Link = ReactQuill.Quill.import("formats/link");
  const builtInFunc = Link.sanitize;
  Link.sanitize = function customSanitizeLinkInput(linkValueInput) {
    let val = linkValueInput;

    // do nothing, since this implies user's already using a custom protocol
    if (/^\w+:/.test(val));
    else if (!/^https?:/.test(val)) val = "http://" + val;

    return builtInFunc.call(this, val); // retain the built-in logic
  };
  useEffect(() => {
    setEditorValue(value || "");
  }, [value]);

  const handleChange = (newValue) => {
    setEditorValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // basic formatting
    ["blockquote", "code-block"], // blockquote and code block
    [{ header: 1 }, { header: 2 }], // headers
    [{ list: "ordered" }, { list: "bullet" }], // ordered and unordered lists
    [{ script: "sub" }, { script: "super" }], // subscript and superscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent and indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // font size
    [{ color: [] }, { background: [] }], // text and background color
    [{ font: [] }], // font family [{ align: [] }], // text alignment
    ["link", "image", "video"], // link, image, and video
    ["clean"], // remove formatting
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        placeholder={placeholder || "Description"}
        modules={{
          toolbar: toolbarOptions,
        }}
        style={{
          width: "100%",
          marginTop: "10px",
          fontFamily: "'Poppins' !important",
          // backgroundColor: "#F0F0F0",
          height: "150px",
          "@media screen and (max-width: 600px)": {
            height: "100px", // Adjust this value based on your needs
          },
        }}
        {...rest}
      />
    </div>
  );
};

export default QuillInputComponent;
