class AddDeletedAtToStoreGood < ActiveRecord::Migration[6.0]
  def change
    add_column :store_goods, :deleted_at, :datetime
    add_index :store_goods, :deleted_at
  end
end
