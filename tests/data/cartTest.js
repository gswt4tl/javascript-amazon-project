import { addToCartOne, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js';

// test suite: addToCartOne
describe('test suite: addToCartOne', () => {
	beforeEach(() => {
		spyOn(Storage.prototype, 'setItem');
	});

	it('adds an existing product to the cart', () => {
		spyOn(Storage.prototype, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		loadFromStorage();

		addToCartOne('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
		expect(Storage.prototype.setItem).toHaveBeenCalledWith(
			'cart',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 2,
					deliveryOptionId: '1',
				},
			])
		);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
	});

	it('adds a new product to the cart', () => {
		spyOn(Storage.prototype, 'getItem').and.callFake(() => {
			return JSON.stringify([]);
		});
		loadFromStorage();

		addToCartOne('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
		expect(Storage.prototype.setItem).toHaveBeenCalledWith(
			'cart',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			])
		);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
	});
});

// test suite: removeFromCart
describe('test suite: removeFromCart', () => {
	beforeEach(() => {
		spyOn(Storage.prototype, 'setItem');
		spyOn(Storage.prototype, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		loadFromStorage();
	});

	it('removes a product that is in the cart', () => {
		removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
		expect(cart.length).toEqual(0);
	});

	it('removes a product that is in not the cart', () => {
		removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
		expect(cart.length).toEqual(1);
	});
});

// test suite: updateDeliveryOption
describe('test suite: updateDeliveryOption', () => {
	beforeEach(() => {
		spyOn(Storage.prototype, 'setItem');
		spyOn(Storage.prototype, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		loadFromStorage();
	});

	it('updates the delivery option of a product in a cart', () => {
		updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
		expect(cart[0].deliveryOptionId).toEqual('3');
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
		expect(Storage.prototype.setItem).toHaveBeenCalledWith(
			'cart',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '3',
				},
			])
		);
	});

	it('updates the delivery option of a product that is not in the cart', () => {
		updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '3');
		expect(cart[0].deliveryOptionId).toEqual('1');
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
	});

	it('does nothing after entering wrong delivery option', () => {
		updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '10');
		expect(cart[0].deliveryOptionId).toEqual('1');
		expect(Storage.prototype.setItem).toHaveBeenCalledTimes(0);
	});
});
