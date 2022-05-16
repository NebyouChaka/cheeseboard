const { Board } = require('./Board');
const { Cheese } = require('./Cheese');
const {User} = require('./User')


User.hasMany(Board);
Board.belongsTo(User);
Cheese.belongsTo(Board);
Board.hasMany(Cheese);
module.exports= {Board,Cheese,User}
