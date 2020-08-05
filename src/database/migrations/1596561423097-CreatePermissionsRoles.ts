import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePermissionsRoles1596561423097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permissions_roles",
        columns: [
          { name: "role_id", type: "uuid" },
          { name: "permission_id", type: "uuid" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "permissions_roles",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "permissions",
        name: "fk_permissions_roles_",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "permissions_roles",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        name: "fk_roles_permissions",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "permissions_roles",
      "fk_roles_permissions"
    );
    await queryRunner.dropForeignKey(
      "permissions_roles",
      "fk_permissions_roles_"
    );

    await queryRunner.dropTable("permissions_roles");
  }
}
