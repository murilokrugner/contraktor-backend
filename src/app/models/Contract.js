import Sequelize, { Model } from 'sequelize';

class Contract extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        initialdate: Sequelize.DATE,
        expirydate: Sequelize.DATE,
        delete_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
  }
}

export default Contract;
