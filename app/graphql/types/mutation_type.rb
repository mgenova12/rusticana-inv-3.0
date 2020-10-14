module Types
  class MutationType < Types::BaseObject
    field :edit_product, mutation: Mutations::EditProduct
    field :delete_product, mutation: Mutations::DeleteProduct
    field :create_prepped_product, mutation: Mutations::CreatePreppedProduct
    field :login_user, mutation: Mutations::LoginUser
  end
end
