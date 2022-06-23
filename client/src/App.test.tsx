import App from './App';
import renderer from 'react-test-renderer';

describe('renders all the components', () => {
  test('snapshot test for App', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});