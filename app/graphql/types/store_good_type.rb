module Types
  class StoreGoodType < Types::BaseObject
    field :id, ID, null: true
    field :prepcenter_id, ID, null: true
    field :store, StoreType, null: true
    field :product, ProductType, null: true
    field :product_including_deleted, ProductType, null: true
    field :location, LocationType, null: true
    field :distributor, DistributorType, null: true
    field :count_by, CountByType, null: true
    field :max_amount, Integer, null: true
    field :replenish_by, String, null: true
    field :delivery_day, String, null: true
    field :amount_in_stock, Integer, null: true
    field :prepcenter, PrepcenterType, null: true
    field :is_prepcenter, Boolean, null: true
  end
end