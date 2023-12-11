import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test list product use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should list a products", async () => {
      const productRepository = new ProductRepository();
      const usecase = new ListProductUseCase(productRepository);
  
      const productOne = ProductFactory.create("a", "Product One", 10);
      const productTwo = ProductFactory.create("a", "Product Two", 20);
  
      await productRepository.create(productOne);
      await productRepository.create(productTwo);
  
      const input = {};
  
      const output = { "products" : [{
        id: expect.any(String),
        name: "Product One", 
        price: 10
      }, {
        id: expect.any(String),
        name: "Product Two", 
        price: 20
      }]};
  
      const result = await usecase.execute(input);
  
      expect(result).toEqual(output);
    });
  });