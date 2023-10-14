const { nanoid } = require('nanoid');
const books = require('./books');
const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(15);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, insertedAt, updateAt
    };

    books.push(newBook);

    if(name === undefined){
        const response = h.response({
           status: 'fail',
           message: 'Gagal menambahkan buku. Mohon isi nama buku'

        });
        response.code(400);
        return response;
    }

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
const getAllBookHandler = () => ({
    status: 'success',
    data: {
        books
    }
});
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
const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updateAt = new Date().toISOString();
    const index = notes.findIndex((book) => book.id === id);

    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCOunt,
            readPage,
            reading,
            updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbaharui',
        })
        response.code(200);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        mesage: 'Gagal memperbaharui buku. Id tidak ditemukan'
    })

    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbaharui buku. readPage tidak boleh lebih besar dari pageCount'
        })
    }

}
module.exports = { addBookHandler, getAllBookHandler, getBookByIdHanlder, editBookByIdHandler };