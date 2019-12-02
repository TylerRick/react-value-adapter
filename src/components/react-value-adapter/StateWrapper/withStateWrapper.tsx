import * as React from 'react';
import { forwardRef, useState } from 'react';
import { warning, invariant } from 'hey-listen'
import { ValueProp } from '../ValueProp';

/**
 * Same as StateWrapper except this is a higher-order component instead of a
 * regular children-is-funtion wrapper component.
 * 
 * Returns a new stateful (uncontrolled) component. It is *still* an uncontrolled
 * component as far as the parent/consumer is concerned. Only the *child* will be
 * controlled.
 * 
 * Example:
 * 
 *   export const StatefulSomething = withStateWrapper(Something)
 * 
 * Names considered: withStateful
 * 
 * @param Child
 * @param options 
 */
export function withStateWrapper(
  Child: React.ComponentType,
  {
    parentValueProp = 'defaultValue',
    childValueProp = 'value',
  }: {
    parentValueProp: ValueProp,
    childValueProp: ValueProp,
  } = {} as any
) {
  return forwardRef<any, any>(function withStateWrapper({
    ...props
  }, ref) {
    const defaultValue = props[parentValueProp]
    delete props[parentValueProp]

    // TODO: How do we get it to see that this *is* a React function component?
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const [value, setValue] = useState(defaultValue)
    // console.log(defaultValue, value)

    return (<>
      <Child
        {...props}
        {...{
          [childValueProp]: value,
          onChange: (newValue) => setValue(newValue),
        }}
        ref={ref}
      />
    </>)
  })
}

/*
// To explore: Could we do this with just withAdaptValue?
export const Something = withAdaptValue(Child, {
    parentToChildValue: (parentValue) = valuesToTitles.get(parentValue),
    childValueProp: 'title',
  }
*/
