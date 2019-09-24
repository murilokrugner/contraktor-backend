import Sequelize, { Model } from 'sequelize';

class Partes extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        lastname: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Partes;
