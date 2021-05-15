module Types
  class InventoryType < Types::BaseObject
    field :id, ID, null: true
    field :store_id, Integer, null: true
    field :quantity, Integer, null: true
    field :quantity_needed, Integer, null: true
    field :product, ProductType, null: true
    field :scanned, Boolean, null: true
    field :store_good, StoreGoodType, null: true
    field :store_good_including_deleted, StoreGoodType, null: true
    field :store, StoreType, null: true
    field :reason_code, String, null: true
    field :status, String, null: true
    field :invoiced_quantity, Integer, null: true
    field :invoiced_price, Float, null: true
    field :invoiced_product_price, Float, null: true
  end
end
