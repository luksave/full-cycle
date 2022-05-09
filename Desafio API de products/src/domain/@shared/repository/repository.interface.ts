export default interface RepositoryInterface<T> {
    //Typescript funciona com interfaces genéricas
    //<T>: tipo de interface genérica usada

    //Quando se está criando algo, como um produto, faz sentido retornar o produto,
    //sendo que já se tem o mesmo criado? Não. É muito raro
    
    create(entity: T): Promise<void>;
    
    update(entity:T):  Promise<void>;
    
    //<T> no fim das contas são os agregados. Estamos passando um id e recebendo o objeto de interesse no repositório.
    find(id: string): Promise<T>; 

    //Todas as vezes que se faz um findAll, podemos retornar um objeto com metadados, como um count, para saber a quantidade de registros.
    findAll(): Promise<T[]>;
    
}