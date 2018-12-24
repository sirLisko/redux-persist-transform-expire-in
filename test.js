const expireIn = require("./index");
const mockdate = require("mockdate");

const reduxPersist = require("redux-persist");

const oneDay = 24 * 60 * 60 * 1000;

describe("redux-persist-transform-expire-in", () => {
  beforeEach(() => {
    mockdate.set("1/1/2000");
  });

  afterEach(() => {
    reduxPersist.createTransform.mockReset();
    mockdate.reset();
    localStorage.removeItem("persistencyExpiration");
    localStorage.removeItem("exp");
  });

  it("should write the expiration time in the localStorage", done => {
    expireIn(oneDay, "exp");
    expect(
      reduxPersist.createTransform.mock.calls[0][0]({ foo: "bar" })
    ).toEqual({
      foo: "bar"
    });
    setTimeout(() => {
      expect(parseInt(localStorage.getItem("exp"))).toBe(
        new Date(2000, 0, 2).getTime()
      );
      done();
    }, 1);
    expect(reduxPersist.createTransform).toHaveBeenCalled();
  });

  it("should return the state if not expiration token present", () => {
    expireIn(oneDay);
    expect(reduxPersist.createTransform).toHaveBeenCalled();
    expect(
      reduxPersist.createTransform.mock.calls[0][1]({ foo: "bar" })
    ).toEqual({ foo: "bar" });
  });

  it("should return the state if expiration token is NaN", () => {
    localStorage.setItem("persistencyExpiration", "foobar");
    expireIn(oneDay);
    expect(reduxPersist.createTransform).toHaveBeenCalled();
    expect(
      reduxPersist.createTransform.mock.calls[0][1]({ foo: "bar" })
    ).toEqual({ foo: "bar" });
  });

  it("should return the state if not expired", () => {
    localStorage.setItem(
      "persistencyExpiration",
      new Date().getTime() + oneDay
    );
    expireIn(oneDay);
    expect(reduxPersist.createTransform).toHaveBeenCalled();
    expect(
      reduxPersist.createTransform.mock.calls[0][1]({ foo: "bar" })
    ).toEqual({ foo: "bar" });
  });

  it("should not return the state if expired", () => {
    localStorage.setItem("persistencyExpiration", new Date().getTime());
    mockdate.set("1/3/2000");
    expireIn(oneDay);
    expect(reduxPersist.createTransform).toHaveBeenCalled();
    expect(
      reduxPersist.createTransform.mock.calls[0][1]({ foo: "bar" })
    ).toEqual({});
  });
});
