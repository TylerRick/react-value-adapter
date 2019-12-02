/* eslint-enable react-hooks/rules-of-hooks */
/* eslint-disable */
import { useCallback } from "react"

export type ChildOnChangeFn = (...args: any[]) => void
export type OnChangeAdapter<ParentValue, ChildValue> = (onChange, childToParentValues) => ChildOnChangeFn

// Use this when the child's onChange is simply called with a value rather than
// extracted from event. This is the case for some 3rd-party components.
export const onChangeAdapterUsingMapSimple: OnChangeAdapter<any, any> = (onChangeFromParent, childToParentValues): ChildOnChangeFn => (
  (childValue) => {
    if (!onChangeFromParent) return
    const parentValue = childToParentValues.get(childValue)
    // console.log(childValue, '=>', parentValue)
    onChangeFromParent(parentValue, childValue)
  }
)
// Use this when the child's onChange is passed an event and the value should be
// taken from event.target.value. This is the case for regular text inputs.
export const onChangeAdapterUsingMapFromValue: OnChangeAdapter<any, any> = (onChangeFromParent, childToParentValues) => (
  ({target: {value: childValue}}) => {
    if (!onChangeFromParent) return
    const parentValue = childToParentValues.get(childValue)
    // console.log(childValue, '=>', parentValue)
    onChangeFromParent(parentValue, childValue)
  }
)
// Use this when the child's onChange is passed an event and the value should be
// taken from event.target.checked. This is the case for regular checkbox
// inputs.
export const onChangeAdapterUsingMapFromChecked: OnChangeAdapter<any, any> = (onChangeFromParent, childToParentValues) => (
  ({target: {checked}}) => {
    if (!onChangeFromParent) return
    const parentValue = childToParentValues.get(checked)
    // console.log(checked, '=>', parentValue)
    onChangeFromParent(parentValue, checked)
  }
)
