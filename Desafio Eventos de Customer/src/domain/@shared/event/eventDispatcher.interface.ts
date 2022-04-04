import EventHandlerInterface from "./eventHandler.interface";
import EventInterface from "./event.interface";

/**
 * Responsável por armazenar e executar os handlers de um evento quando ele for disparado
 * Notifica e Registra todos eventos e handlers de eventos ocorridos 
 * Quando notifica a ocorrência de um evento, os handlers executam
 */

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}