import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { productsRoute } from "./routes/product.route";
import { clientsRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";


import { OrderModel } from "../modules/checkout/repository/order.model";
import { ClientModel } from "../modules/cliente-adm/repository/client.model";
import { TransactionModel } from "../modules/payment/repository/transaction.model";
import ClientOrder from "../modules/checkout/repository/client.order.model";
import ProductOrder from "../modules/checkout/repository/product.order.model";
import { ProductModel } from "../modules/product-adm/repository/product.model";
import ProductStoreModel from "../modules/store-catalog/repository/product.model";
import InvoiceModel from "../modules/invoice/repository/transaction.model";
import InvoiceItemModel from "../modules/invoice/repository/transaction.item.model";
import { invoiceRoute } from "./routes/invoice.route";


export const app: Express = express();
app.use(express.json());

app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    ProductModel, 
    ClientModel, 
    ProductStoreModel, 
    TransactionModel,
    OrderModel,
    ClientOrder,
    InvoiceModel,
    ProductOrder,
    InvoiceItemModel
  ]);

  await sequelize.sync();
}

setupDb();
