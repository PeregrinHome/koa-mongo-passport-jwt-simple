module.exports = {
    // secret data can be moved to env variables
    // or a separate config
    port: 3000,
    secret: process.env.SECRET || 'mySecret',
    root: process.cwd(),
    mongoose: {
        uri:     process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/app',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                },
                poolSize:      5
            }
        }
    },
    auth: {
      password: {
          pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
      }
    },
    crypto: {
        hash: {
            length:     128,
            iterations: process.env.TRACE === 'production' ? 12000 : 1
        }
    },
};
