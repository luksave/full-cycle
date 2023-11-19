import { Sequelize } from "sequelize-typescript";

import  Id  from "../../@shared/domain/value-object/id.value-object";
import  Order  from "../domain/order.entity";
import  Client  from "../domain/client.entity";
import  Product  from "../domain/product.entity";

import { OrderModel } from "./order.model";
import OrderRepository from "./order.repository";


const mockDate = new Date(2000, 1, 1);

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel]);
    await sequelize.sync();

    jest.useFakeTimers("modern");
    jest.setSystemTime(mockDate);
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it("should add an order", async () => {
    const product1 = new Product({
      name: "Product 1",
      salesPrice: 100,
      description: "Description 1",
    });

    const product2 = new Product({
      name: "Product 2",
      salesPrice: 200,
      description: "Description 2",
    });

    const orderClient = new Client({
        id: new Id("1"),
        name: "John Doe",
        document: "Document 1",
        email: "john.doe@email.com",
        street: "Main Street",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "12345",
    });

    const order = new Order({
      client: orderClient,
      products: [product1, product2],
    });

    order.approved();

    const orderRepository = new OrderRepository();
    await orderRepository.addOrder(order);

    //PESQUISAR O PEDIDO NO BANCO
    const orderOnDB = await OrderModel.findByPk(order.id.id);

    //VERIFICAR SE O PEDIDO EXISTE
    expect(orderOnDB).not.toBeNull();

    //VERIFICAR SE O PEDIDO ESTÁ COM O STATUS APROVADO
    expect(orderOnDB.status).toEqual("approved");

    //expect(result).toStrictEqual(order);
  });

  it("should find an order", async () => {
    const orderData = {
      id: "321",
      createdAt: mockDate,
      updatedAt: mockDate,
      status: "approved",
      invoiceId: "anyInvoiceId",
      client: {
        id: "1",
        createdAt: mockDate,
        updatedAt: mockDate,
        name: "John Doe",
        email: "john.doe@email.com",
        document: "Document 1",
        street: "Main Street",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "12345",
      },
      products: [
        {
          id: "35",
          createdAt: mockDate,
          updatedAt: mockDate,
          name: "Product 1",
          description: "Description 1",
          salesPrice: 100,
        },
        {
          id: "63",
          createdAt: mockDate,
          updatedAt: mockDate,
          name: "Product 2",
          description: "Description 2",
          salesPrice: 200,
        },
      ],
    };

    await OrderModel.create(orderData);
    const orderRepository = new OrderRepository();

    const result = await orderRepository.findOrderById("321");

    expect(result.id.id).toEqual(orderData.id);
    expect(result.status).toEqual(orderData.status);

    const clientResult = result.client;
    expect(clientResult.id).toEqual(orderData.client.id);
    expect(clientResult.name).toEqual(orderData.client.name);
    expect(clientResult.document).toEqual(orderData.client.document);
    expect(clientResult.email).toEqual(orderData.client.email);
    expect(clientResult.street).toEqual(orderData.client.street);
    expect(clientResult.number).toEqual(orderData.client.number);
    expect(clientResult.complement).toEqual(orderData.client.complement);
    expect(clientResult.city).toEqual(orderData.client.city);
    expect(clientResult.state).toEqual(orderData.client.state);
    expect(clientResult.zipCode).toEqual(orderData.client.zipCode);


    expect(result.products.length).toEqual(orderData.products.length);

    const firstProductResult = result.products[0];
    expect(firstProductResult.id).toEqual(orderData.products[0].id);
    expect(firstProductResult.name).toEqual(orderData.products[0].name);
    expect(firstProductResult.salesPrice).toEqual(
      orderData.products[0].salesPrice
    );
    expect(firstProductResult.description).toEqual(
      orderData.products[0].description
    );
  });
});
