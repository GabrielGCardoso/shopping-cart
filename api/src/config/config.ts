export default () => ({
    port: parseInt(process.env.NODE_PORT, 10) || 3000,
    productsMs: {
        host: process.env.NODE_ENV == 'DOCKER' ? 'products-ms' : 'http://localhost:3002',
    },
    shoppingCartMs: {
        host: process.env.NODE_ENV == 'DOCKER' ? 'shopping-cart-ms' : 'http://localhost:3001',
    }
});