module Types
  class StoreType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :order_status, OrderType, null: true 
    field :orders, [OrderType], null: true
    field :store_goods, [StoreGoodType], null: true
    field :locations, [LocationType], null: true
    field :is_prepcenter_store_goods, [StoreGoodType], null: true
    field :gift_card_money_owed, Float, null: true
  end
end