import Id from "../../@shared/domain/value-object/id.value-object";
import clientEntity from "../domain/client.entity";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(_client: clientEntity): Promise<void> {
        await ClientModel.create({
            id: _client.id.id,
            name: _client.name,
            email: _client.email,
            address: _client.address,
            createdAt: _client.createdAt,
            updatedAt: _client.updatedAt,
        });
    }
    
    async find(id: string): Promise<clientEntity> {
        const client = await ClientModel.findOne({ where: {id} });

        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }
}
