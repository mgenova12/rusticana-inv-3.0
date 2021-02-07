module Types
  class StoreType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :store_order_status, OrderType, null: true 
    field :orders, [OrderType], null: true
    field :store_goods, [StoreGoodType], null: true
  end
end