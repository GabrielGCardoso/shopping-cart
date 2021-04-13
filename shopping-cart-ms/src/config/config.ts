export default () => ({
    port: parseInt(process.env.NODE_PORT, 10) || 3001,
    database: {
        host: process.env.NODE_ENV == 'DOCKER' ? 'mysql' : 'localhost',
        port: 3306
    }
});