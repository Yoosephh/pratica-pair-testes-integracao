import { app } from "../src/app";
import supertest from "supertest";
import { newFruit } from "./factories/fruit.factory";


const server = supertest(app);

describe('/POST fruits', () => {
  it('should return 201 when inserting a fruit', async () => {
    const fruit = newFruit()
    const response = await server.post('/fruits').send(fruit)
    expect(response.status).toBe(201)
  })
  it('should return 409 when inserting a fruit that is already registered', async () => {
    const fruit = newFruit()
    await server.post('/fruits').send(fruit)
    const response = await server.post("/fruits").send(fruit);
    expect(response.status).toBe(409);
  })
  it('should return 422 when inserting a fruit with data missing', async () => {
    const fruit = newFruit()
    delete fruit.name
    const response = await server.post("/fruits").send(fruit);
    expect(response.status).toBe(422);
  })
})

describe('/GET fruits', () => {
  it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async ()=> {
    const response = await server.get("/fruits/4")
    expect(response.status).toBe(404);
  })
  it("should return 400 when id param is present but not valid", async () => {
    const response = await server.get("/fruits/batata");
    expect(response.status).toBe(400);
  });
  it("should return one fruit when given a valid and existing id", async () => {
    const fruit = newFruit();
    await server.post("/fruits").send(fruit);

    const response = await server.get("/fruits/3");

    expect(response.body).toEqual({
      id: 3,
      name: fruit.name,
      price: fruit.price
    });
  });
  it("should return all fruits if no id is present", async () => {
    const response = await server.get("/fruits");
    expect(response.body.length).toBe(3);
  });
})