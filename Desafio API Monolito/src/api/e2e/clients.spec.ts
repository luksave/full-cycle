import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
        id: "1",
        name: "john doe",
        email: "john.doe@email.com",
        document: "215251",
        street: "Main Street. 123",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "12345",
    });

    expect(response.status).toEqual(201);
  });

  it("should not create a client when name is not provided", async () => {
    const response = await request(app).post("/clients").send({
        id: "1",
        email: "john.doe@email.com",
        //name: "Aaaaaaaah",
        document: "66666666",
        street: "Main Street. 123",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "12345",
    });

    expect(response.status).toEqual(400);
  });
});
