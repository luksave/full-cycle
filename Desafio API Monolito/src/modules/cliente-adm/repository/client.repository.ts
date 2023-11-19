import Id from "../../@shared/domain/value-object/id.value-object";
import clientEntity from "../domain/client.entity";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(_client: clientEntity): Promise<clientEntity> {
        try {
            await ClientModel.create({
                id: _client.id.id,
                name: _client.name,
                document: _client.document,
                email: _client.email,
                street: _client.street,
                number: _client.number,
                complement: _client.complement,
                city: _client.city,
                state: _client.state,
                zipCode: _client.zipCode,
                createdAt: _client.createdAt,
                updatedAt: _client.updatedAt,
            });
        } catch (error: any) {
            //return Promise.reject(new Error(`Failed to add client: ${error.message}`));
            return Promise.reject(error);
        }
    }
    
    async find(id: string): Promise<clientEntity> {
        const client = await ClientModel.findOne({ where: {id} });

        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }
}
