import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUseCase {
    //Colocamos a interface aqui para que possamos usar qualquer repositório
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
        //Esse objeto customer não pode passar dessa camada!
        //Apenas DTOs devem perambular entre camadas
        const customer = await this.customerRepository.find(input.id);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number, 
                zip: customer.Address.zip,
            },
        };
    }
}