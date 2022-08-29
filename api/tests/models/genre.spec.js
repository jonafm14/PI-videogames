const { Genres, conn } = require("../../src/db");

describe("Genre Model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Genres.sync({ force: true }));
    describe("name and id", () => {
      it("should throw an error if name is null", (done) => {
        Genres.create({})
          .then(() => done(new Error("It requires a valid name and a id")))
          .catch(() => done());
      });
      it("should work when its a valid name and id", () => {
        Genres.create({
          id: "1eb976bc-ddf3-4594-8bfb-659d64e7fb30",
          name: "Mario",
        });
      });
    });
  });
});
