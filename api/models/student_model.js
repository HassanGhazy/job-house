module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      name: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      }
    });
  
    return Student;
  };