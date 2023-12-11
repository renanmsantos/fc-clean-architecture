import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productOne = ProductFactory.create("a","ProductOne", 10);
const productTwo = ProductFactory.create("a","ProductTwo", 20);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list a product", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(productOne.id);
    expect(output.products[0].name).toBe(productOne.name);
    expect(output.products[0].price).toBe(productOne.price);
    expect(output.products[1].id).toBe(productTwo.id);
    expect(output.products[1].name).toBe(productTwo.name);
    expect(output.products[1].price).toBe(productTwo.price);
  });
});
