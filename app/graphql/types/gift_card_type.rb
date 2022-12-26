module Types
  class GiftCardType < Types::BaseObject
    field :id, ID, null: true
    field :card_number, String, null: true
    field :amount, Float, null: true
  end
end