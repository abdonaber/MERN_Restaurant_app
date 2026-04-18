import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find(i => i.product === product._id);
        if (existingItem) {
          set({
            items: items.map(i => i.product === product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i)
          });
        } else {
          set({ items: [...items, { product: product._id, name: product.name, price: product.price, quantity: 1, image: product.image?.url }] });
        }
      },
      removeItem: (productId) => set({ items: get().items.filter(i => i.product !== productId) }),
      updateQuantity: (productId, quantity) => set({
        items: get().items.map(i => i.product === productId ? { ...i, quantity } : i)
      }),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }),
    { name: 'cart-storage' }
  )
);
