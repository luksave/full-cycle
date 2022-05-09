import Address from "../value-object/address";
import Customer from "./customer";

//Esse é um arquivo de teste, há quem prefira deixá-lo mais próximo do fonte e há quem prefira criar uma pasta teste para os mesmos
describe("Customer unit tests", () =>{

    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("", "Lucas");
        }).toThrowError("customer: Id is required");

    });

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required");

    });

    it("should throw error when name and id are empty", () => {

        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required,customer: Name is required");

    });


    //Triple A
    it("should change name", () => {
        //Arrange
        const customer = new Customer("123", "lucas");

        //Act
        customer.changeName("Lucas");

        //Assert
        expect(customer.name).toBe("Lucas"); //Esse .name fica disponível por conta de get name(): string 

    });


    //Triple A
    it("should activate customer", () => {
        //Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "1321421-980", "São Paulo");
        customer.Address = address;

        //Act
        customer.activate();

        //Assert
        expect(customer.isActive()).toBe(true); //Esse .name fica disponível por conta de get name(): string 

    });

    //Triple A
    it("should deactivate customer", () => {
        //Arrange
        const customer = new Customer("1", "Customer 1");

        //Act
        customer.deactivate();

        //Assert
        expect(customer.isActive()).toBe(false); //Esse .name fica disponível por conta de get name(): string 

    });

    //Triple A
    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() =>{
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory ti activate a customer");
        
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1")
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});