/* eslint-disable func-names,prefer-arrow-callback */
import createReducer from './createReducer';

const defaultState = () => ({
  test: 'default',
});

test('default state should be a function', function () {
  expect(() => createReducer()).toThrowError('[createReducer] defaultState should be a function');
});

test('should return a function', function () {
  expect(typeof createReducer(defaultState)).toEqual('function');
});

it('should return current state when action is not an object', function () {
  const reducer = createReducer(defaultState);
  const state = defaultState();
  expect(reducer(state, null)).toEqual(state);
  expect(reducer(state, undefined)).toEqual(state);
});

test('should return a original state when no handler found', function () {
  const reducer = createReducer(defaultState);
  expect(reducer(undefined, { type: 'NOTFOUND' })).toEqual(defaultState());
});

test('should call handler when match', function () {
  const handler = jest.fn().mockImplementation(() => 'hello');
  const reducer = createReducer(defaultState, { handler });
  const action = { type: 'handler' };
  expect(reducer(undefined, action)).toEqual('hello');
  expect(handler.mock.calls[0]).toEqual([defaultState(), action]);
});
