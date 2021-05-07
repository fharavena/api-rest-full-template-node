const env = process.env;

const config = {
  db: { 
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_geshan-lr',
    password: env.DB_PASSWORD || 'G2VjjQ5d47zyjqX',
    database: env.DB_NAME || 'freedbtech_language',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;