export function renderCheckoutHeader() {
	const cartQuantity = calculateCartQuantity();
	document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}
