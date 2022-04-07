import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import ProductCreatedEvent from "../productCreated.event";

//Esse handler informa uma das ações performadas quando um produto foi criado
//Nesse caso, o handler realizar o envio de um email.

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....`); 
  }
}