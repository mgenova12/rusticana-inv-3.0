module Types
  class GiftCardChangeType < Types::BaseObject
    field :id, ID, null: true
    field :store, StoreType, null: true
    field :gift_card, GiftCardType, null: true
    field :change_value, Float, null: true
    field :change_event, String, null: true
    field :payment_method, String, null: true
    field :created_at, String, null: true
    field :ticket_number, String, null: true
  end
end