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

    if(name === ''){
        const response = h.response({
           

        })
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

module.exports = { addBookHanlder };