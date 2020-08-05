import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import RoleRepository from "../repositories/RoleRepository";

class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);

    const { name, username, password, roles } = request.body;

    const existUser = await userRepository.findOne({ username });

    if (existUser) {
      return response.status(400).json({ message: "User already exists!" });
    }

    const passwordHashed = await hash(password, 8);

    const existsRoles = await roleRepository.findByIds(roles);
    console.log(existsRoles);

    const user = userRepository.create({
      name,
      username,
      password: passwordHashed,
      roles: existsRoles,
    });

    await userRepository.save(user);

    delete user.password;

    return response.status(201).json(user);
  }
}

export default new UserController();
