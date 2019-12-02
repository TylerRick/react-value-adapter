import * as React from 'react'
import { forwardRef, useState } from 'react'
import { warning, invariant } from 'hey-listen'
import { ValueProp } from '../ValueProp'

/**
 * Same as StateWrapper except this is an injector component instead of a
 * regular children-is-funtion wrapper component.
 * 
 * @see StateWrapper
 * @param options 
 */
export function StateWrapper_(
  {
    parentValueProp = 'defaultValue',
    childValueProp = 'value',
    children,
    ...props   // TODO: Only allow defaultValue, defaultChecked, etc.
  }: {
    parentValueProp?: ValueProp,
    childValueProp?: ValueProp,
    children: React.ReactChildren | React.ReactElement,
    [key: string]: any,
  } = {} as any
) {
  const defaultValue = props[parentValueProp]
  delete props[parentValueProp]

  const [value, setValue] = useState(defaultValue)

  const child = React.Children.only(children) as React.ReactElement<any, any>
  const childProps = {
    ...child.props,
    [childValueProp]: value,
    onChange: (newValue) => setValue(newValue),
  }
  return React.cloneElement(child, childProps)
}
