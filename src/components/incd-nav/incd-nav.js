import { Elena, unsafeHTML, nothing } from '@elenajs/core';

export default class Nav extends Elena(HTMLElement) {
	static tagName = 'incd-nav';
	static events = ['blur'];
	static props = [{ name: 'icon', reflect: false }];
	#collapseButtons = () => {
		const buttons = this.querySelectorAll('[aria-expanded="true"]');
		for (const button of buttons) {
			button.setAttribute('aria-expanded', false);
		}
	};
	#onClick = (event) => {
		const button = event.target.closest('button');
		const isAriaExpanded = (button.getAttribute('aria-expanded') === 'true');
		if (!isAriaExpanded) {
			this.#collapseButtons();
		}

		button.setAttribute('aria-expanded', !isAriaExpanded);
	};
	#onDocumentClick = (event) => {
		event.preventDefault();
		if (!event.target.closest('incd-nav [aria-expanded]')) {
			this.#collapseButtons();
		}
	};
	#onKeyUp = (event) => {
		if (event.key === 'Escape') {
			this.#collapseButtons();
		}
	};
	#onBlur = (event) => {
		if (event.target?.closest('li:has(ul)') !== event.relatedTarget?.closest('li:has(ul)')) {
			this.#collapseButtons();
		}
	};
	icon = '<svg width=\'24\' height=\'25\' aria-hidden=\'true\' role=\'presentation\' fill=\'none\'><path stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m6 9.5 6 6 6-6\'></path></svg>';

	connectedCallback() {
		const submenuLinks = this.querySelectorAll(':scope li:has(ul) > a');
		const dropdownContainers = this.querySelectorAll('li:has(ul)');

		for (const link of submenuLinks) {
			const button = document.createElement('button');
			const id = Math.random().toString(36).slice(2, 9);
			const controlledElement = link.nextElementSibling;
			controlledElement.id = id;
			button.setAttribute('aria-expanded', false);
			button.setAttribute('aria-label', link.textContent);
			button.setAttribute('aria-controls', id);
			button.innerHTML = this.icon ? unsafeHTML(this.icon) : nothing;
			link.after(button);
			button.addEventListener('click', this.#onClick);
		}

		for (const container of dropdownContainers) {
			const elements = container.querySelectorAll('a, button');
			for (const element of elements) {
				element.addEventListener('blur', this.#onBlur);
			}
		}

		document.addEventListener('click', this.#onDocumentClick);
		document.addEventListener('keyup', this.#onKeyUp);

		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		const buttons = this.querySelectorAll('[aria-expanded]');
		const dropdownContainers = this.querySelectorAll('li:has(ul)');

		for (const button of buttons) {
			button.removeEventListener('click', this.#onClick);
		}

		for (const container of dropdownContainers) {
			const elements = container.querySelectorAll('a, button');
			for (const element of elements) {
				element.removeEventListener('blur', this.#onBlur);
			}
		}

		document.removeEventListener('click', this.#onDocumentClick);
		document.removeEventListener('keyup', this.#onKeyUp);
	}
}

Nav.define();
