import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PermissionRepository from "../repositories/PermissionRepository";

class PermissionController {
  async create(request: Request, response: Response) {
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description } = request.body;

    const existPermission = await permissionRepository.findOne({ name });

    if (existPermission) {
      return response.status(400).json({ err: "Permission already exists!" });
    }

    const permission = permissionRepository.create({
      name,
      description,
    });

    await permissionRepository.save(permission);

    return response.json(permission);
  }
}

export default new PermissionController();
