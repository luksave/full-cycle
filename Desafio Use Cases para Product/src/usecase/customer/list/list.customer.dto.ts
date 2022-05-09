//Vazio, mas criado. Poderiamos passar algo paginação no futuro
export interface InputListCustomerDTO {}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
};

export interface OutputListCustomerDTO {
    customers: Customer[];
}