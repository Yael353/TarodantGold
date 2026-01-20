// context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error("❌ useCart måste användas inom CartProvider");
    throw new Error("useCart måste användas inom CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // ⭐ LAZY INITIAL STATE - Lösning för StrictMode ⭐
  const [cart, setCart] = useState(() => {
    console.log("⭐ useState initializer körs");

    try {
      const savedCart = localStorage.getItem("tarodant-cart");
      console.log("⭐ localStorage värde:", savedCart);

      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log("⭐ Laddade initial cart från localStorage:", parsed);
        return parsed;
      }
    } catch (error) {
      console.error("⭐ Error parsing cart från localStorage:", error);
      // Rensa ogiltig data
      localStorage.removeItem("tarodant-cart");
    }

    console.log("⭐ Ingen cart hittad, returnerar tom array");
    return [];
  });

  // ⭐ Spara automatiskt när cart ändras
  useEffect(() => {
    console.log("💾 useEffect: Cart ändrad, sparar till localStorage:", cart);
    localStorage.setItem("tarodant-cart", JSON.stringify(cart));
  }, [cart]);

  // ⭐ Lägg till produkt i kundvagnen
  const addToCart = (product, quantity = 1) => {
    console.log(
      "🛒 addToCart kallad för:",
      product.name,
      "quantity:",
      quantity
    );
    console.log("🛒 Current cart före:", cart);

    if (!product || !product.id) {
      console.error("🛒 Ogiltig produkt:", product);
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      let newCart;

      if (existingIndex >= 0) {
        // ⭐ Uppdatera befintlig produkt
        newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        console.log("🛒 Uppdaterade befintlig produkt. Ny cart:", newCart);
      } else {
        // ⭐ Lägg till ny produkt
        newCart = [
          ...prevCart,
          {
            ...product,
            quantity,
            // ⭐ Se till att vi har alla nödvändiga fält
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency || "SEK",
            images: product.images || [],
          },
        ];
        console.log("🛒 Lade till ny produkt. Ny cart:", newCart);
      }

      return newCart;
    });
  };

  // ⭐ Ta bort produkt från kundvagnen
  const removeFromCart = (productId) => {
    console.log("🗑️ removeFromCart:", productId);

    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      console.log("🗑️ Ny cart efter borttagning:", newCart);
      return newCart;
    });
  };

  // ⭐ Uppdatera antal av en produkt
  const updateQuantity = (productId, newQuantity) => {
    console.log("📊 updateQuantity:", productId, "->", newQuantity);

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      console.log("📊 Ny cart efter quantity update:", newCart);
      return newCart;
    });
  };

  // ⭐ Rensa hela kundvagnen
  const clearCart = () => {
    console.log("🧹 clearCart");
    setCart([]);
  };

  // ⭐ Beräkna totalt antal varor
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // ⭐ Beräkna totalpris
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  // ⭐ Kolla om en produkt finns i kundvagnen
  const isInCart = (productId) => {
    const exists = cart.some((item) => item.id === productId);
    console.log("🔍 isInCart:", productId, "->", exists);
    return exists;
  };

  // ⭐ Skapa ett cart-objekt med produkt-ID som nyckel (för snabb lookup)
  const cartItemsMap = cart.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});

  const value = {
    cart, // Array med alla produkter
    cartItemsMap, // Objekt för snabb lookup {id: product}
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems, // Totalt antal varor
    totalPrice, // Totalt pris
    isInCart,
  };

  console.log("🎯 CartProvider renderas. Cart:", cart);
  console.log("🎯 CartProvider value:", value);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
