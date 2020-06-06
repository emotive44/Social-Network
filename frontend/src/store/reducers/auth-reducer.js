import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../types';


const initialState = {

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case REGISTER_SUCCESS:
      return {

      };
    case REGISTER_FAIL:
      return {

      };
    default:
      return state;
  }
}