import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreated.event";


//Esse handler informa uma das ações performadas quando um cliente foi criado
//Nesse caso, o handler imprime a mensagem "Esse é o primeiro console.log do evento: CustomerCreated".

export default class SendSecondConsoleWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(JSON.stringify(`Esse é o segundo console.log do evento: CustomerCreated.`)); 
  }
}