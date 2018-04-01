# no-autofocus

Enforce that autofocus is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.

#### References
1. [w3c](https://w3c.github.io/html/sec-forms.html#autofocusing-a-form-control-the-autofocus-attribute)

## Rule details

This rule takes one optional object argument of type object:

```
{
    "rules": {
        "vue/no-autofocus": [ 2, {
            "ignoreNonDOM": true
        }],
    }
}
```

For the `ignoreNonDOM` option, this determines if developer created components are checked.

### Succeed
```html
<div />
```

### Fail
```html
<div autofocus />
<div autofocus="true" />
<div autofocus="false" />
<div v-bind:autofocus="undefined" />
```

## :wrench: Options

This rule has an object option:
- `"ignoreNonDOM"`: `false` (default) enables the check on custom components.

```json
{
  "vue/no-autofocus": [2, {
    "ignoreNonDOM": true
  }]
}
```
