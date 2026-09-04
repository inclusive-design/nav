# Inclusive Disclosure Navigation

Web component implementation of the [disclosure navigation menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/).

## Usage

To use the `incd-nav` web component, include it in your HTML via a content delivery network (CDN):

```html
<script src="https://unpkg.com/@inclusive-design/nav/dist/bundle.js" type="module"></script>
<link rel="stylesheet" href="https://unpkg.com/@inclusive-design/nav/dist/bundle.css" />
```

Or install it with npm and include the installed package in your HTML:

```npm install --save @inclusive-design/nav```

```html
<script src="node_modules/@inclusive-design/nav/dist/bundle.js" type="module"></script>
<link rel="stylesheet" href="node_modules/@inclusive-design/nav/dist/bundle.css" />
```

Use the `<incd-nav>` element to wrap a `<nav>` element which includes a nested
unordered list of links.

```html
<incd-nav>
    <nav>
        <ul>
            <li>
                <a href="#about">About</a>
                <ul>
                    <li><a href="#1">About 1</a></li>
                    <li><a href="#2">About 2</a></li>
                    <li><a href="#3">About 3</a></li>
                </ul>
            </li>
            <li>
                <a href="#products">Products</a>
                <ul>
                    <li><a href="#1">Products 1</a></li>
                    <li><a href="#2">Products 2</a></li>
                    <li><a href="#3">Products 3</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</incd-nav>
```

The web component will add buttons to expand and collapse the submenus based on
the hybrid [disclosure navigation menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/)
pattern and attach event handlers for click, <kbd>ESC</kbd> and blur events to
collapse/expand menus as appropriate.

To include an SVG icon in the buttons, set it by passing an SVG element using
the icon property:

```html
<incd-nav
    icon="<svg width='24' height='25' aria-hidden='true' role='presentation' fill='none'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9.5 6 6 6-6'></path></svg>">
```
