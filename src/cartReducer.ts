import { displayCurrency } from "./index";

export interface Item {
  id: string;
  price: IPrice[];
  quantity?: number;
  itemTotal?: number;

  [key: string]: any;
}

export interface IPrice {
  currency: string;
  value: number;
}

export interface InitialState {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  totalCost: number;
}

export interface CartState extends InitialState {
  addItem: (item: Item, quantity?: number) => void;
  removeItem: (id: Item["id"]) => void;
  updateItem: (id: Item["id"], item: object) => void;
  updateItemQuantity: (id: Item["id"], quantity: number) => void;
  clearCart: () => void;
  getItem: (id: Item["id"]) => Item | undefined;
  inCart: (id: Item["id"]) => boolean;
}

export type Actions =
  | { type: "ADD_ITEM"; payload: { item: Item } }
  | { type: "REMOVE_ITEM"; payload: { idToRemove: Item["id"] } }
  | {
  type: "UPDATE_ITEM";
  payload: { item: Item; idToUpdate: Item["id"] };
}
  | { type: "CLEAR_CART"; payload: { initialCartState: InitialState } };

const generateCartState = (
  currentCartState: CartState,
  items: Item[],
): CartState => {
  const totalUniqueItems = calculateUniqueItems(items);
  const isEmpty = totalUniqueItems === 0;

  return {
    ...currentCartState,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    totalCost: calculateCartTotal(items),
    isEmpty,
  };
};

const calculateItemTotals = (items: Item[]): Item[] => {
  return items.map((item) => {
    const price = item.price.find((p) => p.currency === displayCurrency);
    if (price === undefined) throw new Error("The defined currency couldn't be found!")
    const parsedPrice = price ? price.value : 0;

    return ({
      ...item,
      itemTotal: parsedPrice * item.quantity!,
    });
  });
};

const calculateTotalItems = (items: Item[]): number =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

const calculateCartTotal = (items: Item[]): number =>
  items.reduce((total, item) => {
    const price = item.price.find((p) => p.currency === displayCurrency)
    if (price === undefined) throw new Error("The defined currency couldn't be found!")
    const parsedPrice = price ? price.value : 0

    return total + item.quantity! * parsedPrice
  }, 0);

const calculateUniqueItems = (items: Item[]): number => items.length;

export const cartReducer = (
  state: CartState,
  action: Actions,
): CartState | InitialState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const items = [...state.items, action.payload.item];

      return generateCartState(state, items);
    }
    case "UPDATE_ITEM": {
      const items = state.items.map((item) => {
        if (item.id !== action.payload.idToUpdate) return item;

        return {
          ...item,
          ...action.payload.item,
        };
      });

      return generateCartState(state, items);
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter(
        (item) => item.id !== action.payload.idToRemove,
      );

      return generateCartState(state, items);
    }
    case "CLEAR_CART":
      return { ...action.payload.initialCartState };
  }
};
