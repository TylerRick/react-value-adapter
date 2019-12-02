- Refactor how props are passed through from <AdaptValue> so that you can just {...spread} them to child
- Add more complete documentation
- Generate API docs (maybe use styleguideist)
- Add tests: start by converting each/most of the demo examples into tests

Lower:
- Add more complete TypeScript support
- Find and address any TODOs I have left around

# Separate adapters concerns
... to make them more composable/reusable

Add generic adapters for common field types (text/default, checkbox, radio?, select?) similar to fieldProps.ts
These could be useful in themselves without even using AdaptValues.
Just spread them into your input, like
```
<input {...checkboxProps({onChange})} />
```
... where onChange is a handler that expects checked arg, and doesn't have to extract event.target.checked

Or compose them with value adapters, like:
```
<input {...adaptValue(checkboxProps({onChange}), childValueProp: 'checked')} />
```

Consider making useAdaptValue hook / a simple spread function like above the preferred API instead of wrapping in an extra AdaptValues component.

# Refactor demos

Use something like styleguideist or storybook.

Create a different component for each demo instead of one giant one; then we wouldn't need `tri_` prefix; too easy to have copy and paste errors due to different prefix

Don't duplicate the props between AdaptValue and `AdaptValue_`, etc. ?

Instead of all of them on one page, consider splitting them into smaller pages

Add demo for useAdaptValue, withAdaptValue

Have a ref/focus test for each example to be able to prove that refs are passed through for all
variants. (And/or do the same via automated tests.)

Allow doing a submit test in isolation (single value) to make sure the uncontrolled variants submit
the expected value.

Publish demo dir to codesandbox (using git source, not copy and paste)

# Add MapValue variant of AdaptValue

Add withMappedValues, MapValues as specialized sub-case of AdaptValue that *does* require childToParentValues to be passed in

Change generic MapValues to *forbid* it from being passed in
