
```
projeto-exemplo
├─ .gitignore
├─ jest.config.ts
├─ package-lock.json
├─ package.json
├─ src
│  ├─ infrastructure
│  ├─ modules
│  │  ├─ @shared
│  │  │  ├─ domain
│  │  │  │  ├─ entity
│  │  │  │  │  ├─ aggregate-root.interface.ts
│  │  │  │  │  └─ base.entity.ts
│  │  │  │  └─ value-object
│  │  │  │     ├─ address.value-objects.ts
│  │  │  │     ├─ id.value-object.ts
│  │  │  │     └─ value-object.interface.ts
│  │  │  └─ usecase
│  │  │     └─ use-case.interface.ts
│  │  ├─ checkout
│  │  │  ├─ domain
│  │  │  │  ├─ client.entity.ts
│  │  │  │  ├─ order.entity.ts
│  │  │  │  └─ product.entity.ts
│  │  │  ├─ facade
│  │  │  ├─ factory
│  │  │  ├─ gateway
│  │  │  │  └─ checkout.gateway.ts
│  │  │  ├─ repository
│  │  │  └─ usecase
│  │  │     └─ place-order
│  │  │        ├─ place-order.dto.ts
│  │  │        ├─ place-order.usecase.spec.ts
│  │  │        └─ place-order.usecase.ts
│  │  ├─ cliente-adm
│  │  │  ├─ domain
│  │  │  │  └─ client.entity.ts
│  │  │  ├─ facade
│  │  │  │  ├─ client-adm.facade.interface.ts
│  │  │  │  ├─ client-adm.facade.spec.ts
│  │  │  │  └─ client-adm.facade.ts
│  │  │  ├─ factory
│  │  │  │  └─ client-adm.facade.factory.ts
│  │  │  ├─ gateway
│  │  │  │  └─ client.gateway.ts
│  │  │  ├─ repository
│  │  │  │  ├─ client.model.ts
│  │  │  │  ├─ client.repository.spec.ts
│  │  │  │  └─ client.repository.ts
│  │  │  └─ usecase
│  │  │     ├─ add-client
│  │  │     │  ├─ add-client.dto.ts
│  │  │     │  ├─ add-client.usecase.spec.ts
│  │  │     │  └─ add-client.usecase.ts
│  │  │     └─ find-client
│  │  │        ├─ find-client.dto.ts
│  │  │        ├─ find-client.usecase.spec.ts
│  │  │        └─ find-client.usecase.ts
│  │  ├─ invoice
│  │  │  ├─ domain
│  │  │  │  ├─ invoice-items.entity.ts
│  │  │  │  └─ invoice.entity.ts
│  │  │  ├─ facade
│  │  │  │  ├─ invoice.facade.interface.ts
│  │  │  │  ├─ invoice.facade.spec.ts
│  │  │  │  └─ invoice.facade.ts
│  │  │  ├─ factory
│  │  │  │  └─ invoice.facade.factory.ts
│  │  │  ├─ gateway
│  │  │  │  ├─ invoice-item.gateway.ts
│  │  │  │  └─ invoice.gateway.ts
│  │  │  ├─ repository
│  │  │  │  ├─ invoice.model.ts
│  │  │  │  ├─ invoice.repository.spec.ts
│  │  │  │  └─ invoice.repository.ts
│  │  │  └─ usecase
│  │  │     ├─ find-invoice
│  │  │     │  ├─ find.dto.ts
│  │  │     │  ├─ find.usecase.spec.ts
│  │  │     │  └─ find.usecase.ts
│  │  │     └─ generate-invoice
│  │  │        ├─ generate.dto.ts
│  │  │        ├─ generate.usecase.spec.ts
│  │  │        └─ generate.usecase.ts
│  │  ├─ payment
│  │  │  ├─ domain
│  │  │  │  └─ transaction.ts
│  │  │  ├─ facade
│  │  │  │  ├─ facade.inteface.ts
│  │  │  │  ├─ payment.facade.spec.ts
│  │  │  │  └─ payment.facade.ts
│  │  │  ├─ factory
│  │  │  │  └─ payment.facade.factory.ts
│  │  │  ├─ gateway
│  │  │  │  └─ payment.gateway.ts
│  │  │  ├─ repository
│  │  │  │  ├─ transaction.model.ts
│  │  │  │  ├─ transaction.repository.spec.ts
│  │  │  │  └─ transaction.repository.ts
│  │  │  └─ usecase
│  │  │     └─ process-payment
│  │  │        ├─ process-payment.dto.ts
│  │  │        ├─ process-payment.usecase.spec.ts
│  │  │        └─ process-payment.usecase.ts
│  │  ├─ product-adm
│  │  │  ├─ domain
│  │  │  │  └─ product.entity.ts
│  │  │  ├─ facade
│  │  │  │  ├─ product-adm.facade.interface.ts
│  │  │  │  ├─ product-adm.facade.spec.ts
│  │  │  │  └─ product-adm.facade.ts
│  │  │  ├─ factory
│  │  │  │  └─ product-adm.facade.factory.ts
│  │  │  ├─ gateway
│  │  │  │  └─ product.gateway.ts
│  │  │  ├─ repository
│  │  │  │  ├─ product.model.ts
│  │  │  │  ├─ product.repository.spec.ts
│  │  │  │  └─ product.repository.ts
│  │  │  └─ usecase
│  │  │     ├─ add-product
│  │  │     │  ├─ add-product.dto.ts
│  │  │     │  ├─ add-product.usecase.spec.ts
│  │  │     │  └─ add-product.usecase.ts
│  │  │     └─ check-stock
│  │  │        ├─ check-stock.dto.ts
│  │  │        ├─ check-stock.usecase.spec.ts
│  │  │        └─ check-stock.usecase.ts
│  │  └─ store-catalog
│  │     ├─ domain
│  │     │  └─ product.entity.ts
│  │     ├─ facade
│  │     │  ├─ store-catalog.facade.interface.ts
│  │     │  ├─ store-catalog.facade.spec.ts
│  │     │  └─ store-catalog.facade.ts
│  │     ├─ factory
│  │     │  └─ store-catalog.facade.factory.ts
│  │     ├─ gateway
│  │     │  └─ product.gateway.ts
│  │     ├─ repository
│  │     │  ├─ product.model.ts
│  │     │  ├─ product.repository.spec.ts
│  │     │  └─ product.repository.ts
│  │     └─ usecase
│  │        ├─ find-all-products
│  │        │  ├─ find-all-products.dto.ts
│  │        │  ├─ find-all-products.usecase.spec.ts
│  │        │  └─ find-all-products.usecase.ts
│  │        └─ find-product
│  │           ├─ find-product.dto.ts
│  │           ├─ find-product.usecase.spec.ts
│  │           └─ find-product.usecase.ts
│  └─ test-migrations
│     ├─ config-migrations
│     │  ├─ migrator-cli.ts
│     │  └─ migrator.ts
│     └─ migrations
│        ├─ product-migrations.spec.ts
│        └─ routeProduct.ts
├─ tsconfig.json
└─ tslint.json

```