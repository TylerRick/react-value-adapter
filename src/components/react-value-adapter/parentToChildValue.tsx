/* eslint-disable @typescript-eslint/no-explicit-any */
export type ParentToChildValue<ParentValue, ChildValue> = (parentValue: ParentValue, parentToChildValues: Map<ParentValue, ChildValue>) => ChildValue

// The default is to look it up via the provided parentToChildValues map
// TODO: Only use this as the default if expliciitly using MapValue variant; for
// generic AdaptValue variant, *require* a parentToChildValue function to be
// provided.
export const defaultParentToChildValue = <ParentValue, ChildValue>(
  parentValue,
  parentToChildValues: Map<ParentValue, ChildValue>
): ChildValue => {
  const childValue: ChildValue = parentToChildValues.get(parentValue)
  // console.log(parentValue, '=>', childValue)
  return childValue
}
// If no value can be found, returns '' to avoid "A component is changing an uncontrolled input of type text to be controlled." warnings
export const defaultParentToChildValueWithFallback = <ParentValue, ChildValue>(
  parentValue,
  parentToChildValues: Map<ParentValue, ChildValue>
): ChildValue => {
  const childValue: ChildValue = parentToChildValues.get(parentValue)
                  || ('' as any as ChildValue)
  return childValue
}
