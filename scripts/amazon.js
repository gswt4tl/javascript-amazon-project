import { addToCart, calculateCartQuantity } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
	let productsHTML = '';

	const url = new URL(window.location.href);
	const search = url.searchParams.get('search');

	let filteredProducts = products;

	if (search) {
		filteredProducts = products.filter(product => {
			let matchingKeyword = false;

			product.keywords.forEach(keyword => {
				if (keyword.toLowerCase().includes(search.toLowerCase())) {
					matchingKeyword = true;
				}
			});

			return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
		});
	}

	filteredProducts.forEach(product => {
		productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart added-to-cart-${product.id}"></div>

            <button class="js-add-to-cart add-to-cart-button button-primary"
            data-product-id="${product.id}">
            Add to Cart
            </button>
        </div>`;
	});

	document.querySelector('.js-products-grid').innerHTML = productsHTML;

	updateCartQuantity();

	let timeoutId;
	document.querySelectorAll('.js-add-to-cart').forEach(button => {
		button.addEventListener('click', () => {
			const { productId } = button.dataset;
			addToCart(productId);
			updateCartQuantity();
			displayAddedMessage(timeoutId, productId);
		});
	});

	document.querySelector('.js-search-button').addEventListener('click', () => {
		const search = document.querySelector('.js-search-bar').value;
		window.location.href = `amazon.html?search=${search}`;
	});

	document.querySelector('.js-search-bar').addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			const search = document.querySelector('.js-search-bar').value;
			window.location.href = `amazon.html?search=${search}`;
		}
	});
}

function updateCartQuantity() {
	const cartQuantity = calculateCartQuantity();

	document.querySelector('.js-cart-quantity').innerHTML = cartQuantity > 0 ? `${cartQuantity}` : '';
}

function displayAddedMessage(timeoutId, productId) {
	const addedMessage = document.querySelector(`.added-to-cart-${productId}`);

	addedMessage.innerHTML = '<img src="images/icons/checkmark.png">Added';
	addedMessage.classList.add('added-to-cart-visible');

	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		addedMessage.classList.remove('added-to-cart-visible');
	}, 2000);
}
