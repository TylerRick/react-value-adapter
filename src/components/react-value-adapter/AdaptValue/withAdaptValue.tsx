/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { forwardRef } from 'react';
import { AdaptValuesOptionsStatic } from './AdaptValueOptions';
import { AdaptValue } from '..';
// import { AdaptValue_ } from './AdaptValue_';

/**
 * Adapt both value and onChange callback, to translate the values to and from
 * different values required by consumer. (Both directions.)
 * 
 * Returns an adapted component, which expects values to be the "mapped" values
 * from the consumer, which then get "unmapped" (using inverted parentToChildValues
 * Map) to the value expected by the original/inner/wrapped component.
 * In the same way, values emitted by the wrapped component (from its onChange)
 * are mapped by the onChangeAdapter (using the parentToChildValues Map) to the
 * "mapped" value expected by the consumer.
 * 
 * Because it must be able to convert values in both directions, there must be
 * a one-to-one correspondence between "wrapped component" values and
 * "consumer" values. In other words, the parentToChildValues Map must have both
 * unique keys and values.
 * 
 * @see withOnChangeAdapter
 * 
 * Takes the same arguments as withOnChangeAdapter plus:
 *
 * @prop childValueProp (default 'value'); should pass 'checked' for checkboxes
 * 
 * @prop childProps: Can be used to pass props to the child (inner) component
 *   in case of conflicts. For example, to pass a value to a checkbox input if
 *   you want to use 'value' as the parent value prop.
 * 
 * Other names considered: withAdaptValue, withValueTranslator, withValueTransform
 * Chose withAdaptValue to be consistent with AdaptValue.
 * 
 */
export function withAdaptValue <ParentValue, ChildValue>(
  Child: React.ComponentType,
  mapValueOptionsStatic: AdaptValuesOptionsStatic<ParentValue, ChildValue>,
) {
  return forwardRef<any, any>(function withAdaptValue({
    parentToChildValues = undefined,
    childProps: childPropsToPassThrough = {},
    ...props
  }, ref) {
    const mapValuePropsLocal = {
      parentToChildValues
    }
    // Allow parentToChildValues to be specified at either level — where the
    // new component was created (returned by withAdaptValue HOC), or where
    // the new component is used ("local") — with local taking precedence.
    if (typeof mapValuePropsLocal.parentToChildValues === 'undefined') {
      delete mapValuePropsLocal.parentToChildValues
    }
    const mapValuePropsToUse = {
      ...mapValueOptionsStatic,
      ...mapValuePropsLocal
    }
    return (
      <AdaptValue {...mapValuePropsToUse} {...props}>
        {({parentValue, childValue, ...childProps}) => (<>
          <Child {...childProps} {...childPropsToPassThrough} ref={ref} />
        </>)}
      </AdaptValue>
    )

    /*
    // Could have also done:
    return (<AdaptValue_
      {...mapValuePropsToUse}
      {...props}
    >
      <Child
        {...childProps}
        ref={ref}
      />
    </AdaptValue_>)
    */
  })
}
