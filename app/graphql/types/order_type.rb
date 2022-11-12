module Types
  class OrderType < Types::BaseObject
    field :id, ID, null: true
    field :store_id, ID, null: true
    field :created_at, String, null: true
    field :store, StoreType, null: true
    field :prepcenter, PrepcenterType, null: true
    field :delivery_day, String, null: true
    field :status, String, null: true
    field :sale_total, Float, null: true
    field :inventories, [InventoryType], null: true
    field :paid, Boolean, null: true
    field :store_order, StoreOrderType, null: true
    field :is_prepcenter_inventories, [InventoryType], null: true
    field :scanned_inventories, [InventoryType], null: true
    field :unscanned_inventories, [InventoryType], null: true
    field :pending_inventories, [InventoryType], null: true
    field :pending_inventories_count, Integer, null: true
    field :is_quick_order, Boolean, null: true
  end
end
