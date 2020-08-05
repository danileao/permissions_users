import { Repository, EntityRepository } from "typeorm";
import User from "../models/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
