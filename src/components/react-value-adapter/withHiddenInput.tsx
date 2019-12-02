import * as React from 'react'
import { forwardRef } from 'react'
import { defaultValuePropFor as defaultValuePropFor, getValueProp } from './valueProps'

import { ValueProp } from './ValueProp'

export interface WithHiddenInputOptions {
  readonly valueForHidden?: any
  readonly valueProp?: ValueProp
  readonly hiddenValueProp?: ValueProp
  readonly hiddenOrder?: 'before' | 'after'
}

export interface WithHiddenInputProps {
  readonly name: string
  readonly valueForHidden?: any
}

// TODO: How do we pass the typings of Child up through withHiddenInput like forwardRef does? Probabyl just need to add generics?

/**
 * Helps translates between component state and (hidden) form values.
 * 
 * Wraps a component, adding a hidden input whose value can get submitted with
 * the form if submitting the form normally (as opposed to submitting the
 * internal state of a component via XHR).
 * 
 * Useful for:
 * - components that provide the UI for a form field but don't provide any
 *   submittable input field (like ToggleButtonGroup)
 *   - In this case, the new wrapper component accepts a name prop, even though
 *     the wrapped component does not.
 * - components like checkboxes that would otherwise only submit their value if
 *   they are *checked*, but otherwise would not submit any value, which makes it
 *   impossible to uncheck them by submitting the form to the server.
 *   - In this case, the new wrapper component renders a hidden input with the
 *     *same* name as the wrapped component's input and a hard-coded default value
 *     that represents the value when *unchecked*. When the wrapped component is
 *     checked, its checked value overrides that default value.
 *     This is the same thing that Rails does (https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-check_box)
 *   - valueProp/value/defaultValue aren't really used in this case; we simply
 *     pass on value and defaultValue as-is (although checkboxes use neither; they
 *     use a `checked` prop rather than `value`)
 *
 * When wrapping a *controlled* component, the wrapped component passes its
 * current `value` up via callback, for our parent to store in its state. Our
 * parent then passes its current value back down as `value`. Because the
 * current value is always available via the value prop, we don't need to store
 * any state here ourselves. That is, if we are wrapping a controlled
 * component, this wrapper component is itself a controlled (pass-through)
 * component, controlled by our parent.
 *
 * When wrapping an *uncontrolled* component, we will use the `defaultValue`
 * from our parent for both the hidden input as well as the wrapped component.
 * 
 * @argument Child
 * @argument options:
 * - valueForHidden: Fixed value to use for the hidden input. Only use this if
 *   you want it to be hard-coded (fixed); otherwise just uses current
 *   value/defaultValue of Child
 * - valueProp: The name of the prop through which the "value" will be passed to
 *     both the hidden input and the Child component.
 * - hiddenOrder ('before' or 'after'): The order in which to place the hidden input.
 *   - 'before' (default): By default, this hidden input is added *before* the
 *     wrapped component, ensuring that its value is only used in the case where
 *     the wrapped component does not provide an input with the same name.
 *   - 'after': hidden input is added *after* the wrapped component, ensuring
 *     that its value *overrides* and is used *instead* of any value that would
 *     have been used from an input provided by the wrapped component.
 * 
 * @see: withAdaptValue
 */
export function withHiddenInput(
  Child: React.ComponentType,
  {
    valueForHidden: fixedValueForHidden = undefined,
    valueProp: outerValueProp = 'value',
    hiddenValueProp = undefined, // default value set below
    hiddenOrder = 'before',
  }: WithHiddenInputOptions = {},
) {
  return forwardRef<any, any /*WithHiddenInputProps*/>(function withHiddenInput({
    name,
    valueForHidden,
    ...props
  }, ref) {
    const {value, valueProp, explicitValue, defaultValueProp, defaultValue} = getValueProp(props, outerValueProp)

    hiddenValueProp = defaultHiddenValueProp(valueProp)
    valueForHidden = valueForHidden ?? fixedValueForHidden ?? value

    const hidden = (
      <input
        {...{
          [hiddenValueProp]: valueForHidden || '',
        }}
        type="hidden"
        name={name}
      />
    )
    const wrapped = (
      <Child
        {...props}
        {...{
          [valueProp]: value,
        }}
        name={name}
        ref={ref}
      />
    )

      if (hiddenOrder == 'before') {
        return (<>
          {hidden}
          {wrapped}
        </>)
      } else {
        return (<>
          {wrapped}
          {hidden}
        </>)
      }
  })
}
export default withHiddenInput

// Hidden inputs can only have a value passed to it via 'value' or
// 'defaultValue', so if we're using something different (like 'checked') for
// the wrapped component, make sure we just use plain old 'value' for the
// hidden.
export function defaultHiddenValueProp(valueProp: ValueProp) {
  switch (valueProp) {
    case 'value':
    case 'defaultValue':
      return valueProp
    default:
      return 'value'
  }
}
