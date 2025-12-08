module Types
  class CouponType < Types::BaseObject
    field :id, ID, null: true
    field :code, String, null: true
    field :customer, CustomerType, null: true
    field :created_at, String, null: true
    field :updated_at, String, null: true
  end
end

