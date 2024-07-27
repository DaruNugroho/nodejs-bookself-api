const { addBookHandler, getAllBooks, getBooksById, editBookById } = require("./handler");

const routes = [
    {
        method : 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksById
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookById
    }
];

module.exports = routes;