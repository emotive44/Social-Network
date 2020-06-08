export const imageOrientation = (src) => {

  const img = new Image();
  img.src = src;
  const width = img.width;
  const height = img.height;
  
  if(width > height) { 
    return "landscape"; 
  } else {
    return "portrait";
  }
}