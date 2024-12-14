module Types
  class GiftCardType < Types::BaseObject
    field :id, ID, null: true
    field :card_number, String, null: true
    field :amount, Float, null: true
    field :store, StoreType, null: true
    field :money_owed, Float, null: true
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :phone_number, String, null: true
    field :email, String, null: true
    field :created_at, String, null: true
  end
end