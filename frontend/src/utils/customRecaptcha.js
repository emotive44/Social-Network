const customRecaptcha = (day) => {
  let dayCount;

  switch(day.toLowerCase()) {
    case 'sunday':
      dayCount = 0;
      break;
    case 'monday':
      dayCount = 1;
      break;
    case 'tuesday':
      dayCount = 2;
      break;
    case 'wednesday':
      dayCount = 3;
      break;
    case 'thursday':
      dayCount = 4;
      break;
    case 'friday':
      dayCount = 5;
      break;
    case 'saturday':
      dayCount = 6;
  }

  if (dayCount === new Date().getDay()) {
    return true;
  } 

  return false;
}

export default customRecaptcha;
