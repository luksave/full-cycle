import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreated.event";


//Esse handler informa uma das ações performadas quando um cliente foi criado
//Nesse caso, o handler imprime a mensagem "Esse é o primeiro console.log do evento: CustomerCreated".

export default class SendFirstConsoleWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated.`); 
  }
}