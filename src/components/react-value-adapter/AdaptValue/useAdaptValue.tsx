/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defaultParentToChildValue, onChangeAdapterUsingMapFromValue } from ".."
import { invertMap } from "../../../common/invertMap"
import { AdaptValueOptions } from "./AdaptValueOptions"
import { warning, invariant } from 'hey-listen'
import { unique } from "../../../common/unique"
import { getValueProp } from "../valueProps"


/**
 * Takes the same options as AdaptValue.
 * Returns the props that you can pass to a child component to let it use the adapted value.
 * Any props not consumed (not a recognized option for AdaptValue) will be passed through as-is.
 */
export const useAdaptValue = <ParentValue, ChildValue>(
  adaptValueOptions: AdaptValueOptions<ParentValue, ChildValue> & any
  // TODO: pass through props as separate param?
): any => {
  /* eslint-disable prefer-const */
  let {
    parentValueProp = 'value',
    childValueProp = undefined, // set to parentValueProp below
    parentToChildValue = defaultParentToChildValue,
    parentToChildValues = undefined,
    onChangeProp = 'onChange',
    onChangeAdapter = onChangeAdapterUsingMapFromValue,
    onChange: onChangeFromParent, // Optional for uncontrolled
    children,
    ...props
  } = adaptValueOptions
  // console.log(parentValueProp, props.hasOwnProperty(parentValueProp), childValueProp, props)

  checkUniqueness(parentToChildValues)

  const childToParentValues = parentToChildValues && invertMap(parentToChildValues)
  const adaptedOnChange = onChangeAdapter(onChangeFromParent, childToParentValues)

  const parentValue = props[parentValueProp] as ParentValue
  const {valueProp} = getValueProp(props, parentValueProp)
  // Don't let parent value prop inadvertently pass through to child. We will set child value explicitly.
  delete props[valueProp]

  // By default, assume child uses some value prop name as parent
  childValueProp = childValueProp ?? valueProp
  let childValue
  // Don't bother looking it up if it's undefined. (TODO: Maybe we should anyway. Did this run into errors? Why would it?)
  if (parentValue !== undefined) {
    // TODO: Make more generic. Current implementation assumes this is a Map.
    // Move that to new MapValue variant. Instead of only passing
    // childToParentValues, pass adaptValueOptions:
    // AdaptValueOptions<ParentValue, ChildValue>, props: any so that
    // user-provided function can use make a function that depends/uses any of
    // that data if needed.
    childValue = parentToChildValue(parentValue, parentToChildValues) as ChildValue
  }

  const childProps = {
    // TODO: don't pass through props? raise error instead if there are any unconsumed props? or do we need the pass-through?
    ...props,
    [childValueProp]: childValue,
    [onChangeProp]: adaptedOnChange,
  }
  const other = {
    parentValue,
    childValue,
  }

  return {
    // ...other,
    // childProps,
    // TODO: remove this now that it's in childProps
    ...props,
    parentValue,
    childValue: childValue,
    [childValueProp]: childValue,
    [onChangeProp]: adaptedOnChange,
  }
}

function checkUniqueness(parentToChildValues) {
  if (parentToChildValues) {
    const keys   = Array.from(parentToChildValues.keys())
    const values = Array.from(parentToChildValues.values())
    const uniqueKeys   = unique(keys).length == keys.length
    const uniqueValues = unique(values).length == values.length
    { (uniqueKeys && uniqueValues) || console.log(uniqueKeys, uniqueValues) }
    invariant(uniqueKeys && uniqueValues, 'parentToChildValues must have unique keys and values to be able to provide a one-to-one mapping between parent and child values!')
  }
}
