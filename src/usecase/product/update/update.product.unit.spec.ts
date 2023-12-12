import UpdateProductUseCase from "./update.product.usecase";
import { v4 as uuid } from "uuid";

const input = {
  id: uuid(),
  name: "ProductOne",
  price: 10
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
});

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    input.name = "ProductOne";
    input.price = -2;

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

});
