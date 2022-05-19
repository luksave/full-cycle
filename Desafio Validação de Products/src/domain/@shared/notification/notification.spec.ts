import Notification from "./notification";

describe("Unit test for notification", () => {

    it("should create errors", () => {
        const notification = new Notification();
        const error ={
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.messages("customer"))
            .toBe("customer: error message,");

        const error2 ={
            message: "error message 2",
            context: "customer",
        }

        notification.addError(error2);

        expect(notification.messages("customer"))
            .toBe("customer: error message,customer: error message 2,");

        const error3 ={
            message: "error message 3",
            context: "order",
        }

        notification.addError(error3);

        const error4 ={
            message: "error message 4",
            context: "product",
        }

        notification.addError(error4);
        
        expect(notification.messages("customer"))
            .toBe("customer: error message,customer: error message 2,");
        expect(notification.messages("product"))
            .toBe("product: error message 4,");
        expect(notification.messages())
            .toBe("customer: error message,customer: error message 2,order: error message 3,product: error message 4,");

    });

    it("should check if notification has at least one customer error", () =>{
        const notification = new Notification
        const error = {
            message: "error message", 
            context: "customer",
        };

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });

    it("should check if notification has at least one product error", () =>{
        const notification = new Notification
        const error = {
            message: "error message", 
            context: "product",
        };

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });


    it("should get all errors props for customer", () =>{
        const notification = new Notification
        const error = {
            message: "error message", 
            context: "customer",
        };

        notification.addError(error);

        expect(notification.getErrors()).toEqual([error]);
    });

    
    it("should get all errors props for product", () =>{
        const notification = new Notification
        const error = {
            message: "error message", 
            context: "product",
        };

        notification.addError(error);

        expect(notification.getErrors()).toEqual([error]);
    });


});