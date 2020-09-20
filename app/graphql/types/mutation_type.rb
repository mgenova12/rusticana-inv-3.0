module Types
  class MutationType < Types::BaseObject
    field :edit_product, mutation: Mutations::EditProduct
  end
end
