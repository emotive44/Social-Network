import React, { useState, useEffect, Fragment } from 'react';
import './ImageUpload.scss';


const ImageUpload = React.forwardRef((props, ref) => {
  const [previewUrl, setpreviewUrl] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if(!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = e => {
    if(e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <Fragment>
      <input 
        ref={ref}
        type="file" 
        id='upload'
        name={props.name}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        style={{display: 'none'}}
      />
      <label htmlFor='upload' className='image-preview' >
        {previewUrl && <img src={previewUrl} alt='' />}
        {!previewUrl && <span>Upload Image</span>}
      </label>
    </Fragment>
  );
});

export default ImageUpload;
