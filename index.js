const { Board } = require('./Board');
const { Cheese } = require('./Cheese');
const {User} = require('./User')


User.hasMany(Board);
Board.belongsTo(User);
module.exports= {Board,Cheese,User}
