const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} = graphql;

const books = [
    {name: 'uno the book', genre: 'game', id: '1'},
    {name: 'Duplex to suplex', genre: 'nonfiction', id: '2'},
    {name: 'Thrice', genre: 'fiction', id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                // stuff
                console.log('parent: ', parent);
                console.log('args: ', args);
                const book = books.find(book => {
                    return book.id === args.id
                })
                return book;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
