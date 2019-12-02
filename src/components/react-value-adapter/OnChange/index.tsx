import * as React from 'react';

/**
 * Separate the concern of extracting the value from the onChange params, so
 * that your code can be free of the clutter that would otherwise be needed to
 * deal with that concern.
 * 
 * Example: Lets you simplify this:
      <SomethingThatProvidesProps>
        {({onChange, ...props}) => (
          <input type="text" {...props} onChange={({target: {value}}) => onChange(value)} />
        )}
      </SomethingThatProvidesProps>
    
    to just this:

      <SomethingThatProvidesProps>
        {(props) => (
          <ExtractValueFromEvent_>
            <input type="text" {...props} />
          </ExtractValueFromEvent_>
        )}
      </SomethingThatProvidesProps>

    or this:

      <SomethingThatProvidesProps>
        {(props) => (
          <input type="text" {...props} onChange={extractValueFromEvent(onChange)} />
        )}
      </SomethingThatProvidesProps>
 */
export const ExtractValueFromEvent_ = function ExtractValueFromEvent_(
  {
    onChange = undefined, // TODO: It's actually required but it flags it as an error if you wrap <StateWrapper_><ExtractValueFromEvent_> because it can't see that <StateWrapper_> will be injecting that required prop.
    children,
    ...props
  }
): React.ReactElement {
  const child = React.Children.only(children)
  const childProps = {
    ...props,
    onChange: ({target: {value}}) => onChange(value),
  }
  return React.cloneElement(child, childProps)
}

/**
 * Returns an adapted onChange that extracts value from event.target before
 * calling the provided onChange function with that value (and the event as
 * argument #2).
 * 
 * ??
 * Note that the argument order is reversed from material-ui
 */
export const extractValueFromEvent = null

/*
export function selectProps(
  name,
   {namePrefix, record, onChange, valueProp = 'defaultValue'}: FieldPropsOptions<'defaultValue'>
): FieldProps<'defaultValue'> {
  return {
    name: `${namePrefix}[${name}]`,
    defaultValue: record[name], // Child Select needs to look up option for this value
    onChange: (selectedOption) => onChange(record.i, {[name]: selectedOption.value}),
  }
}
export const checkboxFieldProps = (name, checkedValue, {namePrefix, record, onChange}) => {
  return {
    name: `${namePrefix}[${name}]`,
    value: checkedValue,
    checked: record[name] || false,
    onChange: (event, checked) => onChange(record.i, {[name]: checked}),
  }
}
*/
