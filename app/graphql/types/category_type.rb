module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :products, [ProductType], null:true
  end
end