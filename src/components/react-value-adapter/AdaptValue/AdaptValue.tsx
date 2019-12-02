/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from 'react'
import { AdaptValueOptions } from "./AdaptValueOptions"
import { useAdaptValue } from "./useAdaptValue"

/**
 * Adapt between the values (and prop names) required/expected by the parent
 * component and the child component.
 *
 * For example, if the parent component provides a string prop named 'value'
 * that will be 'yes', 'no', or 'maybe', but the child (checkbox) component
 * requires a boolean prop named 'checked' that will be set to one of true,
 * false, or null, this can be used as an adapter.
 *
 * This component provides a facade to the parent (consumer) component such
 * that it can interact with this component using its unmodified value/onChange
 * props.
 *
 * It will translate the values in both directions, both the value from the
 * parent's value prop, and the value from the child's onChange callback.
 *
 * @arg onChangeAdapter : Returns an onChange handler that will be passed to
 *   the child component, and calls the onChange handler passed by the
 *   parent (consumer), with potentially different (translated) arguments/values.
 *
 *   The first argument passed to the parent onChange should be the new, mapped
 *   value. You may also pass the child value (from the wrapped component's
 *   onChange) as the second argument.
 *
 * The returned wrapper component has the following interface:
 *
 * @prop parentToChildValue (AKA valueAdapterFn): A function that maps from parent value to child value.
 *   By default this will use the inverse of parentToChildValues to translate
 *   values, but you can supply any custom translation function with the
 *   signature:
 *
 *   (parentValue: ParentValue, parentToChildValues: Map<ParentValue, ChildValue>) => ChildValue
 *
 * @prop parentToChildValues: A Map from values used by child component (provided by
 *   its onChange callback) to new values to be used by parent.
 * 
 *   Required if used by onChangeAdapter or parentToChildValue. Otherwise, it is unneeded.
 * 
 *   Example:
 *
 *   const parentToChildValues = new Map([
 *     [false, 'never'],
 *     [null, 'sometimes'],
 *     [true, 'always'],
 *   ])
 *
 * @prop onChange (onChangeFromParent): This is optional and may be omitted if
 *   you only want to map from parent values to child values and not the other
 *   direction. (For example, for an uncontrolled input, we would map from
 *   defaultValue, but wouldn't use an onChange.)
 *
 * @prop childValueProp (defaults to parentValueProp, which by default is
 *   'value'): Which prop to assign the childValue to. For checkboxes, this would
 *   be 'checked', for example (the 'value' prop is used for something else).
 *
 * Naming conventions used:
 * - Parent components refers to the component that wraps this component. Other
 *   names for this include outer component, or consumer component.
 * - Child component refers to the component being wrapped. Other names for
 *   this include inner component, original component, wrapped component (but
 *   "wrapped" is too ambiguous: it could also refer to the component that we
 *   return *after* it has been wrapped).
 * - parentToChildValues. Could have also been called parentValues (too
 *   ambiguous), origToMappedValues, wrappedToConsumerValues.
 * - childValue: Could have also called it innerValue, origValue, wrappedValue
 * - parentValue: Could have also called it outerValue, parentValue, consumerValue.
 *
 * TODO: Example:
 *
 *   <AdaptValue_ valueProp={valueProp} parentToChildValues={parentToChildValues}>
 *     {(childValue, parentValue) => (<>
 *       <Child
 */
// export const AdaptValue: React.FunctionComponent = function AdaptValue <ParentValue, ChildValue>({
export function AdaptValue <ParentValue, ChildValue>({
  children,
  ...props
}: AdaptValueOptions<ParentValue, ChildValue> & any): any
{
  const childProps = useAdaptValue(props)
  return children(childProps)
}

/*
export const AdaptValue = forwardRef<any, any>(function AdaptValue <ParentValue, ChildValue>({
  children,
  ...props
}: AdaptValueOptions<ParentValue, ChildValue> & any, ref)
*/
