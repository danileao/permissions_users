import { Repository, EntityRepository } from "typeorm";
import Permission from "../models/Permission";

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> {}

export default PermissionRepository;
