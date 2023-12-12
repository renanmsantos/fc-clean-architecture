import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "ProductOne",
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("ProductOne");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "ProductOne",
    });
    expect(response.status).toBe(500);
  });

  it("should update a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product One",
        price: 10
      });
    const id = response.body.id;
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product One");
    expect(response.body.price).toBe(10);

    const updateResponse = await request(app)
      .put("/products" )
      .send({
        id: id,
        name: "Product Two",
        price: 20
      });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Product Two");
    expect(updateResponse.body.price).toBe(20);
  });

  it("should not update a product", async () => {
    const createResponse = await request(app)
    .post("/products")
    .send({
      name: "Product One",
      price: 10
    });
    expect(createResponse.status).toBe(200);
    expect(createResponse.body.name).toBe("Product One");
    expect(createResponse.body.price).toBe(10);
    const id = createResponse.body.id;

    const updateResponse = await request(app).put("/products").send({
      id: id
    });
    expect(updateResponse.status).toBe(500);
  });

  it("should find a product by id", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product One",
        price: 10
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product One");
    const id = response.body.id;
    
    const getResponse = await request(app).get("/products/" + id).send();

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Product One");
    expect(getResponse.body.price).toBe(10);

    const listResponseXML = await request(app)
    .get("/products/" + id)
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<name>Product One</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>`);
    
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product One",
        price: 10
      });
    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/products")
      .send({
        name: "Product Two",
        price: 10
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/products").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product One");
    expect(product.price).toBe(10);
    const productTwo = listResponse.body.products[1];
    expect(productTwo.name).toBe("Product Two");
    expect(productTwo.price).toBe(10);

    const listResponseXML = await request(app)
    .get("/products")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product One</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product Two</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>`);
    expect(listResponseXML.text).toContain(`</product>`);   
    expect(listResponseXML.text).toContain(`</products>`);

    
  });
});
