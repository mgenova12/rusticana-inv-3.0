module Types
  class QueryType < Types::BaseObject
    field :stores, resolver: Queries::Stores
    field :products, resolver: Queries::Products
    field :prepped_products, resolver: Queries::PreppedProducts
    field :distributors, resolver: Queries::Distributors
    field :categories, resolver: Queries::Categories
    field :prepcenters, resolver: Queries::Prepcenters
    field :locations, resolver: Queries::Locations
    field :store_goods, resolver: Queries::StoreGoods
    field :store_products, resolver: Queries::StoreProducts
    field :count_bies, resolver: Queries::CountBies
    field :containers, resolver: Queries::Containers
    field :order_status, resolver: Queries::OrderStatus
    field :orders, resolver: Queries::Orders
    field :store_orders, resolver: Queries::StoreOrders
    field :combined_store_orders, resolver: Queries::CombinedStoreOrders
    field :prepcenter_order_status, resolver: Queries::PrepcenterOrderStatus
    field :prepcenter_store_goods, resolver: Queries::PrepcenterStoreGoods
    field :prepcenter_locations, resolver: Queries::PrepcenterLocations
    field :prepcenter_products, resolver: Queries::PrepcenterProducts
    field :prepcenter_inventories, resolver: Queries::PrepcenterInventories
    field :prepcenter_orders, resolver: Queries::PrepcenterOrders
    field :current_store, resolver: Queries::CurrentStore
    field :invoices, resolver: Queries::Invoices
    field :current_user, resolver: Queries::CurrentUser
    field :users, resolver: Queries::Users
    
    field :get_order, resolver: Queries::GetOrder
    field :get_store, resolver: Queries::GetStore

  end
end
