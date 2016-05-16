# typedreamer
The easiest plugin for web typography.

# Installation

```bash
bower install typedreamer
```

# Online Demo
[Click here to try example](https://jsfiddle.net/6gkaxvwL/18)

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
Typedreamer::apply($text, $options);
```
