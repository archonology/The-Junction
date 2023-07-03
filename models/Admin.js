import { Model, DataTypes } from 'sequelize';
import { compareSync, hash } from 'bcrypt';
import sequelize from '../config/connection';

class Admin extends Model {
  checkPassword(loginPw) {
    return compareSync(loginPw, this.password);
  }
}

Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Adminname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (newAdminData) => {
          newAdminData.password = await hash(newAdminData.password, 10);
          return newAdminData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'Admin',
    }
  );
  
  export default Admin;