# Animate SVG

A simple script to add small animations to SVG's that fires when the SVG is in view.

## Installation
Add `src/js/animate-svg.js` to your concat pipeline. It needs Babel to be compiled to ES5 if needed. Or you can just include it in a script tag in the HTML:
```html
<script src="/.../animate-svg.js"></script>
```

Then add either the `src/scss/animate-svg.scss` or `src/less/animate-svg.less` file to your compiler, or if you want to use just css include `src/css/animate-svg.css` or `src/css/animate-svg.min.css` in the head of the HTML document:
```html
<link rel="stylesheet" type="text/css" href="/.../animate-svg.css" />
<!-- or if you want minified -->
<link rel="stylesheet" type="text/css" href="/.../animate-svg.min.css" />
```

## Usage
To get an SVG to work with the script you'll need to add the `animate-svg` class to it. Then to all children you wish to animate add the class `animate-svg-child`. For example:

```html
<svg class="animate-svg" width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill="red" d="M0 0h200v200H0z" />
	<path class="animate-svg-child" fill="#00F" d="M30 30h140v140H30z" />
</svg>
```

Currently not a whole lot will happen. But there are a few options to activate the animations:
| data-attribute | values | default | set to | explanation |
| :------------- | :----- | :-----: | :-----: | :----- |
| `data-animate-opacity` | `"true"`, `"false"` | `"false"` | parent | This enables the selected children to animate based on opacity |
| `data-animate-offset-x` | `"true"`, `"false"` | `"false"` | parent | This enables the selected children to animate on the X plane. Change how much in the CSS file |
| `data-animate-offset-y` | `"true"`, `"false"` | `"false"` | parent | This enables the selected children to animate on the Y plane. Change how much in the CSS file |
| `data-animate-speed` | `"fast"`, `"medium"`, `"slow"` | `"slow"` | parent | This tells the script how fast to animate, and when the next child can go. Change the speeds in the CSS file, the script will automatically adjust the timing to the transition duration you configure in the css file. |
| `data-animate-group` | Any group ID, don't use `"0"`, `"false"` or any other value JS will interpret as false | None | child | This allows you to animate multiple paths, circles etc together. Will animate the entire group as soon as the first group member is called. |
| `data-animate-max-opacity` | Any value from `"0"` to `"1"` | None | child | Normally when using `data-animate-opacity` it will animate the child from 0 to 1 opacity. By setting this value to the child it overwites the max opacity it can animate to. |
---
### Notes
> In the table above, parent describes the `<svg>` tag you added the `animate-svg` class to. Child refers to any path, line or other item in the `<svg>` tag that you have added the `animate-svg-child` class to.

> Children animate based on their position in the HTML. The first child in the HTML will animate first (and it's group members at the same time). While one lower will animate later.

> Animations will fire once the SVG is in view for more than half its height. Or if it was already in view when the page was (re)loaded.

## Example
This SVG should animate opacity and offset-y, animate two blue squares simultaniously and set the max opacity of the green square to 0.5. All at a medium pace:
```html
<svg class="animate-svg" data-animate-opacity="true" data-animate-offset-y="true" data-animate-speed="medium" width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill="red" d="M0 0h200v200H0z" />
	<path class="animate-svg-child" data-animate-group="blue" fill="#00F" d="M105 105h70v70h-70z" />
	<path class="animate-svg-child" fill="#FF0" d="M25 105h70v70H25z" />
	<path class="animate-svg-child" data-animate-max-opacity="0.5" fill="green" d="M105 25h70v70h-70z" />
	<path class="animate-svg-child" data-animate-group="blue" fill="#00F" d="M25 25h70v70H25z" />
</svg>
```

Will result in an animation like this:

<img src="animate-svg-example.gif" />