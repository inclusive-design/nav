import { Elena, html } from '@elenajs/core';

export default class Nav extends Elena(HTMLElement) {
	static tagName = 'incd-nav';
	static events = ['blur'];
	static props = [{ name: 'icon', reflect: false }];
	icon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" aria-hidden="true" role="presentation" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9.5 6 6 6-6"></path></svg>`;

	connectedCallback() {
		const submenuLinks = this.querySelectorAll('li:has(ul) > a');
		const dropdownContainers = this.querySelectorAll('li:has(ul)');

		for (const link of submenuLinks) {
			const button = document.createElement('button');
			button.setAttribute('aria-expanded', false);
			button.setAttribute('aria-label', link.textContent);
			button.innerHTML = this.icon;
			link.after(button);
			button.addEventListener('click', this._onClick);
		}

		for (const container of dropdownContainers) {
			const elements = container.querySelectorAll('a, button');
			for (const element of elements) {
				element.addEventListener('blur', this._onBlur);
			}
		}

		document.addEventListener('click', this._onDocumentClick);
		document.addEventListener('keyup', this._onKeyUp);

		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		const buttons = this.querySelectorAll('[aria-expanded]');
		const dropdownContainers = this.querySelectorAll('li:has(ul)');

		for (const button of buttons) {
			button.removeEventListener('click', this._onClick);
		}

		for (const container of dropdownContainers) {
			const elements = container.querySelectorAll('a, button');
			for (const element of elements) {
				element.removeEventListener('blur', this._onBlur);
			}
		}

		document.removeEventListener('click', this._onDocumentClick);
		document.removeEventListener('keyup', this._onKeyUp);
	}

	collapseButtons = () => {
		const buttons = this.querySelectorAll('[aria-expanded="true"]');
		for (const button of buttons) {
			button.setAttribute('aria-expanded', false);
		}
	};
	_onClick = (event) => {
		const button = event.target.closest('button');
		const ariaExpanded = button.getAttribute('aria-expanded') === 'true' || false;
		if (!ariaExpanded) {
			this.collapseButtons();
		}

		button.setAttribute('aria-expanded', !ariaExpanded);
	};
	_onDocumentClick = (event) => {
		event.preventDefault();
		if (!event.target.closest('incd-nav [aria-expanded]')) {
			this.collapseButtons();
		}
	};
	_onKeyUp = (event) => {
		if (event.key === 'Escape') {
			this.collapseButtons();
		}
	};
	_onBlur = (event) => {
		if (event.target?.closest('li:has(ul)') !== event.relatedTarget?.closest('li:has(ul)')) {
			this.collapseButtons();
		}
	};
}

Nav.define();
