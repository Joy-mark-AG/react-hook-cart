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
</CartProvider>
```

#### 🔗 `useCart()`

Function to expose cart functionality

```tsx
import { useCart } from "react-hook-cart";

const ShowCart = () => {
  const { items } = useCart();

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

`Item` is an object `{id: string, price: number}`

`quantity` is optional, 1 by default

```tsx
const { addItem } = useCart();

  return (
    <button onClick={()=>addItem({id: "Bread", price: 5}, 2)}>Add 2 bread for 5 USD each</button> 
  );
};
```

