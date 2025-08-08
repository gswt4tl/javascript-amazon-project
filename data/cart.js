export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1 },
];

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const itemQuantity = Number(quantitySelector.value);
  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  } else {
    cart.push({
      productId,
      quantity: itemQuantity,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(elementClass, elementDisplay) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(
    elementClass
  ).innerHTML = `${cartQuantity}${elementDisplay}`;

  if (cartQuantity === 0 && elementClass === ".js-cart-quantity") {
    document.querySelector(elementClass).innerHTML = "";
  } else if (
    elementClass === ".js-item-counter" &&
    (cartQuantity % 10 !== 1 || cartQuantity === 11)
  ) {
    document.querySelector(elementClass).innerHTML += "s";
  }
}
