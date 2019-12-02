import { warning, invariant } from 'hey-listen'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// defaultChecked => defaultChecked
// checked        => defaultChecked
export const defaultValuePropFor = (valueProp) => {
  if (valueProp.match(/^default/)) {
    return valueProp
  } else {
    return `default${capitalizeFirstLetter(valueProp)}`
  }
}

// defaultChecked => undefined
// checked        => defaultChecked
export const differentDefaultValuePropFor = (valueProp) => {
  if (valueProp.match(/^default/)) {
    return undefined
  } else {
    return `default${capitalizeFirstLetter(valueProp)}`
  }
}

/**
 * 
 * Extracts the value prop names and values out of props and returns those
 * names and values as an object.
 * If valueProp: 'value', automatically gets the value out of either a prop
 * named either 'value' or 'defaultValue'.
 * 
 * This allows "any" component to be used as either either a controlled or
 * uncontrolled component at run time.
 * 
 * This allows a component whose value prop is configured to be 'value' (at
 * define time, for example) to also be used as an uncontrolled component
 * (valueProp: 'defaultValue') at run time, without having to explicitly define
 * 2 variants of the component, and without having to explicitly pass
 * {valueProp: 'defaultValue'} at run time. This makes it work similiarly to
 * the React built-in 'input' component, for example: the input component is
 * controlled or uncontrolled depending on whether 'value' or 'defaultValue' is
 * provided.
 * 
 * This way, you only have to define the "general" value prop of a component
 * ('value' or 'checked', for example) and not worry as much about the
 * 'checked' vs. 'defaultChecked' variants.
 * 
 * You can still explicitly specify valueProp: 'defaultValue', however, if you
 * want.
 * 
 * Also checks some invariants to make sure user isn't doing accidentally
 * something potentially contradictory.
 */
export const getValueProp = (props, valueProp) => {
  // console.log('getValueProp(', props, valueProp, ')')

  // They may explicitly specify 'defaultValue' as the value prop. In that case, we won't use defaultValueProp (it will be undefined), since there's no point in separately checking defaultValueProp when we're already checking/using it.
  const defaultValueProp = differentDefaultValuePropFor(valueProp)

  let explicitValue, defaultValue
  if (props.hasOwnProperty(valueProp)) {
    explicitValue = props[valueProp]
  }
  if (defaultValueProp && props.hasOwnProperty(defaultValueProp)) {
    defaultValue = props[defaultValueProp]
  }
  if (explicitValue !== undefined && defaultValue !== undefined) {
    warning(false, `Shouldn't provide both ${valueProp} (${explicitValue}) and ${defaultValueProp} (${defaultValue}) props. A component must be either controlled or uncontrolled. (props: ${JSON.stringify(props)})`)
  }

  let value
  if (props.hasOwnProperty(valueProp)) {
    valueProp = valueProp
    value = explicitValue
  } else if (props.hasOwnProperty(defaultValueProp)) {
    valueProp = defaultValueProp
    value = defaultValue
  } else {
    warning(false, `${valueProp}${defaultValueProp ? ` (or ${defaultValueProp})` : ''} prop must be provided since it was specified as the value prop (props: ${JSON.stringify(props)})`)
  }

  // console.log({value, valueProp, explicitValue, defaultValueProp, defaultValue})
  return      {value, valueProp, explicitValue, defaultValueProp, defaultValue}
}
