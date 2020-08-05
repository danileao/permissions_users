import { Repository, EntityRepository } from "typeorm";
import Role from "../models/Role";

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {}

export default RoleRepository;
