import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialCartState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  let updatedItems = [];
  let updatedTotal = 0;

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      updatedTotal = updatedItems.reduce((total, item) => total + item.quantity * item.price, 0);
      return { items: updatedItems, total: updatedTotal };
    case 'REMOVE_ITEM':
      updatedItems = state.items.filter(item => item.id !== action.payload);
      updatedTotal = updatedItems.reduce((total, item) => total + item.quantity * item.price, 0);
      return { items: updatedItems, total: updatedTotal };
    case 'INCREASE_QUANTITY':
      updatedItems = state.items.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      updatedTotal = updatedItems.reduce((total, item) => total + item.quantity * item.price, 0);
      return { items: updatedItems, total: updatedTotal };
    case 'DECREASE_QUANTITY':
      updatedItems = state.items.map(item =>
        item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      ).filter(item => item.quantity > 0);
      updatedTotal = updatedItems.reduce((total, item) => total + item.quantity * item.price, 0);
      return { items: updatedItems, total: updatedTotal };
    case 'SET_TOTAL':
      updatedTotal = state.items.reduce((total, item) => total + item.quantity * item.price, 0);
      return { ...state, total: updatedTotal };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
    const localData = localStorage.getItem('cart');
    return localData
      ? { ...initialCartState, items: JSON.parse(localData) }
      : initialCartState;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
    // Recalculate the total whenever the cart items change
    dispatch({ type: 'SET_TOTAL' });
  }, [state.items]);

  const addItem = item => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = id => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increaseQuantity = id => dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  const decreaseQuantity = id => dispatch({ type: 'DECREASE_QUANTITY', payload: id });

  return (
    <CartContext.Provider value={{ items: state.items, total: state.total, addItem, removeItem, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
