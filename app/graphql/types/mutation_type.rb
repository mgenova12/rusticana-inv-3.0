module Types
  class MutationType < Types::BaseObject
    field :edit_product, mutation: Mutations::EditProduct
    field :delete_product, mutation: Mutations::DeleteProduct
  end
end
