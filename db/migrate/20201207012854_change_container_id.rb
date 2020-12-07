class ChangeContainerId < ActiveRecord::Migration[6.0]
  def change
    remove_column :store_goods, :container_id, :integer
    add_column :products, :container_id, :integer
  end
end
