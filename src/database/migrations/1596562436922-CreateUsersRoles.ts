import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUsersRoles1596562436922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_roles",
        columns: [
          { name: "role_id", type: "uuid" },
          { name: "user_id", type: "uuid" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "users_roles",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        name: "fk_roles_user",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "users_roles",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        name: "fk_users_roles",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users_roles", "fk_roles_user");
    await queryRunner.dropForeignKey("users_roles", "fk_users_roles");

    await queryRunner.dropTable("users_roles");
  }
}
