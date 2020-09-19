module Types
  class ProductType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :prepped, Boolean, null: true
    field :mark_up, Integer, null: true
    field :price, Float, null: true
    field :case_quantity, Integer, null: true
  end
end