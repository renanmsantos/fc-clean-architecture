import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../entity/product";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {
    create(product: ProductInterface): Promise<void>;
    update(product: ProductInterface): Promise<void>;
  }
