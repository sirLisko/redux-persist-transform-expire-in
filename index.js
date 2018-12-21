const reduxPersist = require("redux-persist");

module.exports = (expireIn, expireKey = "persistencyExpiration") => {
  const expiring = parseInt(localStorage.getItem(expireKey));
  const now = new Date().getTime();
  const expired = !isNaN(expiring) && now > expiring;
  return reduxPersist.createTransform(
    (inboundState, key) => {
      setTimeout(
        () => localStorage.setItem(expireKey, new Date().getTime() + expireIn),
        0
      );
      return inboundState;
    },
    (outboundState, key) => (expired ? {} : outboundState)
  );
};
