module Types
  class ProductType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :distributor, DistributorType, null: true
    field :category, CategoryType, null: true
    field :case_quantity, Integer, null: true
    field :price, Float, null: true
    field :mark_up, Integer, null: true
    field :prepped, Boolean, null: true
    field :barcode, ID, null: true
    field :description, String, null: true
    field :distributor_number, String, null: true
    field :brand, String, null: true
    field :unit_size, String, null: true
    field :portion_size, Integer, null: true
    field :marked_up_price, Float, null: true
    field :aisle_number, Integer, null: true
    field :days_till_expire, Integer, null: true
    field :p_id, Integer, null: true
    field :inventories, [InventoryType], null: true
  end
end