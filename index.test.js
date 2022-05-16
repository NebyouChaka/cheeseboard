
const { sequelize, Sequelize} = require('./db');
const { Board, Cheese, User } = require('./index');

describe('crud test', () =>{
    beforeAll(async () =>{
        await sequelize.sync ({force: true});
    })

    test('can Board create instance  ', async() =>{
        const board1 = await Board.create({type: 'wood', description: 'cutting', rating:5});  ///i created the first row
        const board2 = await Board.create({type: 'wood', description: 'cutting', rating:5});  ///i created the first row
        await board2.destroy()
        await board1.update({ type: "metal" })
        
        expect(board1.type).toBe('metal')
        expect(Board.length).toBe(0)
        
    })
    test('can Cheese delete, update, and create instance User', async() =>{
        const board1 = await Cheese.create({title: 'goat cheese', description: 'goat product'});  ///i created the first row
        const board2 = await Cheese.create({title: 'sheep cheese', description: 'sheep product'});  ///i created the first row
        await board2.destroy()
        await board1.update({  description: 'cow product' })
        console.log(board1)
        expect(board1.description).toBe('cow product')
         expect(Board.length).toBe(0)
    })
    test('can User delete, update, and create instance', async() =>{
        const board1 = await User.create({name: 'nebyou',  email: 'nebyouchaka@gmail.com'});  ///i created the first row
        const board2 = await User.create({name: 'micheal',  email: 'nebch@yahoo.com'});  ///i created the first row
        await board2.destroy()
        await board1.update({  name: 'john' })
      
        expect(board1.name).toBe('john')
         expect(Board.length).toBe(0)
    })
})

describe('Associate the User and Board models with a One-to-Many relationship ', ()=>{
    test('multiple Boards can be added to a user', async() =>{
        const userRed = await User.create({name: 'obama', email: 'nebyouchaka@gmail.com' })
        const Board1 = await Board.create({type: 'oak', description:'white color', ratin: 10});
        const Board2 = await Board.create({type: 'cherry', description:'blue color', ratin: 9});
        const Board3 = await Board.create({type: 'maple', description:'green color', ratin: 8});
        const Board4 = await Board.create({type: 'plywood', description:'yellow color', ratin: 7});


        await userRed.addBoard(Board1)
        await userRed.addBoard(Board2)
        await userRed.addBoard(Board3)
        await userRed.addBoard(Board4)



        const share = await userRed.getBoards()
        expect(share.length).toBe(4) 
})
test('Cheese models with a Many-to-Many relationship.',async() =>{
        const Board1 = await Board.create({type: 'oak', description:'white color', ratin: 10});
        const Board2 = await Board.create({type: 'cherry', description:'blue color', ratin: 9});
        const Board3 = await Board.create({type: 'maple', description:'green color', ratin: 8});
        const Board4 = await Board.create({type: 'plywood', description:'yellow color', ratin: 7});
        const processCheese1 = await Cheese.create({title: 'goat cheese', description: 'goat product'});  
        const processCheese2 = await Cheese.create({title: 'cheddar', description: 'sheep product'}); 
        const processCheese3 = await Cheese.create({title: 'mozzarella', description: 'sheep product'}); 
        const processCheese4 = await Cheese.create({title: 'parmesan', description: 'sheep product'});

            await Board2.addcheese(processCheese1)
            await Board2.addcheese(processCheese2)
            await Board2.addcheese(processCheese3)
            await Board2.addcheese(processCheese4)

            await processCheese2.addBoard(Board1)
            await processCheese2.addBoard(Board2)
            await processCheese2.addBoard(Board3)
            await processCheese2.addBoard(Board4)
           

            const processCheese2add = await processCheese2.getBoards()
            expect(processCheese2add.length).toBe(4)
})
})
describe('Eager Loading',()=>{
    test('A board can be loaded with its cheeses', async ()=>{
        const boardLoaded = await User.findAll({
            include: [
                {
                    model:Board, As: 'tools'
                }
            ]
        })
        expect(boardLoaded.length).toBe(2)
        // console.log(boardLoaded);
    })
    test('A user can be loaded with its boards', async ()=>{
        const UserAndBoards = await User.findAll({
            include: [
                {
                    model:Board, As: 'user + boards'
                }
            ]
        })
        expect(UserAndBoards.length).toBe(2)
    })
    test('A cheese can be loaded with its board data', async ()=>{
        const CheeseAndBoards = await Cheese.findAll({
            include: [
                {
                    model:Board, As: 'cheese + boards'
                }
            ]
        })
        expect(CheeseAndBoards.length).toBe(2)
    })
 })        

