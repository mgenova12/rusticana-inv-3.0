class AddInvoicedPriceToInventory < ActiveRecord::Migration[6.0]
  def change
    add_column :inventories, :invoiced_price, :decimal
  end
end
