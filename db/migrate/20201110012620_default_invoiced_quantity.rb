class DefaultInvoicedQuantity < ActiveRecord::Migration[6.0]
  def change
    change_column_default :inventories, :invoiced_quantity, 0
  end
end
