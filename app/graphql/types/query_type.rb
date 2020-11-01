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
    field :inventories, resolver: Queries::Inventories
    field :orders, resolver: Queries::Orders
    field :order_inventories, resolver: Queries::OrderInventories
    field :store_orders, resolver: Queries::StoreOrders
  end
end
