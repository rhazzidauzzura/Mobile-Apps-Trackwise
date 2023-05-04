import { FETCH_CATEGORY, FETCH_PRODUCT, FETCH_PRODUCT_BYID } from "../action/ActionTypes";

const initialState = {
  products: [],
  categories: [],
  productId: {},
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case FETCH_PRODUCT_BYID:
      return {
        ...state,
        productId: action.payload,
        flag: "true",
      };
    default:
      return state;
  }
}

export default productReducer;
