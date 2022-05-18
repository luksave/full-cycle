import EventInterface from "../../@shared/event/event.interface";

/**
 * O evento de um cliente que foi criado está sendo representado por uma classes que implementa a interface EventInterface
 * Essa classe conhece o momento em que o evento ocorreu e a informação do evento
 */

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}