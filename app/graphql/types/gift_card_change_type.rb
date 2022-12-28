module Types
  class GiftCardChangeType < Types::BaseObject
    field :id, ID, null: true
    field :store, StoreType, null: true
    field :gift_card, GiftCardType, null: true
    field :change_value, Integer, null: true
    field :change_event, String, null: true
  end
end