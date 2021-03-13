let initialState = {
  cartValue: 0,
  cartList: [],
  totalPrice: 0,
};

let addToList = (state, action) => {
  let item = state.cartList.find((item) => {
    return item.id == action.value.id;
  });
  if (!item) {
    state.cartValue += 1;
    let value = action.value;
    value.quantity += 1;
    state.cartList.push(value);
  }
  return state;
};

let deleteItem = (state, action) => {
  state.cartValue -= 1;
  let newCartList = state.cartList.filter((item) => {
    return item.id !== action.value.id;
  });
  state.cartList = newCartList;
  return state;
};

let addQuantity = (state, action) => {
  let cartList = state.cartList.map((item) => {
    if (item.id == action.value.id) {
      let value = action.value;
      value.quantity += 1;
      return value;
    }
    return item;
  });
  state.cartList = cartList;
  return state;
};

let subtractQuantity = (state, action) => {
  if (action.value.quantity > 1) {
    let cartList = state.cartList.map((item) => {
      if (item.id == action.value.id) {
        let value = action.value;
        value.quantity -= 1;
        return value;
      }
      return item;
    });
    state.cartList = cartList;
  }
  return state;
};

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...addToList(state, action) };
    case "DEL_ITEM":
      return { ...deleteItem(state, action) };
    case "CLEAR_CART":
      return { cartValue: 0, cartList: [] };
    case "ADD_QUANTITY":
      return { ...addQuantity(state, action) };
    case "SUBTRACT_QUANTITY":
      return { ...subtractQuantity(state, action) };
    default:
      return state;
  }
}
