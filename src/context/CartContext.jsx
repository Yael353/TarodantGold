import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";


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
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("tarodant-gold-cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log("🛍️ Laddade cart från localStorage:", parsed);
        return parsed;
      }
    } catch (error) {
      console.error("❌ Error parsing cart från localStorage:", error);
      localStorage.removeItem("tarodant-gold-cart");
    }
    return [];
  });

  
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  
  useEffect(() => {
    localStorage.setItem("tarodant-gold-cart", JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || !product.id) {
      console.error("❌ Ogiltig produkt:", product);
      return;
    }

    
    setRecentlyAdded({
      productId: product.id,
      productName: product.name,
      quantity: quantity,
    });
    setIsAnimating(true);

    // Reset animation efter delay
    setTimeout(() => {
      setIsAnimating(false);
      setRecentlyAdded(null);
    }, 2000);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex >= 0) {
        // Uppdatera befintlig produkt
        return prevCart.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                lastUpdated: new Date().toISOString(),
              }
            : item,
        );
      } else {
        // Lägg till ny produkt med metadata
        return [
          ...prevCart,
          {
            ...product,
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency || "SEK",
            images: product.images || [],
            quantity,
            addedAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          },
        ];
      }
    });
  }, []);

  // Ta bort produkt från kundvagnen
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  // Uppdatera antal av en produkt
  const updateQuantity = useCallback(
    (productId, newQuantity) => {
      if (newQuantity < 1) {
        removeFromCart(productId);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: newQuantity,
                lastUpdated: new Date().toISOString(),
              }
            : item,
        ),
      );
    },
    [removeFromCart],
  );

  // Öka antal med 1
  const incrementQuantity = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              lastUpdated: new Date().toISOString(),
            }
          : item,
      ),
    );
  }, []);

  // Minska antal med 1
  const decrementQuantity = useCallback((productId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === productId) {
              if (item.quantity <= 1) {
                return null; // Ta bort senare
              }
              return {
                ...item,
                quantity: item.quantity - 1,
                lastUpdated: new Date().toISOString(),
              };
            }
            return item;
          })
          .filter(Boolean), // Ta bort null värden
    );
  }, []);

  // Rensa hela kundvagnen
  const clearCart = useCallback(() => {
    setCart([]);
    console.log("🧹 Cart rensad");
  }, []);

  // Beräkna totalt antal varor (med useMemo för prestanda)
  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  // Beräkna totalpris (med useMemo för prestanda)
  const totalPrice = useMemo(
    () =>
      cart.reduce((total, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return total + price * quantity;
      }, 0),
    [cart],
  );

  // Formatera totalpris med valuta
  const formattedTotalPrice = useMemo(() => {
    const currency = cart[0]?.currency || "SEK";
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(totalPrice);
  }, [cart, totalPrice]);

  // Kolla om en produkt finns i kundvagnen
  const isInCart = useCallback(
    (productId) => cart.some((item) => item.id === productId),
    [cart],
  );

  // Hämta antal av specifik produkt
  const getItemQuantity = useCallback(
    (productId) => {
      const item = cart.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [cart],
  );

  // Skapa cart summary för checkout
  const getCartSummary = useCallback(
    () => ({
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        currency: item.currency,
        total: item.price * item.quantity,
      })),
      totalItems,
      totalPrice,
      formattedTotalPrice,
      estimatedTax: totalPrice * 0.25, // 25% moms exempel
      shipping: totalPrice > 500 ? 0 : 49, // Gratis frakt över 500
    }),
    [cart, totalItems, totalPrice, formattedTotalPrice],
  );

  // Sortera cart (nyast först, äldst först, pris högst/lägst)
  const sortCart = useCallback(
    (sortBy = "addedAt", direction = "desc") => {
      const sorted = [...cart].sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];

        if (sortBy === "addedAt" || sortBy === "lastUpdated") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        if (direction === "asc") {
          return aVal - bVal;
        }
        return bVal - aVal;
      });

      setCart(sorted);
    },
    [cart],
  );

  // Merge carts (t.ex. från gäst till inloggad användare)
  const mergeCarts = useCallback((guestCart) => {
    setCart((prevCart) => {
      const merged = [...prevCart];

      guestCart.forEach((guestItem) => {
        const existingIndex = merged.findIndex(
          (item) => item.id === guestItem.id,
        );

        if (existingIndex >= 0) {
          merged[existingIndex].quantity += guestItem.quantity;
        } else {
          merged.push(guestItem);
        }
      });

      return merged;
    });
  }, []);

  // Export cart data
  const exportCart = useCallback(() => {
    return {
      cart,
      summary: getCartSummary(),
      exportDate: new Date().toISOString(),
      version: "1.0",
    };
  }, [cart, getCartSummary]);

  // Import cart data
  const importCart = useCallback((data) => {
    if (data && Array.isArray(data.cart)) {
      setCart(data.cart);
      console.log("📥 Cart importerad:", data.cart);
      return true;
    }
    return false;
  }, []);

  // Context value
  const value = useMemo(
    () => ({
      // State
      cart,
      recentlyAdded,
      isAnimating,

      // Actions
      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      sortCart,
      mergeCarts,
      exportCart,
      importCart,

      // Getters
      totalItems,
      totalPrice,
      formattedTotalPrice,
      isInCart,
      getItemQuantity,
      getCartSummary,

      // Utiliteter
      isEmpty: cart.length === 0,
      uniqueItems: cart.length,
      hasFreeShipping: totalPrice > 500,
      shippingCost: totalPrice > 500 ? 0 : 49,
    }),
    [
      cart,
      recentlyAdded,
      isAnimating,
      addToCart,
      removeFromCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      sortCart,
      mergeCarts,
      exportCart,
      importCart,
      totalItems,
      totalPrice,
      formattedTotalPrice,
      isInCart,
      getItemQuantity,
      getCartSummary,
    ],
  );

  console.log("🛒 CartProvider renderad. Cart:", cart);

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Notification overlay */}
      <AnimatePresence>
        {isAnimating && recentlyAdded && (
          <motion.div
            key="cart-notification"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-8 right-8 z-[9999] pointer-events-none"
          >
            {/* Notification card */}
            <div className="relative bg-gradient-to-br from-black to-gray-900 text-gold px-6 py-4 rounded-xl border border-gold/30 shadow-2xl min-w-64">
              {/* Close button (optional) */}
              <button
                className="absolute top-2 right-2 text-beige/40 hover:text-beige transition-colors"
                onClick={() => {
                  setIsAnimating(false);
                  setRecentlyAdded(null);
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div>
                  {/* KORRIGERAD: Använder recentlyAdded.quantity som nu finns */}
                  <p className="font-semibold">
                    {recentlyAdded.quantity === 1
                      ? "Product added to cart"
                      : `${recentlyAdded.quantity} products added to cart`}
                  </p>
                  {/* Visa produktnamn endast för single product */}
                  {recentlyAdded.quantity === 1 && (
                    <p className="text-sm text-beige/60 mt-1 line-clamp-1">
                      {recentlyAdded.productName}
                    </p>
                  )}
                </div>
              </div>

              {/* Cart summary */}
              <div className="mt-3 pt-3 border-t border-gold/10">
                <div className="flex justify-between text-sm">
                  <span className="text-beige/70">Items in cart:</span>
                  <span className="font-bold">{totalItems}</span>
                </div>
              </div>
            </div>

            {/* Progress bar för animation */}
            <motion.div
              className="h-1 bg-gradient-to-r from-gold to-transparent rounded-b-xl mt-2"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};
