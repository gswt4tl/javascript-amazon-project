import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';

async function loadPage() {
	try {
		// throw 'error1';
		await Promise.all([loadProductsFetch(), loadCartFetch()]);

		// await new Promise(resolve => {
		// 	// throw 'error2';
		// 	loadCart(() => {
		// 		// reject('error3');
		// 		resolve();
		// 	});
		// });
	} catch (error) {
		console.log('Unexpected error. Please try again later.');
	}

	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
}

loadPage();

/*
Promise.all([
	loadProductsFetch(),
	new Promise(resolve => {
		loadCart(() => {
			resolve();
		});
	}),
]).then(() => {
	renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
});
*/
