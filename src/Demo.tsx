/* eslint-disable */
/* eslint-disable @typescript-eslint/camelcase */ 

import React, { useState, useRef } from 'react'
import {
  useAdaptValue,
  AdaptValue,
  onChangeAdapterUsingMapFromChecked,
  AdaptValue_,
  defaultParentToChildValueWithFallback,
  ExtractValueFromEvent_,
  StateWrapper,
  StateWrapper_,
  withStateWrapper,
} from './components/react-value-adapter'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { MuiTriStateCheckbox } from 'mui-tri-state-checkbox'

const InputWithSimpleValue_0: React.FunctionComponent<any> = ({onChange, ...props}) => (
  <input type="text" {...props} onChange={({target: {value}}) => onChange(value)} />
)
const InputWithSimpleValue = withStateWrapper(InputWithSimpleValue_0)
// const InputWithSimpleValue = withStateWrapper(null)


const Demo = (): React.ReactElement => {
  // Normally you wouldn't pass an onChange handler to an uncontrolled component.
  const [uc_check_parentValue, uc_check_setParentValue] = useState<string>(null)
  const [uc_text_parentValue, uc_text_setParentValue] = useState<string>('')

  // Normally the parent would not also track the childValue, but for demonstration purposes, we display both values.
  const [text_parentValue, text_setParentValue] = useState<string>('')
  const [text_childValue,  text_setChildValue]  = useState<string>('')
  const text_inputRef = useRef<HTMLInputElement>(null)

  const [check_parentValue, check_setParentValue] = useState<string>('yes')
  const [check_childValue,  check_setChildValue]  = useState<string>(null)

  const [tri_parentValue, tri_setParentValue] = useState<string>('always')
  const [tri_childValue,  tri_setChildValue]  = useState<string>(null)

  const [radio_parentValue, radio_setParentValue] = useState<string>(null)
  const [radio_childValue,  radio_setChildValue]  = useState<string>(null)

  return (
    <form method="get">
      <h1>Checkbox</h1>
      <h2>
        Controlled (parentValue: {JSON.stringify(check_parentValue)}, childValue: {JSON.stringify(check_childValue)})
      </h2>
      <h3>AdaptValue</h3>
      <div>
        <AdaptValue
          onChangeAdapter={onChangeAdapterUsingMapFromChecked}
          parentToChildValues={check_parentToChildValues}
          childValueProp={'checked'}
          value={check_parentValue}
          onChange={(parentValue, childValue) => {
            check_setChildValue(childValue)
            check_setParentValue(parentValue)
          }}
        >
          {/*({childProps}) => (<>
            // TODO: change this and all the other examples to just ({childProps}) like this:
            <label>
              <input type="checkbox" name="check_demo"
                {...childProps}
              />
              Checkbox
            </label>
            (parentValue: {JSON.stringify(childProps.parentValue)}, childValue: {JSON.stringify(childProps.childValue)})
          </>)*/}
          {({parentValue, childValue, onChange}) => (<>
            <label>
              <input type="checkbox" name="check_demo"
                checked={childValue}
                onChange={onChange}
              />
              Checkbox
            </label>
            (parentValue: {JSON.stringify(parentValue)}, childValue: {JSON.stringify(childValue)})
          </>)}
        </AdaptValue>
      </div>
      <h3>AdaptValue_</h3>
      <div>
        <AdaptValue_
          onChangeAdapter={onChangeAdapterUsingMapFromChecked}
          parentToChildValues={check_parentToChildValues}
          childValueProp={'checked'}
          value={check_parentValue}
          onChange={(parentValue, childValue) => {
            check_setChildValue(childValue)
            check_setParentValue(parentValue)
          }}
        >
          <input type="checkbox" name="check_demo" />
        </AdaptValue_>
      </div>

      {true && <> <h2>
        Uncontrolled (parentValue: {JSON.stringify(uc_check_parentValue)})
      </h2>
      <h3>AdaptValue</h3>
      <div>
        <AdaptValue
          parentValueProp={'defaultValue'}
          defaultValue={'yes'}
          childValueProp={'defaultChecked'}
          onChangeAdapter={onChangeAdapterUsingMapFromChecked}
          parentToChildValues={check_parentToChildValues}
          onChange={(parentValue) => {
            uc_check_setParentValue(parentValue)
          }}
        >
          {/* (props) => <>{JSON.stringify(props)}</> */}
          {({parentValue, childValue, onChange}) => (<>
            <input type="checkbox" name="check_demo"
              defaultChecked={childValue}
              onChange={onChange}
            />
            (initial parentValue: {JSON.stringify(parentValue)}, initial childValue: {JSON.stringify(childValue)} (these won't change because props don't change))
          </>)}
        </AdaptValue>
      </div>
      <h3>AdaptValue_</h3>
      <div>
        <AdaptValue_
          parentValueProp={'defaultValue'}
          defaultValue={'yes'}
          childValueProp={'defaultChecked'}
          onChangeAdapter={onChangeAdapterUsingMapFromChecked}
          parentToChildValues={check_parentToChildValues}
          onChange={(parentValue) => {
            uc_check_setParentValue(parentValue)
          }}
        >
          <input type="checkbox" name="check_demo" />
        </AdaptValue_>
      </div> </>}








      <h1>MuiTriStateCheckbox</h1>
      <p>Mapping {'{'}false: 'never', null: 'sometimes', true: 'always'}</p>
      <h2>Controlled (parentValue: {JSON.stringify(tri_parentValue)}, childValue: {JSON.stringify(tri_childValue)})</h2>
      <h3>AdaptValue</h3>
      <div>
        <AdaptValue
          onChangeAdapter={onChangeAdapterTriStateCheckbox}
          parentToChildValues={tri_parentToChildValues}
          childValueProp={'checked'}
          value={tri_parentValue}
          onChange={(parentValue, childValue) => {
            tri_setChildValue(childValue)
            tri_setParentValue(parentValue)
          }}
        >
          {({parentValue, checked, onChange}) => (<>
            <MuiTriStateCheckbox
              name="tri"
              value="value"
              checked={checked}
              onChange={onChange}
            />
            (parentValue: {JSON.stringify(parentValue)}, checked: {JSON.stringify(checked)})
          </>)}
        </AdaptValue>
      </div>

      <h3>AdaptValue_</h3>
      <div>
        <AdaptValue_
          onChangeAdapter={onChangeAdapterTriStateCheckbox}
          parentToChildValues={tri_parentToChildValues}
          childValueProp={'checked'}
          value={tri_parentValue}
          onChange={(parentValue, childValue) => {
            tri_setChildValue(childValue)
            tri_setParentValue(parentValue)
          }}
        >
          <MuiTriStateCheckbox
            name="tri"
            value="value"
          />
        </AdaptValue_>
      </div>



      <h1>Text field</h1>

      <h2>
        Controlled (parentValue: {JSON.stringify(text_parentValue)}, childValue: {JSON.stringify(text_childValue)})
      </h2>
      <h3>AdaptValue</h3>
      <div>
        <Rot13ValueAdapter
          onChange={(parentValue, value) => {
            text_setChildValue(value)
            text_setParentValue(parentValue)
          }}
          value={text_parentValue}
        >
          {({parentValue, childValue, onChange}) => (<>
            <input type="text"
              value={childValue}
              onChange={onChange}
            />
            (parentValue: {JSON.stringify(parentValue)}, childValue: {JSON.stringify(childValue)})
          </>)}
        </Rot13ValueAdapter>
      </div>
      <h3>AdaptValue_</h3>
      <div>
        <Rot13ValueAdapter_AdaptValue_
          onChange={(parentValue, value) => {
            text_setChildValue(value)
            text_setParentValue(parentValue)
          }}
          value={text_parentValue}
        >
          <input type="text" ref={text_inputRef} />
        </Rot13ValueAdapter_AdaptValue_>
      </div>
      <button type="button" onClick={() => { console.log(text_inputRef.current); text_inputRef.current.focus()} }>
        Focus (test that the ref works)
      </button>

      <h2>Uncontrolled (parentValue: {JSON.stringify(uc_text_parentValue)})</h2>
      <h3>AdaptValue</h3>
      <div>
        <Rot13ValueAdapter
          parentValueProp={'defaultValue'}
          onChange={(parentValue) => {
            uc_text_setParentValue(parentValue)
          }}
          defaultValue={'test'}
        >
          {({parentValue, childValue, onChange}) => (<>
            <input type="text"
              defaultValue={childValue}
              onChange={onChange}
            />
            (initial parentValue: {JSON.stringify(parentValue)}, initial childValue: {JSON.stringify(childValue)} (these won't change because props don't change))
          </>)}
        </Rot13ValueAdapter>
      </div>
      <h3>AdaptValue_</h3>
      <div>
        <Rot13ValueAdapter_AdaptValue_
          parentValueProp={'defaultValue'}
          onChange={(parentValue) => {
            uc_text_setParentValue(parentValue)
          }}
          defaultValue={'test'}
        >
          <input type="text" />
        </Rot13ValueAdapter_AdaptValue_>
      </div>

      <h1>Radio button</h1>
      <h2>
        Controlled (parentValue: {JSON.stringify(radio_parentValue)}, childValue: {JSON.stringify(radio_childValue)})
      </h2>
      <h3>AdaptValue</h3>
      <div>
        <AdaptValue
          parentToChildValues={radio_parentToChildValues}
          onChange={(parentValue, value) => {
            radio_setChildValue(value)
            radio_setParentValue(parentValue)
          }}
          parentToChildValue={defaultParentToChildValueWithFallback}
          value={radio_parentValue}
        >
          {({parentValue, childValue, onChange}) => (<>
            <DemoRadioGroup
              value={childValue}
              onChange={onChange}
            />
            (parentValue: {JSON.stringify(parentValue)}, childValue: {JSON.stringify(childValue)})
          </>)}
        </AdaptValue>
      </div>

      <h3>AdaptValue_</h3>
      <div>
        <AdaptValue_
          parentToChildValues={radio_parentToChildValues}
          onChange={(parentValue, value) => {
            radio_setChildValue(value)
            radio_setParentValue(parentValue)
          }}
          parentToChildValue={defaultParentToChildValueWithFallback}
          value={radio_parentValue}
        >
          <DemoRadioGroup />
        </AdaptValue_>
      </div>

      
      <h1>StateWrapper</h1>
      <h2>withStateWrapper</h2>
      <InputWithSimpleValue defaultValue="text" />

      <h2>StateWrapper</h2>
      <StateWrapper defaultValue="text">
        {({onChange, ...props}) => (
          <input type="text" {...props} onChange={({target: {value}}) => onChange(value)} />
        )}
      </StateWrapper>

      <h2>StateWrapper_</h2>
      <StateWrapper_ defaultValue="text">
      <ExtractValueFromEvent_>
        <input type="text" />
      </ExtractValueFromEvent_>
      </StateWrapper_>


    </form>
  )
}
export default Demo

