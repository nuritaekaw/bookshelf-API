const { nanoid } = require('nanoid');
const books = require('./books');
const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(15);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;
    const finished = (readPage === pageCount);
   

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updateAt
    };

    books.push(newBook);
    
    if(name === undefined){
        const response = h.response({
           status: 'fail',
           message: 'Gagal menambahkan buku. Mohon isi nama buku'

        });
        response.code(400);
        return response;
    };
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }
    
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(isSuccess){
        
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                BookId: id,
            }
        });
        response.code(201);
        return response;
    }

    

};
const getAllBookHandler = (request, h) => {
    const { name, reading } = request.query;
    if(name === undefined && reading === undefined){
        return {
        status: 'success',
        data: {
                books
            }
        }
    }
    books.filter((b) => b.name.toLowerCase() === name.toLowerCase()[0])
    if(name !== undefined){
        
            return{
                status: 'success',
                data: {
                 books: books.filter(book => book.name.toLowerCase() === name.toLowerCase())
                
                },
            };
        
    }
    if(reading === '1'){
        return{
            status: 'success',
            data: {
             books: books.filter(book => book.reading === true)
                
            },
        };
    }
    if(reading === '0'){
        return{
            status: 'success',
            data: {
             books: books.filter(book => book.reading === false)
                
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
        
};
const getBookByIdHanlder = (request, h) => {
    const { id } = request.params;
    const book = books.filter((b) => b.id === id)[0];
    if(book !== undefined){
       return {
            status: 'success',
            data: {
                 book,
            },
       };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const getBookByNameHanlder = (request, h) => {
    const { name } = request.query;
    const book = books.filter((b) => b.name === name)[0];
    if(book !== undefined){
        return{
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toString();
    const index = books.findIndex((book) => book.id === id);

    if(name === undefined){
        const response = h.response({
           status: 'fail',
           message: 'Gagal menambahkan buku. Mohon isi nama buku'

        });
        response.code(400);
        return response;
    };
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response;
    };
    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui buku. Id tidak ditemukan'
    })
    response.code(404);
    return response;
}
const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);
    if(index != -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })
        response.code(200);
        return response;

    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404);
    return response;

}
module.exports = { addBookHandler, getAllBookHandler, getBookByIdHanlder, getBookByNameHanlder, editBookByIdHandler, deleteBookByIdHandler };