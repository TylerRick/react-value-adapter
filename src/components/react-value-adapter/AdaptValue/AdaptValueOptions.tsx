import { OnChangeAdapter } from '../onChangeAdapter';
import { ParentToChildValue } from '../parentToChildValue';
import { ValueProp } from '../ValueProp';

export interface AdaptValueOptions<ParentValue, ChildValue> {
  onChange?: any
  onChangeProp: string
  onChangeAdapter: OnChangeAdapter<ParentValue, ChildValue>
  parentValueProp: ValueProp
  childValueProp: ValueProp
  parentToChildValue?: ParentToChildValue<ParentValue, ChildValue>
  parentToChildValues?: Map<ParentValue, ChildValue>
  childProps?: any
  children: any
  // To allow for variations in the value prop, such as 'defaultValue' or 'checked'
  [key: string]: any
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface AdaptValuesOptionsStatic<ParentValue, ChildValue>
  extends Partial<
    Omit<
      AdaptValueOptions<ParentValue, ChildValue>,
      'children' | 'childProps'
    >
  >
{ }

