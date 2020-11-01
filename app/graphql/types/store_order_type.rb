module Types
  class StoreOrderType < Types::BaseObject
    field :id, ID, null: true
    field :delivery_date, String, null: true
    field :orders_complete, Integer, null: true
    field :status, String, null: true
    field :orders, [OrderType], null: true
    field :updated_at, String, null: true
  end
end