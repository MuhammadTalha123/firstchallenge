let initialState = {
  cartValue: 0,
  cartList: [],
};

let addToList = (state, action) => {
  let item = state.cartList.find((item) => {
    return item.id == action.value.id;
  });
  if (!item) {
    state.cartValue += 1;
    state.cartList.push(action.value);
  }
  return state;
};

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...addToList(state, action) };
    case "CLEAR_CART":
      return { cartValue: 0, cartList: [] };
    default:
      return state;
  }
}
