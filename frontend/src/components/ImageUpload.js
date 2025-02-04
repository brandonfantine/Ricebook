import { useState, useRef } from "react";

function ImageUpload() {
  const [image, setImage] = useState("");
  const inputFile = useRef(null);

  const pickFile = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType);

      setImage(files[0]);
    }
  }

  const uploadImage = () => {inputFile.current.click()};

  return (
    <div>
      <input type='file' ref={inputFile} onChange={pickFile} style={{ display: "none" }}></input>
      <div className="image-upload" onClick={uploadImage}>Upload an Image</div>
    </div>
  )
}