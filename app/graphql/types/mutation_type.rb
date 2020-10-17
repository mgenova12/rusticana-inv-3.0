module Types
  class MutationType < Types::BaseObject
    field :edit_product, mutation: Mutations::EditProduct
    field :delete_product, mutation: Mutations::DeleteProduct
    field :create_prepped_product, mutation: Mutations::CreatePreppedProduct
    field :login_user, mutation: Mutations::LoginUser
    field :create_distributor, mutation: Mutations::CreateDistributor
    field :create_product, mutation: Mutations::CreateProduct
  end
end
