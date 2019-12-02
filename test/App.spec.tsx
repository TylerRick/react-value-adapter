import React from 'react';
import { render } from '@testing-library/react';
import Demo from '../src/Demo';

describe('App', () => {
  it('renders a message', () => {
    const { container } = render(<Demo />);
    expect(container.textContent).toContain('Rendered');
  });
});
