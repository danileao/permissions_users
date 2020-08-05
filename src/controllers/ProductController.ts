import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../repositories/ProductRepository";

class PermissionController {
  async create(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { name, description } = request.body;

    const existsProduct = await productRepository.findOne({ name });

    if (existsProduct) {
      return response.status(400).json({ err: "Product already exists!" });
    }

    const product = productRepository.create({
      name,
      description,
    });

    await productRepository.save(product);

    return response.json(product);
  }

  async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return response.json(products);
  }

  async show(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { id } = request.params;

    const product = await productRepository.findOne(id);

    return response.json(product);
  }
}

export default new PermissionController();
