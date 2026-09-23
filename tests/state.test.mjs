import assert from "node:assert/strict";
import test from "node:test";
import { configureStore } from "@reduxjs/toolkit";
import cart, {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} from "../CartReducer.js";
import product, {
  getProducts,
  incrementQty,
  decrementQty,
} from "../ProductReducer.js";
import { getPickupDates } from "../pickupDates.js";

test("cart adds, increments, decrements and removes the last item", () => {
  const store = configureStore({ reducer: { cart } });
  const item = { id: "shirt", price: 10 };
  store.dispatch(addToCart(item));
  store.dispatch(addToCart(item));
  store.dispatch(incrementQuantity(item));
  assert.equal(store.getState().cart.cart[0].quantity, 3);
  for (let i = 0; i < 3; i++) store.dispatch(decrementQuantity(item));
  assert.deepEqual(store.getState().cart.cart, []);
  store.dispatch(decrementQuantity(item));
  store.dispatch(incrementQuantity(item));
  assert.deepEqual(store.getState().cart.cart, []);
});

test("products stay unique and quantities reset when an order clears the cart", () => {
  const store = configureStore({ reducer: { cart, product } });
  const item = { id: "shirt", price: 10, quantity: 0 };
  store.dispatch(getProducts(item));
  store.dispatch(getProducts(item));
  assert.equal(store.getState().product.product.length, 1);
  store.dispatch(decrementQty(item));
  assert.equal(store.getState().product.product[0].quantity, 0);
  store.dispatch(addToCart(item));
  store.dispatch(incrementQty(item));
  assert.equal(store.getState().product.product[0].quantity, 1);
  store.dispatch(cleanCart());
  assert.deepEqual(store.getState().cart.cart, []);
  assert.equal(store.getState().product.product[0].quantity, 0);
  store.dispatch(incrementQty({ id: "missing" }));
  store.dispatch(decrementQty({ id: "missing" }));
  assert.equal(store.getState().product.product.length, 1);
});

test("pickup dates start today and cross year and daylight-saving boundaries", () => {
  for (const start of [new Date(2026, 11, 25, 15), new Date(2026, 2, 20, 15)]) {
    const dates = getPickupDates(start);
    assert.equal(dates.length, 30);
    assert.equal(dates[0].getDate(), start.getDate());
    dates.forEach((date, index) => {
      const expected = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + index,
      );
      assert.equal(date.getTime(), expected.getTime());
    });
    assert.equal(start.getHours(), 15);
  }
});
