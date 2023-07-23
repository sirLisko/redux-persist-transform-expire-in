# redux-persist-transform-expire-in [![npm][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

> `redux-persist` transform that reset the persisted redux data after a specific period of time.

It creates in the localStorage a property with the expiration date of the [`redux-persist`](https://github.com/rt2zz/redux-persist).

Every time the state is updated the expiration date is postponed.

## Install

```bash
pnpm install redux-persist-transform-expire-in
```

## Example

```js
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireInTransform from "redux-persist-transform-expire-in";

const reducers = {
  // your reducers
};

const expireIn = 48 * 60 * 60 * 1000; // expire in 48h
const expirationKey = "expirationKey";
const persistConfig = {
  key: "v1",
  storage,
  transforms: [expireInTransform(expireIn, expirationKey, [])],
};

const persistedReducer = persistCombineReducers(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
```

## Configuration

| Attr          | Type   | Default                 | Notes                                           |
| ------------- | ------ | ----------------------- | ----------------------------------------------- |
| expireIn      | Number | none                    | For how long the state is going to be preserved |
| expirationKey | String | 'persistencyExpiration' | Key used by the localStorage                    |
| defaultValue  | any    | {}                      | Value to which state will be cleared to         |

## Difference with `redux-persist-transform-expire`

In [`redux-persist-transform-expire`](https://github.com/gabceb/redux-persist-transform-expire) you need to add to your reducers a specific expireAt key.
`redux-persist-transform-expire-in` is dealing with the whole state handled by `redux-persist`.

[npm-image]: https://img.shields.io/npm/v/redux-persist-transform-expire-in.svg
[npm-url]: https://npmjs.com/package/redux-persist-transform-expire-in
[travis-image]: https://travis-ci.org/sirLisko/redux-persist-transform-expire-in.svg?branch=master
[travis-url]: https://travis-ci.org/sirLisko/redux-persist-transform-expire-in
[coverage-image]: https://coveralls.io/repos/github/sirLisko/redux-persist-transform-expire-in/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sirLisko/redux-persist-transform-expire-in?branch=master
