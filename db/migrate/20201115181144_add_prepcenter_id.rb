class AddPrepcenterId < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :prepcenter_id, :integer
    add_column :store_goods, :prepcenter_id, :integer
    add_column :inventories, :prepcenter_id, :integer
  end
end
