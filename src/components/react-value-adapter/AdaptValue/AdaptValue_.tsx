/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { AdaptValueOptions } from "./AdaptValueOptions"
import { useAdaptValue } from './useAdaptValue';

/*
 * Injector variant of AdaptValue. Eliminates the need to pass a function as
 * children prop, which makes the syntax simpler in the consumer, but has the
 * limitation that it can only have a single child, and that child must be the
 * direct child of this element.
 *
 * Takes the same options as AdaptValue.
 *
 * (The '_' suffix indicates it is an injector component.
 * (https://medium.com/@kylpo/a-naming-convention-for-injector-components-c421a07debe5))
 */
export const AdaptValue_ = function AdaptValue_ <ParentValue, ChildValue>(
  {
    children,
    ...props
  }: AdaptValueOptions<ParentValue, ChildValue> & any
): React.ReactElement {
  const childProps = useAdaptValue(props)
  const child = React.Children.only(children)
  delete childProps['parentValue']
  delete childProps['childValue']
  return React.cloneElement(child, childProps)
}
