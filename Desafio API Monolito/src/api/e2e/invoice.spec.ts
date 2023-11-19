import { response } from 'express';
import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for invoice', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        sequelize.connectionManager.initPools();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should find an invoice', async () => {
        const client = await request(app)
            .post('/clients')
            .send({
                "id": "1c",
                "name": "jose",
                "email": "email@email",
                "document": "123",
                "street": "street",
                "number": "123",
                "city": "city",
                "zipCode": "zipCode",
                "state": "state",
                "complement": "complement"
            });

            console.log("CLIENT INVOICE.SPEC",client.body);

        const product = await request(app)
            .post('/products')
            .send({
                "id": "1p",
                "name": "product",
                "description": "description",
                "purchasePrice": 100,
                "stock": 10
            });

            console.log("PRODUCT INVOICE.SPEC",product.body);
            
        const checkout = await request(app)
            .post('/checkout')
            .send({
                "clientId": "1c",
                "products": [
                    {
                        "productId": "1p"
                    }
                ]
            });

            console.log("CHECKOUT INVOICE.SPEC", checkout.body);

        const response = await request(app)
            .get(`/invoice/${checkout.body.invoiceId}`)
            .send();

            console.log("RESPONSE INVOICE.SPEC", response.body);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('jose')
        expect(response.body.items.length).toBe(1)
        expect(response.body.total).toBe(100)
    }, 50000);

});