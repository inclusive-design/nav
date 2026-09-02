import { Elena } from '@elenajs/core';

export default class NavWrapper extends Elena(HTMLElement) {
	static tagName = 'incd-nav-wrapper';
	static events = ['blur'];

	connectedCallback() {
		super.connectedCallback();
		const elements = this.querySelectorAll('a, button');
		for (const element of elements) {
			element.addEventListener('blur', this._onBlur);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		const elements = this.querySelectorAll('a, button');
		for (const element of elements) {
			element.addEventListener('blur', this._onBlur);
		}
	}

	_onBlur = (event) => {
		if (!this.contains(event.relatedTarget)) {
			const collapseAll = new Event('collapseAll');
			const navButton = this.querySelector('incd-nav-button');
			navButton.dispatchEvent(collapseAll);
		}
	};
}

NavWrapper.define();
