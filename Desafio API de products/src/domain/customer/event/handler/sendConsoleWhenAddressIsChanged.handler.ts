import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerAddressChanged from "../customerAddressChanged.event";


//Esse handler informa a ação performadas quando o endereço de um cliente foi alterado
//Nesse caso, o handler imprime a mensagem "Endereço do cliente: {id}, {nome} alterado para: {endereco}".
//Para isso o evento desse handler deve receber de alguma forma os dados de ID, nome e endereço do cliente

export default class SendConsoleWhenAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChanged>
{
  handle(event: CustomerAddressChanged): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, 
                  ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
  }
}