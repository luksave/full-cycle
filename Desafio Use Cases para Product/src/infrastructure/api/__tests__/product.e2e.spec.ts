import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "123",
                name: "necklace",
                price: 100,
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBe("123");
        expect(response.body.name).toBe("necklace");
        expect(response.body.price).toBe(100);
    });

    it("should not create a product", async () => {
        //Quero passar parâmetros errados e receber um erro
        const response = await request(app)
            .post("/product") 
            .send({
                name: "necklace", 
            });
        expect(response.status).toBe(500);
    });


    it("should list all products", async () => {
        const response1 = await request(app)
            .post("/product")
            .send({
                id: "123",
                name: "necklace",
                price: 100,
            });
        expect(response1.status).toBe(200);

        const response2 = await request(app)
        .post("/product")
        .send({
            id: "456",
            name: "rubbiks cube",
            price: 14,
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product = listResponse.body.products[0];
        expect(product.name).toBe("necklace");
        expect(product.price).toBe(100);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("rubbiks cube");
        expect(product2.price).toBe(14);

    });

});