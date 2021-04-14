export default () => ({
    port: parseInt(process.env.NODE_PORT, 10) || 3002,
    database: {
        host: process.env.NODE_ENV == 'DOCKER' ? 'mongo' : 'localhost',
        port: 27017,
        username: 'admin',
        password: 'p1c4d1nh0',
    },
});