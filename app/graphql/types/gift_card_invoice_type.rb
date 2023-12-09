module Types
  class GiftCardInvoiceType < Types::BaseObject
    field :id, ID, null: true
    field :store, StoreType, null: true
    field :amount_paid, Float, null: true
    field :created_at, String, null: true
  end
end