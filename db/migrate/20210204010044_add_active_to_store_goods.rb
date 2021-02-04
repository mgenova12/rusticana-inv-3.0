class AddActiveToStoreGoods < ActiveRecord::Migration[6.0]
  def change
    add_column :store_goods, :active, :boolean, default: true
  end
end
