const { addBookHandler, getAllBookHandler, getBookByIdHanlder, editBookByIdHandler } = require('./handler');

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
    },
    {
        method:'PUT',
        path:'/books/{id}',
        handler: editBookByIdHandler
    }
    
];

module.exports = routes;