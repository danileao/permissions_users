import { Repository, EntityRepository } from "typeorm";
import Product from "../models/Product";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export default ProductRepository;
