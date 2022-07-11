'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for the title'
        },
        notNull: {
          msg: 'Please provide a value for the title'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for the author'
        },
        notNull: {
          msg: 'Please provide a value for the author'
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};