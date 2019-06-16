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
 */
const transformExpire = (
  expireIn: number,
  expireKey: string = "persistencyExpiration"
): Transform<any, any> => {
  let expired = false;
  const storedExpiration = localStorage.getItem(expireKey);
  if (storedExpiration) {
    const expiring = parseInt(storedExpiration);
    const now = new Date().getTime();
    expired = !isNaN(expiring) && now > expiring;
  }
  return createTransform(
    (
      inboundState: TransformIn<string, string>
    ): TransformIn<string, string> => {
      setTimeout(
        (): void =>
          localStorage.setItem(
            expireKey,
            (new Date().getTime() + expireIn).toString()
          ),
        0
      );
      return inboundState;
    },
    (
      outboundState: TransformOut<string, string>
    ): TransformOut<string, string> | any => (expired ? {} : outboundState)
  );
};

export default transformExpire;
