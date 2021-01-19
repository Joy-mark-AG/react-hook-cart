# react-hook-cart

IMPORTANT: This package isn't functional yet.

<div align="center">
    
[![npm](https://img.shields.io/badge/Build%20with-Typescript-blue?style=for-the-badge)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/bundlephobia/minzip/react-hook-cart?style=for-the-badge)](https://bundlephobia.com/result?p=react-hook-cart@1.0.0)

</div>

🛒 This is a typescript, hook using shopping cart lib, that I'm hopeful will help a few people out.

<h2>📦 Installation</h2>

    $ npm install react-hook-cart

<h2>📖 Example</h2>

Check out the <a href="https://codesandbox.io/s/react-hook-cart-example-gnxl1">Demo</a>.

<h2>🕹 API</h2>

#### 🔗 `CartProvider`

This is a Provider Component to wrapper around your entire app(or a section of it) in order to create context for the cart.

```tsx
import { CartProvider } from "react-hook-cart";

<CartProvider>
  <App />
</CartProvider>;
```

#### 🔗 `useCart()`

Function to expose cart functionality

```tsx
import { useCart } from "react-hook-cart";

const { items, isEmpty, totalCost, addItem, removeItem, clearCart } = useCart();
```

#### 🔗 `items`

`items` in an `Item` array

```tsx
import { useCart } from "react-hook-cart";

const { items } = useCart();

const ShowCart = () => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li>{item.id}</li>
        ))}
      </ul>
    </div>
  );
};
```

#### 🔗 `addItem(Item, quantity)`

Adds the item to the items array

- `Item` is an object `{id: string, price: number}`, it can have additional properties `{id: string, price: number, name:"example"}`

- `quantity` is a number, but optional. Default value is 1

```tsx
const { addItem } = useCart();

  return (
    <button onClick={()=>addItem({id: "Br73s", price: 5}, 2)}>Add 2 bread for 5 USD each</button>
  );
};
```

#### 🔗 `removeItem(id)`

Removes all of the items with that id.

- `id` is a string

```tsx
const { removeItem } = useCart();

  return (
    <button onClick={()=>removeItem("Br73s")}>Remove items</button>
  );
};
```

#### 🔗 `clearCart()`

`clearCart()` empties the cart, and resets the state.

```tsx
const { clearCart } = useCart();

  return (
    <button onClick={()=>clearCart()}>Empty the cart!</button>
  );
};
```

#### 🔗 `isEmpty`

A quick and easy way to check if the cart is empty.

- `isEmpty` is a boolean.

```tsx
const { isEmpty } = useCart();

  return (
    <p>The cart is {isEmpty ? "empty" : "not empty"}</p>
  );
};
```

#### 🔗 `getItem(id)`

Get item with that id.

- `id` is a string

```tsx
const { getItem } = useCart();

  const item = getItem("Br73s")}>

};
```

#### 🔗 `inCart(id)`

Quickly check if an item is in the cart.

- `id` is a string

- returns a boolean

```tsx
const { inCart } = useCart();

  const itemWasInCart = inCart("Br73s")}>

};
```

#### 🔗 `totalItems`

The total amount of items in the cart.

- `totalItems` is a number

```tsx
const { totalItems } = useCart();

  return (
    <p>There are {totalItems} in the cart</p>
  );
};
```

#### 🔗 `totalUniqueItems`

The total amount of unique items in the cart.

- `totalUniqueItems` is a number

```tsx
const { totalUniqueItems } = useCart();

  return (
    <p>There are {totalUniqueItems} in the cart</p>
  );
};
```

#### 🔗 `totalCost`

The total cost of all the items in the cart.

- `totalCost` is a number

```tsx
const { totalCost } = useCart();

  return (
    <p>The total cost of the cart is: {totalCost}</p>
  );
};
```
