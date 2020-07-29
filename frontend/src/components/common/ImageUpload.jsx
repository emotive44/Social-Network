import React, { useState, useEffect } from 'react';
import './ImageUpload.scss';

const ImageUpload = React.forwardRef((props, ref) => {
  const [previewUrl, setpreviewUrl] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result);
      props.setImage && props.setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, props]);

  const pickedHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        ref={ref}
        type="file"
        id="upload"
        name={props.name}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        style={{ display: 'none' }}
      />
      <label htmlFor="upload" style={props.style} className="image-preview">
        {props.children}
        {previewUrl && <img src={previewUrl} alt="" />}
        {!previewUrl && <span>Upload Image</span>}
      </label>
    </>
  );
});

export default ImageUpload;
