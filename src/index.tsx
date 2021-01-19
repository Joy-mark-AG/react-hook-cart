import * as React from "react";
import { cartReducer, CartState, Item } from "./cartReducer";
import useLocalStorage from "./useLocalStorage";

const { createContext, useContext, useReducer, useEffect } = React;

const initialState: any = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  totalCost: 0,
};

const CartContext = createContext<CartState | undefined>(initialState);

export const useCart = () => {
  // This makes sure that the cart functions are always
  const context = useContext(CartContext);
  if (!context) throw new Error("Expected to be wrapped in a CartProvider");
  return context;
};

export const CartProvider: React.FC<{
  children: React.ReactNode;
  storage?: any;
}> = ({ children, storage = useLocalStorage }) => {
  const [storedCart, saveCart] = storage(
    "react-use-cart",
    JSON.stringify({
      ...initialState,
    })
  );

  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    JSON.parse(storedCart)
  );

  useEffect(() => {
    saveCart(JSON.stringify(cartState));
  }, [cartState, saveCart]);

  const addItem = (item: Item, quantity: number = 1): void => {
    if (quantity < 1) return;

    if (item.id === undefined)
      throw new Error(`Item object must have an "id" property.`);

    if (item.price === undefined)
      throw new Error(`Item object must have a "price" property.`);

    const currentItem = cartState.items.find((i) => i.id === item.id);

    if (currentItem) {
      const payload = {
        item: { ...item, quantity: currentItem.quantity! + quantity },
        idToUpdate: item.id,
      };

      dispatchCartState({
        type: "UPDATE_ITEM",
        payload,
      });
    } else {
      const payload = { item: { ...item, quantity } };
      dispatchCartState({ type: "ADD_ITEM", payload });
    }
  };

  const removeItem = (id: Item["id"]): void => {
    dispatchCartState({ type: "REMOVE_ITEM", payload: { idToRemove: id } });
  };

  const updateItem = (id: Item["id"], updates: object) => {
    const currentItem = cartState.items.find((item) => item.id === id);

    if (!currentItem) throw new Error("No Item with that id in Items array.");

    const item = { ...currentItem, ...updates };

    dispatchCartState({
      type: "UPDATE_ITEM",
      payload: { item, idToUpdate: id },
    });
  };

  const updateItemQuantity = (id: Item["id"], quantity: number): void => {
    if (quantity <= 0) {
      dispatchCartState({ type: "REMOVE_ITEM", payload: { idToRemove: id } });
      return;
    }

    const currentItem = cartState.items.find((item) => item.id === id);

    if (!currentItem) throw new Error("No Item with that id in Items array.");

    const item = { ...currentItem, quantity };

    dispatchCartState({
      type: "UPDATE_ITEM",
      payload: { item, idToUpdate: id },
    });
  };

  const clearCart = (): void => {
    const payload = { initialCartState: initialState };
    dispatchCartState({ type: "CLEAR_CART", payload });
  };

  const getItem = (id: Item["id"]): Item | undefined =>
    cartState.items.find((item) => item.id === id);

  const inCart = (id: Item["id"]): boolean =>
    cartState.items.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addItem,
        removeItem,
        updateItem,
        updateItemQuantity,
        clearCart,
        getItem,
        inCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
