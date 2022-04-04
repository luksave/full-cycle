import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./orderItem.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItem from "../../../../domain/checkout/entity/orderItem";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
    },
    {
      include: [{ model: OrderItemModel }],
    }
    );
  }

  
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, rejectOnEmpty: true });
  
    const orderItems = orderModel.items.map((orderItem) =>
      new OrderItem(
        orderItem.id,
        orderItem.name,
        orderItem.price,
        orderItem.product_id,
        orderItem.quantity
      )
    );

    let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
    order.validate();

    return order;

  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();

    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((orderItem) =>
        new OrderItem(
          orderItem.id,
          orderItem.name,
          orderItem.price,
          orderItem.product_id,
          orderItem.quantity
        )
      );

      let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
      order.validate();

      return order;
    });

    return orders;
  }

}