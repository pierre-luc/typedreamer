# typedreamer
The better plugin for radical web typography.

# Online Demo
[Click here](https://jsfiddle.net/6gkaxvwL/18)

## Example

```html
<div class="textA"></div>
<div class="textB"></div>

<p class="textB" data-typedream-me data-breakable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa aliquid adipisci, unde fugiat aperiam odit? Suscipit dolores reiciendis aliquid accusamus at similique commodi animi dolore quia, omnis, illum saepe esse!</p>

```

```js
$(".textA").typedreamer("Hello WOrld !");
$(".textB").typedreamer("Hello WOrld !", {
	breakable: true
});
```
