import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./orderItem.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
    await sequelize.sync();

  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    
    //Primeiro cria o cliente que vai ter a order
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    //Agora cria o produto que vai estar na order
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    //Agora cria o item que é o produto no carrinho
    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    //Agora sim cria a order
    const order = new Order("123", "123", [ordemItem]);

    //Agora sim cria a order
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    //Agora verifico se está tudo criado corretamente:
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"], //Digo que quero trazer os items da order de uma vez.
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

 
  it("should update an order", async () => {
    const orderRepository = new OrderRepository();

    const item1 = new OrderItem("1", "item1", 10, "p1", 1);
    const item2 = new OrderItem("2", "item2", 15, "p2", 2);
    const order = new Order("1", "123", [item1, item2]);

    await orderRepository.create(order);

    order.changeCustomerId("Customer 2");
    await orderRepository.update(order);
    const orderModel = await OrderModel.findOne({ where: { id: "123" } });

    expect(orderModel.toJSON()).toStrictEqual({
      customer_id: "Customer 2",
      total: order.total(),
      //tem mais alguns itens?
    });
  });

  it("should find an order", async () => {
    const orderRepository = new OrderRepository();
    const item1 = new OrderItem("1", "item1", 10, "p1", 1);
    const item2 = new OrderItem("2", "item2", 15, "p2", 2);
    const order = new Order("1", "123", [item1, item2]);

    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("456ABC");
    }).rejects.toThrow("Order not found");
  });

  it("should find every Order", async () => {
    const orderRepository = new OrderRepository();
    const item1 = new OrderItem("1", "item1", 10, "p1", 1);
    const item2 = new OrderItem("2", "item2", 15, "p2", 2);
    const order = new Order("1", "123", [item1, item2]);

    const item3 = new OrderItem("3", "item3", 20, "p3", 3);
    const item4 = new OrderItem("4", "item4", 25, "p4", 4);
    const order2 = new Order("1", "123", [item3, item4]);

    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
  });

});