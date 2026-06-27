import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
} from "sequelize-typescript";
import Task from "./task";

@Table({
  tableName: "categories",
  timestamps: false,
})
class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Task)
  declare tasks: Task[];
}

export default Category;