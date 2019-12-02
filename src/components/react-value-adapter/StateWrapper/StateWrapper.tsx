import * as React from 'react';
import { forwardRef, useState } from 'react';
import { warning, invariant } from 'hey-listen'
import { ValueProp } from '../ValueProp';

/**
 * Turns an uncontrolled component into a controlled component.
 * 
 * Wraps an uncontrolled child component with a stateful (uncontrolled)
 * component, which controls the child (sets child's value based on its state),
 * making the child component a *controlled* component.
 * 
 * The provided value is used as default value for new component's state.
 * 
 * Returns a new stateful (uncontrolled) component. It is *still* an uncontrolled
 * component as far as the parent/consumer is concerned. Only the *child* will be
 * controlled.
 * 
 * This adapter can be used anywhere you have a child element that needs to be
 * controlled but a parent element that does not want that responsibility (does
 * not want to manage its own state) and only needs/wants to provide an initial
 * (default) value.
 * 
 * One use for this is to force the child (and its children) to re-render
 * whenever its value changes.
 * 
 * @see withStateWraper, StateWrapper_
 * @param options 
 */
export function StateWrapper(
  {
    parentValueProp = 'defaultValue',
    childValueProp = 'value',
    children,
    ...props   // TODO: Only allow defaultValue, defaultChecked, etc.
  }: {
    parentValueProp?: ValueProp,
    childValueProp?: ValueProp,
    children: (props) => React.ReactElement,
    [key: string]: any,
  } = {} as any
) {
  const defaultValue = props[parentValueProp]
  delete props[parentValueProp]

  const [value, setValue] = useState(defaultValue)
  // console.log(defaultValue, value)

  const keys = Object.keys(props)
  invariant(keys.length == 0, `props should only include ${parentValueProp} but also included: ${JSON.stringify(keys)}`)

  return children({
    [childValueProp]: value,
    onChange: (newValue) => setValue(newValue),
  })
}
