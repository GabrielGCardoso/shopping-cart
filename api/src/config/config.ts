export default () => ({
    port: parseInt(process.env.NODE_PORT, 10) || 3000,
    productsMs: {
        host: process.env.NODE_ENV == 'DOCKER' ? 'http://products-ms:3002' : 'http://localhost:3002',
    },
    shoppingCartMs: {
        host: process.env.NODE_ENV == 'DOCKER' ? 'http://shopping-cart-ms:3001' : 'http://localhost:3001',
    }
});