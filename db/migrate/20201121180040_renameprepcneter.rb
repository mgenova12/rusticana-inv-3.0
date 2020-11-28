class Renameprepcneter < ActiveRecord::Migration[6.0]
  def change
    rename_column :store_goods, :prepcenter, :is_prepcenter
  end
end
