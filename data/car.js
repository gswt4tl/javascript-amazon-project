class Car {
	#brand;
	#model;
	speed = 0;
	isTrunkOpen = false;

	constructor(carDetails) {
		this.#brand = carDetails.brand;
		this.#model = carDetails.model;
	}

	displayInfo() {
		console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk is open: ${this.isTrunkOpen}`);
	}

	go() {
		if (!this.isTrunkOpen) {
			this.speed += 5;
		}

		if (this.speed > 200) {
			this.speed = 200;
		}
	}

	brake() {
		this.speed -= 5;

		if (this.speed < 0) {
			this.speed = 0;
		}
	}

	openTrunk() {
		if (this.speed === 0) {
			this.isTrunkOpen = true;
		}
	}

	closeTrunk() {
		this.isTrunkOpen = false;
	}
}

const toyota = new Car({
	brand: 'Toyota',
	model: 'Corolla',
});

const tesla = new Car({
	brand: 'Tesla',
	model: 'Model 3',
});

class RaceCar extends Car {
	acceleration;

	constructor(carDetails) {
		super(carDetails);
		this.acceleration = carDetails.acceleration;
	}

	displayInfo() {
		console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
	}

	go() {
		if (this.speed + this.acceleration <= 300) {
			this.speed += this.acceleration;
		}
	}

	openTrunk() {
		return;
	}

	closeTrunk() {
		return;
	}
}

const mclaren = new RaceCar({
	brand: 'McLaren',
	model: 'F1',
	acceleration: 20,
});
