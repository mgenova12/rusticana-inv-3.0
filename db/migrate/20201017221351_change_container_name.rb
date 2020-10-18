class ChangeContainerName < ActiveRecord::Migration[6.0]
  def change
    rename_column :store_goods, :container_type_id, :container_id
  end
end
