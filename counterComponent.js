class Counter {
	constructor(initial = 0) {
		this._count = initial;
	}

	increment() {
		this._count++;
	}

	decrement() {
		this._count--;
	}

	getCount() {
		return this._count;
	}

	setCount(newCount) {
		this._count = newCount;
	}
}

// Export the counter class (or the factory function)
export { Counter }; 
