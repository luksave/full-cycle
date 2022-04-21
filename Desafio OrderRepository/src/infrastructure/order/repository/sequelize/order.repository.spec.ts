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

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
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
    //Primeiro cria o cliente que vai ter a order
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    //Crio o cliente que será usado no update, senão dá problema com a chave exterior
    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    //Agora cria o produto que vai estar na order
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    //Agora cria o item que é o produto no carrinho
    const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2);

    //Agora sim cria a order
    const order = new Order("123", "123", [ordemItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    //Atualização sendo feita:
    order.changeCustomerId("456");
    await orderRepository.update(order);

    const orderModelUpd = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"], 
    });

    expect(orderModelUpd.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "456",
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

  it("should find an order", async () => {
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
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    //Agora sim cria a order
    const order = new Order("123", "123", [orderItem]);

    //Agora sim cria a order
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderR = await orderRepository.find(order.id);

    expect(orderR).toEqual(order);
  });

  it("should find all orders", async () => {
    //Primeiro cria o cliente que vai ter a order
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    //Agora cria o produto que vai estar na order
    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("234", "Product 2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const ordemItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      4
    );

    //customerId aqui deve ser igual ao customerId de customer criado acima
    const order1 = new Order("123", "123", [ordemItem1]);
    const order2 = new Order("234", "123", [ordemItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
