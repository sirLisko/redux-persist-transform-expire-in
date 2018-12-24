# redux-persist-transform-expire-in [![Build Status][travis-image]][travis-url]

> `redux-persist` transform that reset the persisted redux data after a specific period of time.

It creates in the localStorage a property with the expiration date of the redux-persist.
Every time the state is updated the expiration date is postponed.

## Example

```js
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireIn from "redux-persist-transform-expire-in";

const reducers = {
  // your reducers
};

const expireIn = 48 * 60 * 60 * 1000; // expire in 48h
const expirationKey = "expirationKey";
const persistConfig = {
  key: "v1",
  storage,
  transforms: [expireIn(expireIn, expirationKey)]
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

## Difference with `redux-persist-transform-expire`

In [`redux-persist-transform-expire`](https://github.com/gabceb/redux-persist-transform-expire) you need to add to your reducers a specific expireAt key.
`redux-persist-transform-expire-in` is dealing with the whole state handled by `redux-persist`.

[travis-image]: https://travis-ci.org/sirLisko/redux-persist-transform-expire-in.svg?branch=master
[travis-url]: https://travis-ci.org/sirLisko/redux-persist-transform-expire-in
