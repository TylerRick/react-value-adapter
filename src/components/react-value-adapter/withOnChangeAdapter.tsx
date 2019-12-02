/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable */
import * as React from 'react';
import { forwardRef } from 'react';
import { ChildOnChangeFn } from './onChangeAdapter';

/**
 * Adapt an onChange callback, for example to translate the values to different
 * values required by consumer. (One direction only.)
 *
 * TODO: remove this and just use withAdaptValue instead?, possibly making the default parentToChildValue be one that does nothing?
 * The argument for keeping it rather than using more complex withAdaptValue is that this is a nice simple implementation.
 * The arguments for removing it are that it may not be needed if it could be accomplished with withAdaptValue instead; it's one more thing to test, maintain, and have bugs.
 */
export function withOnChangeAdapter(
  Child: React.ComponentType,
  onChangeAdapter: (onChange, parentToChildValues) => ChildOnChangeFn,
  {
    onChangeProp = 'onChange',
  }: WithOnChangeAdapterOptions = {},
): React.ComponentType {
  return forwardRef<any, any>(function withOnChangeAdapter({
    // Have to use Map instead of Object because Objects only support string keys
    parentToChildValues = new Map(),
    ...props
  }, ref) {
    const onChange = props[onChangeProp]
    const adaptedOnChange = onChangeAdapter(onChange, parentToChildValues)

    return (<>
      <Child
        {...props}
        {...{
          [onChangeProp]: adaptedOnChange
        }}
        ref={ref}
      />
    </>)
  })
}

export interface WithOnChangeAdapterOptions {
  readonly onChangeProp?: string
}
