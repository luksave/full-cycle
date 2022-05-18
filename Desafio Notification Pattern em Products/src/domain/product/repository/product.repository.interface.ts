import RepositoryInterface from "../../@shared/repository/repository.interface";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";

export default interface ProductRepositoryInterface //Aqui o <T> da interface genérico é substituído pelo tipo que será retornado nessa interface
    extends RepositoryInterface<Product> {}