module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contracts', 'file_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('contracts', 'file_id');
  },
};
