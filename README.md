# typedreamer
The easiest plugin for web typography.

# Installation

```bash
bower install typedreamer

or

npm install typedreamer
```

# Online Demos

## JS
[Click here to try example](https://jsfiddle.net/6gkaxvwL/21)

## PHP (no recursion)
[Click here to try example](http://sandbox.onlinephpfunctions.com/code/2988b76bd1f5c9a59ce9f5b757816aab30816173)

# Usage

## JS Pure
```js
var options = {
  breakable: true; // false => insert &nbsp;
};
new Typedreamer(element, text, options);
```

## jQuery
```js
$(element).typedreamer(text, options); // options is not required
```

## PHP
```php
<?php echo Typedreamer::apply($text, $options);?>
```
