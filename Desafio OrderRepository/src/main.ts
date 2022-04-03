import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/orderItem";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

//Agregado com relação de ID
let customer = new Customer("123", "Lucas Felipe");
const address = new Address("Rua dois", 2, "1242-678", "São Paulo");
customer.Address = address;
customer.activate();

//Agregado com relação de objeto
const item1 = new OrderItem("1", "item1", 10, "p1", 1);
const item2 = new OrderItem("2", "item2", 15, "p2", 2);
const order = new Order("1", "123", [item1, item2]);
