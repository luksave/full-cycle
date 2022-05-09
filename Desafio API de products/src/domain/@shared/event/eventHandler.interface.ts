import EventInterface from "./event.interface";
//<T extends ...> garante que esse generic receba apenas eventos que implementem EventInterface!
export default interface EventHandlerInterface<T extends EventInterface = EventInterface> {
  handle(event: T): void;
}
