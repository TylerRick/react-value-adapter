import withHiddenInput, { WithHiddenInputOptions } from './withHiddenInput'
import { withAdaptValue } from './AdaptValue/withAdaptValue'
import { AdaptValueOptions, AdaptValuesOptionsStatic } from './AdaptValue/AdaptValueOptions'

/**
 * This is just a shortcut for composing withHiddenInput(withAdaptValue(Child)).
 * It is recommended to just use withHiddenInput and withAdaptValue directly
 * instead of using this, in order to keep straight which options are for which
 * concern.
 * 
 * Example:
 *   const SomethingWithHiddenMappedValues = withHiddenMappedValues(Something, {onChangeAdapter}, {hiddenOrder: 'after'})
 * 
 * @param Child 
 * @param mapValueOptions 
 * @param withHiddenInputOptions 
 */
export function withHiddenMappedValues <ParentValue, ChildValue>(
  Child: React.ComponentType,
  mapValueOptions: AdaptValuesOptionsStatic<ParentValue, ChildValue>,
  withHiddenInputOptions: WithHiddenInputOptions = {},
) {
  const Adapted = withAdaptValue(
    Child,
    mapValueOptions
  )
  return withHiddenInput(
    Adapted,
    {
      ...withHiddenInputOptions
    } as WithHiddenInputOptions
  )
}

/*
export const withHiddenMappedValues<ParentValue, ChildValue> = forwardRef<any, any>(function withHiddenMappedValues({
    name,
    parentToChildValues = new Map(),
    valuesToTitles = new Map(),
    ...props
  }, ref) {
    return (
      <AdaptValue valueProp={valueProp} parentToChildValues={parentToChildValues}>
        {(childValue, parentValue) => (<>
          <Child
            {...props}
            name={name}
            {...{
              [valueProp]: childValue,
              [onChangeProp]: useCallback((childValue, parentValue) => {
                props.onChange && props.onChange(childValue, parentValue)
              }, [props.onChange]),
            }}
            title={valuesToTitles.get(childValue)}
            ref={ref}
          />
          <input type="hidden" name={name} value={parentValue || ''} />
        </>)}
      </AdaptValue>
    )
  })
*/
