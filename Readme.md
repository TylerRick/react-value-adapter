# react-value-adapter

[![npm version](https://badge.fury.io/js/react-value-adapter.svg)](https://badge.fury.io/js/react-value-adapter)

Map/adapt a component's `value`/`onChange` props using a Map or function.

# Getting started

```
yarn add react-value-adapter
```

# Usage

## [Tri-state checkbox](https://www.npmjs.com/package/mui-tri-state-checkbox)

Let's say you have a tri-state enum field in your database, whose values can be one of 'never', 'sometimes', or 'always'.

But your [tri-state checkbox](https://www.npmjs.com/package/mui-tri-state-checkbox) requires its value prop to be one of `false`, `null`, or `true`, respectively.

So you have to convert between the value from your database and the value required by your child component.

You would use a mapping like this:
- `"never"` maps to `false`
- `"sometimes"` maps to `null`
- `"always"` maps to `true`

Sure, you could write your own conversion logic in the parent component. But keep in mind that you not only have to map *from* the parent value, you also have to take the value provided to the child component's onChange handler and map it *back to* a parent value.

`react-value-adapter` encapsulates that concern, providing an adapter
component that maps between the values required by one component and those
required by the other component (both directions).

You tell it what mapping to use, and how to extract the `value` out of the `onChange` handler, and it handles the rest:

Example:
```js
const onChangeAdapterTriStateCheckbox = (onChangeFromParent, parentToChildValues) => (
  (event, checked) => {
    if (!onChangeFromParent) return
    const parentValue = parentToChildValues.get(checked)
    onChangeFromParent(parentValue, checked)
  }
)

const parentToChildValues = new Map([
  ['never',     false],
  ['sometimes', null],
  ['always',    true],
])
```
```jsx
        <AdaptValue
          // How to extract the value out of the onChange handler
          onChangeAdapter={onChangeAdapterTriStateCheckbox}
          // What mapping to use
          parentToChildValues={parentToChildValues}

          // The props that you would like to be able to just pass to your child
          // component
          childValueProp='checked'
          value={parentValue}
          onChange={(parentValue, childValue) => {
            setChildValue(childValue)
            setParentValue(parentValue)
          }}
        >
          {({checked, onChange}) => (<>
            <MuiTriStateCheckbox
              value="value"
              checked={checked}
              onChange={onChange}
            />
          </>)}
        </AdaptValue>
```

At this point you're probably thinking that seems a bit verbose for what it's trying to do. Couldn't we extract things further to make this even simpler and cleaner?

And the answer is yes, of course we can. This child-as-a-function option is
the most flexible approach, but it tends to be kind of verbose. Read on for
some other options...

## Extracting an adapter component using higher-order component / currying

What if we could create a new component *based* on another component, and it would automatically convert between values of one type (the values our parent component provides) and the values our child component expects?

Then we could easily reuse it anywhere in our app without having to pass all the adapter configuration around each time we used it (like we would if we were using `<AdaptValue>` directly).

How about something like this?
```js
export const MuiTriStateCheckbox_MappedValues = withAdaptValue(MuiTriStateCheckbox, {
    parentValueProp: 'value',
    childValueProp: 'checked',
    onChangeAdapter,
  }
)
```
or even:
```js
export const AlwaysSometimesNever_MuiTriStateCheckbox = withAdaptValue(MuiTriStateCheckbox, {
    parentValueProp: 'value',
    childValueProp: 'checked',
    onChangeAdapter,
    parentToChildValues: parentToChildValues
  }
)
```

This example says "I want a component that is the `MuiTriStateCheckbox` except that it accepts a `value` and translates it to a `checked` prop that gets passed to the underlying `MuiTriStateCheckbox`. It extracts the value from the onChange handler thusly."

The `withAdaptValue` [higher-order component](https://reactjs.org/docs/higher-order-components.html) returns an adapted component according to the configuration given.

It can then be used like a stand-in for the original `MuiTriStateCheckbox`:

```jsx
        <AlwaysSometimesNever_MuiTriStateCheckbox
          value={map_parentValue}
          onChange={(parentValue, checked) => { setParentValue(parentValue); setChecked(checked) } }
        />
```

... with the values transparently being converted between your "parent value" domain and the "child value" domain, and the name of the value prop translated as you specified, all in the background. You wouldn't even have to notice or care that that's what it's doing for you.

# Other examples

## Checkbox

Let's say you have a checkbox and you want to map a 'yes' value to checked={true} in the checkbox.

(To do: simplify and explain)

```jsx
        <AdaptValue
          onChangeAdapter={onChangeAdapterUsingMapFromChecked}
          parentToChildValues={check_parentToChildValues}
          childValueProp={'checked'}
          value={check_parentValue}
          onChange={(parentValue, childValue) => {
            check_setChildValue(childValue)
            check_setParentValue(parentValue)
          }}
        >
          {({parentValue, childValue, onChange}) => (<>
            <label>
              <input type="checkbox" name="check_demo"
                checked={childValue}
                onChange={onChange}
              />
              Checkbox
            </label>
            (parentValue: {JSON.stringify(parentValue)}, childValue: {JSON.stringify(childValue)})
          </>)}
        </AdaptValue>
```


## Other examples
See the demo (`yarn start`) for more examples.


## Use composition: create your own wrapper components

To avoid duplication, you can wrap `<AdaptValue>` in your own wrapper component:

```js
function Rot13ValueAdapter(props) {
  return (
    <AdaptValue
      parentToChildValue={rot13}
      onChangeAdapter={onChangeForParent => ({ target: { value } }) => onChangeForParent(rot13(value), value)}
      {...props}
    />
  )
}

        <Rot13ValueAdapter
          onChange={(parentValue, value) => { setParentValue(parentValue) }}
          value={text_parentValue}
        >
          {({childValue, onChange}) => (<>
            <input type="text"
              value={childValue}
              onChange={onChange}
            />
          </>)}
        </Rot13ValueAdapter>
```

...

If you need even more control, you can use the provided `useAdaptValue` hook.



# API reference
(Coming soon!)

## Value adapters

```
useAdaptValue
<AdaptValue>
<AdaptValue_>

```

## HiddenInput

```
withHiddenInput
```

## StateWrapper

```
      <StateWrapper defaultValue="text">
        {({onChange, ...props}) => (
          <input type="text" {...props} onChange={({target: {value}}) => onChange(value)} />
        )}
      </StateWrapper>
```


# Frequently anticipated questions

## Why is a `Map` used for the mapping instead of a regular object literal?

Because object literals only support string keys and we want to be able to
map between any object and any object. That is exactly what a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) gives us.

## Should I use `AdaptValue` or `AdaptValue_`?

You should probably use `AdaptValue`.
`AdaptValue_` is an [injector
component](https://medium.com/@kylpo/a-naming-convention-for-injector-components-c421a07debe5) and
provides a more concise syntax. That is its main advantage. Its disadvantages are:

1. It is inflexibile. You can't, for example, wrap multiple elements.
2. It is harder to understand
3. Since it uses `React.cloneElement`, it adds no new components/elements to the tree, so if you
   inspect it in the React Components dev tool, you may be surprised to see `AdaptValue_` listed in
   the tree — without any children. Your child component won't be listed because this component
   takes its place.

`AdaptValue` uses the "children as function" pattern, which means you have to provide a children prop
that is a function. That function, when called, can return any elements, it is more flexible than
the injector component pattern.

The `AdaptValue` option is also more explicit: You can see exactly which values are yielded to your
children, and you are responsible for connecting those values to your child element(s), which makes
it easier to follow the flow of data and understand what it is doing.

# Contributing

Pull requests welcome!

# To do

See [to-do](/ToDo.md) list or list of open issues.

# License

This project is free software, licensed under the terms of the [MIT license](/License).

