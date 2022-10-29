module Types
  class PrepcenterType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :locations, [LocationType], null: true
    field :order_status, OrderType, null: true
    field :quick_order_status, OrderType, null: true
    field :store_goods, [StoreGoodType], null: true
    field :orders, [OrderType], null: true
  end
end