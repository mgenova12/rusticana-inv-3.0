class AddIsQuickOrderToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :is_quick_order, :boolean, default: false
  end
end
