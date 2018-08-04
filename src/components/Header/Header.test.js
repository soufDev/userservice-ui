import React from 'react';
/* eslint import/no-extraneous-dependencies:0 */
import ShallowRender from 'react-test-renderer/shallow';
import Header from './Header';

const renderer = new ShallowRender();
renderer.render(<Header items={[]} />);
const result = renderer.getRenderOutput();

describe('Header Component', () => {
  it('check if the Header return a Menu Component', () => {
    expect(result.type.name).toBe('Menu');
    expect(result.props.fixed).toBe('top');
  });
});
