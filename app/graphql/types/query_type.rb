module Types
  class QueryType < Types::BaseObject
    field :stores, resolver: Queries::Stores
    field :products, resolver: Queries::Products
    field :prepped_products, resolver: Queries::PreppedProducts
    field :distributors, resolver: Queries::Distributors
    field :categories, resolver: Queries::Categories
    field :prepcenters, resolver: Queries::Prepcenters
    field :store_products, resolver: Queries::StoreProducts
    field :count_bies, resolver: Queries::CountBies
    field :containers, resolver: Queries::Containers
    field :store_orders, resolver: Queries::StoreOrders
    field :combined_store_orders, resolver: Queries::CombinedStoreOrders
    field :prepcenter_products, resolver: Queries::PrepcenterProducts
    field :invoices, resolver: Queries::Invoices
    field :current_user, resolver: Queries::CurrentUser
    field :users, resolver: Queries::Users
    
    field :get_order, resolver: Queries::GetOrder
    field :get_store, resolver: Queries::GetStore
    field :get_prepcenter, resolver: Queries::GetPrepcenter

  end
end
