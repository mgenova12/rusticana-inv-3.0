class PrepcenterToStoreGood < ActiveRecord::Migration[6.0]
  def change
    add_column :store_goods, :prepcenter, :boolean, default: false
  end
end
