// store/actions/cartActions.js
export const addItemToCart = (item) => {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};

export const removeItemFromCart = (item) => {
  return {
    type: 'REMOVE_ITEM',
    payload: item,
  };
};
