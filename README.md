# Frontend Mentor - Coffeeroasters subscription site solution

This is a solution to the [Coffeeroasters subscription site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/coffeeroasters-subscription-site-5Fc26HVY6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements throughout the site
- Make selections to create a coffee subscription and see an order summary modal of their choices

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

The specs required that the social icons change into a different color when hovered. I could have put the actual svg code of the icons inline in my html, then target the fill property within a :hover selector in CSS to change their color. But I didn't want to clutter my html code with the svg code of the icons. So instead I used SVG filters.

First I defined my social icons and wrapped each of them in a span.

```html
<span class="SocialIconWrapper">
    <img src="/assets/shared/desktop/icon-facebook.svg" alt="Facebook Icon" />
</span>
<span class="SocialIconWrapper">
    <img src="/assets/shared/desktop/icon-instagram.svg" alt="Instagram Icon" />
</span>
<span class="SocialIconWrapper">
    <img src="/assets/shared/desktop/icon-instagram.svg" alt="Instagram Icon" />
</span>
```

Then I created filters.svg which will contain the svg code for the filter. The icons need to change to a light orange color (#FDD6BA). So I converted the hex value to rgb (253, 214, 186) and divided each value by 255 to get the floating point representation of 0.99, 0.84, 0.73 respectively. I used feColorMatrix filter here and placed the floating point numbers in the correct channels.

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="socialIconHoverFilter">
            <feColorMatrix
                color-interpolation-filters="sRGB"
                type="matrix"
                values="0.99 0 0 0 0
                        0 0.84 0 0 0
                        0 0 0.73 0 0
                        0 0 0 1 0 "
            />
        </filter>
    </defs>
</svg>
```

Then in CSS, I used the filter property and pointed it to the filters.svg file.

```css
.SocialIconWrapper:hover {
    filter: url('filters.svg#socialIconHoverFilter');
}
```

Another thing I learned is to implement an accordion or toggle using the <details> and <summary> elements.

```html
<details>
    <summary>Want us to grind them?</summary>
    <ul class="Options__list">
        <li id="grindWholeBean" class="OptionsItem" data-grind="wholebean">
            <button
                type="button"
                class="OptionsWrapper"
                aria-label="Button to select wholebean option"
            >
                <p class="OptionsItem__title">Wholebean</p>
                <p class="OptionsItem__description">
                    Best choice if you cherish the full sensory experience
                </p>
            </button>
        </li>
        <!--  The rest of the list items...  -->
    </ul>
</details>
```

Some workaround had to be made in order to disable the <details> element since the standard attribute disable does not apply to it. To disable it, I had to add an event listener to its click event and then call preventDefault() to stop its default behavior of opening the details/toggle. To re-enable it, the event listener is removed via removeEventListener(). It was important to pass the exact same function reference (disableToggle) used in addEventListener().
To prevent keyboard focus while disabled, attribute tabindex with value -1 is added to the <details> element and its opacity is set to 0.5 in CSS.

```js
function disableDetails(details) {
    details.open = false;
    details.addEventListener('click', disableToggle);
    details.setAttribute('data-disabled', true);
    //prevent keyboard focus
    details.querySelector('summary').setAttribute('tabindex', -1);
}

function enableDetails(details) {
    details.removeEventListener('click', disableToggle);
    details.removeAttribute('data-disabled');
    details.querySelector('summary').removeAttribute('tabindex');
}

function disableToggle(event) {
    event.preventDefault();
}
```

```css
details[data-disabled='true'] {
    opacity: 0.5;
}
```

### Continued development

This project served as a quick refresher on layouts, CSS, Javascript after not being able to work on any web development projects for over two months. On succeeding projects, I would like to focus more on backend work.

### Useful resources

- [The Many ways to Change an SVG Fill on Hover](https://css-tricks.com/the-many-ways-to-change-an-svg-fill-on-hover-and-when-to-use-them/#:~:text=Those%20interactions%20include%20changing%20color,awesome%20powers%20of%20SVG%20more.&text=Target%20the%20.,hover%20state%20to%20swap%20colors.&text=This%20is%20by%20far%20the,it's%20not%20an%20inline%20SVG?) - This helped me with SVG Filters.

## Author

- Website - [jezzydev](https://github.com/jezzydev)
- Frontend Mentor - [@jezzydev](https://www.frontendmentor.io/profile/jezzydev)