function DemoRadioGroup(props) {
  return (
    <RadioGroup
      {...props}
      aria-label="frequency"
    >
      <FormControlLabel value="never" label="Never" control={<Radio />} />
      {/* <FormControlLabel value="rarely" label="Rarely" control={<Radio />} /> */}
      <FormControlLabel value="sometimes" label="Sometimes" control={<Radio />} />
      {/* <FormControlLabel value="often" label="Often" control={<Radio />} /> */}
      <FormControlLabel value="always" label="Always" control={<Radio />} />
    </RadioGroup>
  )
}

const onChangeAdapterTriStateCheckbox = (onChangeFromParent, parentToChildValues) => (
  (event, checked) => {
    if (!onChangeFromParent) return
    const parentValue = parentToChildValues.get(checked)
    // console.log(checked, '=>', parentValue)
    onChangeFromParent(parentValue, checked)
  }
)

function Rot13ValueAdapter(props) {
  return (
    <AdaptValue
      parentToChildValue={rot13}
      onChangeAdapter={onChangeForParent => ({ target: { value } }) => onChangeForParent(rot13(value), value)}
      {...props}
    />
  )
}

function Rot13ValueAdapter_AdaptValue_(props) {
  return (
    <AdaptValue_
      parentToChildValue={rot13}
      onChangeAdapter={onChangeForParent => ({ target: { value } }) => onChangeForParent(rot13(value), value)}
      {...props}
    />
  )
}

// https://codereview.stackexchange.com/a/132140/61358
function rot13(str) {
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index     = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}


const check_parentToChildValues = new Map([
  ['yes', true],
  ['no',  false],
])
const tri_parentToChildValues = new Map([
  ['never',     false],
  ['sometimes', null],
  ['always',    true],
])
const radio_parentToChildValues = new Map([
  [1, 'never'],
  [3, 'sometimes'],
  [5, 'always'],
])

