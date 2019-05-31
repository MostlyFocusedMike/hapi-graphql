const Hapi = require('@hapi/hapi');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const myGraphQLSchema = require('./myGraphqlSchema');

const HOST = 'localhost';
const PORT = 3001;

async function StartServer() {
  const server = new Hapi.server({
    host: HOST,
    port: PORT,
  });

  await server.register([
      {
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema: myGraphQLSchema,
            },
            route: {
                cors: true,
            },
        },
    },
    {
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql',
          },
        }
    },
    ]);

    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();