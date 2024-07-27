const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const date = new Date().toISOString();
    const insertedAt = date;
    const updatedAT = date;
    const finished = readPage === pageCount;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAT
    }

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id );

    if(name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    
        response.code(400);
        return response;
    }


    if(readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    
        response.code(400);
        return response;
    }


    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId : id,
            },
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    return response;
}



const getAllBooks = () => {

    const listOfBooks = books.map((book) => {
        return {
            id: book.id,
            name: book.name,
            publisher: book.publisher
        }
    });

    return {
        status: 'success',
        data: {
            books : listOfBooks
        }
    }
};


const getBooksById = (request, h) => {
    const { id } = request.params;
    const book = books.filter((book) => book.id === id)[0];

    if(book !== undefined) {
        return {
            status: 'success',
            data: {
                book: book
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menampilkan data buku. Id tidak temukan',
    });

    response.code(404);
    return response;
}


const editBookById = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAT = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if(name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    
        response.code(400);
        return response;
    }


    if(readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    
        response.code(400);
        return response;
    }

    if(index !== -1) {
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
            updatedAT
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil di perbaharui',
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal di perbaharui. Id tidak ditemukan'
    });

    response.code(404);
    return response;
}


const deleteBookById = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);

    if(index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus!'
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan!'
    });

    response.code(404);
    return response;
}

module.exports = { addBookHandler, getAllBooks, getBooksById, editBookById, deleteBookById };