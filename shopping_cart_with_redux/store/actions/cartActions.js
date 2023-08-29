// adding and removing items from cart using dispatch action functions
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
