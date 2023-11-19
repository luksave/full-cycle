import PaymentFacadeInterface from "../facade/facade.inteface";
import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(repository);

        return new PaymentFacade({
            processPaymentUseCase: processPaymentUseCase,
        });
    }
}
