const { addBookHandler, getAllBookHandler, getBookByIdHanlder } = require('./handler');

const routes = [
    {
        method:'POST',
        path:'/books',
        handler: addBookHandler
    },
    {
        method:'GET',
        path:'/books',
        handler: getAllBookHandler
    },
    {
        method:'GET',
        path:'/books/{id}',
        handler: getBookByIdHanlder
    }
    
];

module.exports = routes;