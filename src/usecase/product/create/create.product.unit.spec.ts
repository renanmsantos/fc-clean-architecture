import CreateProductUseCase from "./create.product.usecase";
const input = {
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

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
});

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "ProductOne";
    input.price = -2;

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

});
