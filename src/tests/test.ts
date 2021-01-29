import request from "supertest";
import app from "../app";
const req = request(app);

describe("Post Endpoints", () => {
  it("should get personal info", async () => {
    const res = await req.get("/");
    expect(res.status).toEqual(200);
    expect(res.body.data).toHaveProperty("name", "Iwuji Anthony");
    expect(res.body.data).toHaveProperty("email", "anabizconcept9@gmail.com");
  });

  it('testing for string "data" datatype', async () => {
    const res = await req.post("/validate-rule").send({
      rule: {
        field: "0",
        condition: "eq",
        condition_value: "a",
      },
      data: "damien-marley",
    });
    expect(res.status).toEqual(400);
    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "field 0 failed validation.");
  });

  it('testing for object "data" datatyp and "gte" condition', async () => {
    const res = await req.post("/validate-rule").send({
      rule: {
        field: "missions.count",
        condition: "gte",
        condition_value: 30,
      },
      data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        missions: {
          count: 45,
          successful: 44,
          failed: 1,
        },
      },
    });
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty(
      "message",
      "field missions.count successfully validated.",
    );
  });

  it('testing for object "data" datatyp and "enq" condition', async () => {
    const res = await req.post("/validate-rule").send({
      rule: {
        field: "missions.count",
        condition: "neq",
        condition_value: 30,
      },
      data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        missions: {
          count: 30,
          successful: 44,
          failed: 1,
        },
      },
    });
    expect(res.status).toEqual(400);
    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty(
      "message",
      "field missions.count failed validation.",
    );
  });

  it('testing for array "data" datatype and "contains" condition', async () => {
    const res = await req.post("/validate-rule").send({
      rule: {
        field: "5",
        condition: "contains",
        condition_value: "rocinante",
      },
      data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
    });
    expect(res.status).toEqual(400);
    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("message", "field 5 is missing from data.");
  });

  it('testing for array "data" datatype that pass validation', async () => {
    const res = await req.post("/validate-rule").send({
      rule: {
        field: "1",
        condition: "contains",
        condition_value: "The Razorback",
      },
      data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
    });
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty(
      "message",
      "field 1 successfully validated.",
    );
  });

  it('testing for object "data" datatype with "gt" condition', async () => {
    const res = await req.post("/validate-rule").send({
      rule: {
        field: "count",
        condition: "gt",
        condition_value: 30,
      },
      data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        count: 22,
      },
    });
    expect(res.status).toEqual(400);
    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty(
      "message",
      "field count failed validation.",
    );
  });
});
