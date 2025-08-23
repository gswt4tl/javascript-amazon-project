import { resetCart } from './cart.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
	orders.unshift(order);
	resetCart();
	saveToStorage();
}

function saveToStorage() {
	localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
	let matchingOrder;

	orders.forEach(order => {
		if (order.id === orderId) {
			matchingOrder = order;
		}
	});

	return matchingOrder;
}
