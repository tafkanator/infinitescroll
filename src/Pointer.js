export default class Pointer {

	constructor(node) {
		// store vars
		this.node = node;

		// calculated vars
		this.isPointerDown = false;
		this.isTouchPointerDown = false;

		this.startX = 0;

		return {
			onDown: this.onDown.bind(this),
			onMove: this.onMove.bind(this),
			onUp: this.onUp.bind(this),
		};
	}

	onDown(callback) {
		this.node.addEventListener('touchstart', (e) => {
			e.stopPropagation();
			this.isPointerDown = true;
			this.isTouchPointerDown = true;

			this.startX = e.touches[0].clientX;
			this.movedX = 0;

			callback();
		});
	}

	onMove(callback) {
		this.node.addEventListener('touchmove', (e) => {
			e.stopPropagation();
			e.preventDefault();

			if (!this.isPointerDown) {
				return;
			}

			const newMovedX = Math.round(e.touches[0].clientX - this.startX);

			if (newMovedX !== this.startX) {
				this.movedX = e.touches[0].clientX - this.startX;

				callback(this.movedX);
			}
		});
	}

	onUp(callback) {
		this.node.addEventListener('touchend', (e) => {
			e.stopPropagation();

			this.isPointerDown = false;
			this.isTouchPointerDown = false;

			callback(this.movedX);

			this.movedX = 0;
		});
	}
}

