module Types
  class MutationType < Types::BaseObject
    field :edit_product, mutation: Mutations::EditProduct
    field :delete_product, mutation: Mutations::DeleteProduct
    field :create_prepped_product, mutation: Mutations::CreatePreppedProduct
    field :login_user, mutation: Mutations::LoginUser
    field :create_distributor, mutation: Mutations::CreateDistributor
    field :create_product, mutation: Mutations::CreateProduct
    field :create_location, mutation: Mutations::CreateLocation
    field :delete_distributor, mutation: Mutations::DeleteDistributor
    field :delete_location, mutation: Mutations::DeleteLocation
    field :delete_store_good, mutation: Mutations::DeleteStoreGood
    field :create_store_good, mutation: Mutations::CreateStoreGood
    field :edit_store_good, mutation: Mutations::EditStoreGood
    field :create_inventory, mutation: Mutations::CreateInventory
    field :delete_inventory, mutation: Mutations::DeleteInventory
    field :edit_inventory_quantity, mutation: Mutations::EditInventoryQuantity
    field :edit_inventory_quantity_needed, mutation: Mutations::EditInventoryQuantityNeeded
    field :scan_inventory, mutation: Mutations::ScanInventory
    field :create_prepcenter_inventory, mutation: Mutations::CreatePrepcenterInventory
    field :create_prepcenter_location, mutation: Mutations::CreatePrepcenterLocation
    field :create_prepcenter_store_good, mutation: Mutations::CreatePrepcenterStoreGood
  end
end
