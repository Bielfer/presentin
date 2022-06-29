import { render } from '@testing-library/react';
import Link from '.';

describe('Link', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Link href="/">Test</Link>);

    expect(asFragment()).toMatchSnapshot();
  });
});
