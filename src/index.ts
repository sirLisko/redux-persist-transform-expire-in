import {
  createTransform,
  Transform,
  TransformIn,
  TransformOut
} from "redux-persist";

/**
 * `redux-persist` transformer that reset the persisted redux state after a specific period of time.
 * @param {number} expireIn For how long the state is going to be preserved
 * @param {string} [expireKey="persistencyExpiration"] Key used by the localStorage
 * @param {any} defaultValue Value to which state will be cleared to
 */

const transformExpire = (
  expireIn: number,
  expireKey: string = "persistencyExpiration",
  defaultValue = {}
): Transform<any, any> => {
  const storedExpiration = localStorage.getItem(expireKey);
  let expired = false;

  if (storedExpiration) {
    const expiring = parseInt(storedExpiration);
    const now = new Date().getTime();
    expired = !isNaN(expiring) && now > expiring;
  }

  return createTransform(
    (inboundState: TransformIn<string, string>) => {
      setTimeout(() => {
        const expireValue = (new Date().getTime() + expireIn).toString();
        localStorage.setItem(expireKey, expireValue);
      }, 0);

      return inboundState;
    },
    (outboundState: TransformOut<string, string>) =>
      expired ? defaultValue : outboundState
  );
};

export default transformExpire;
