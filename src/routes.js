const { addBookHandler, getAllBookHandler, getBookByIdHanlder, editBookByIdHandler, deleteBookByIdHandler, getBookByNameHanlder } = require('./handler');

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
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler
    }, 
    // {
    //     method: 'GET',
    //     path: '/books/{name?}',
    //     handler: (request, h) => {
    //         getBookByIdHanlder = request.params;
    //         return getBookByNameHanlder;
    //     }
    // }
   
    
];

module.exports = routes;