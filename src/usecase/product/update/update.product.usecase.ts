import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product"

export default class CreateProductUseCase {
  private repository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.repository = productRepository;
  }

  async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    
    const product = ProductFactory.create(
      "a", input.name, input.price
    );

    await this.repository.create(product as Product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
