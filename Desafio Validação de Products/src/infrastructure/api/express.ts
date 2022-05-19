import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import ProductModel from "../product/repository/sequelize/product.model";
import { customerRoute } from "./route/customer.route";
import { productRoute } from "./route/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setUpDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:", 
        logging: false,
    });
    await sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
}

setUpDb();