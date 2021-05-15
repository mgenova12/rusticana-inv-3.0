class AddInvoicedProductPriceToInventory < ActiveRecord::Migration[6.0]
  def change
    add_column :inventories, :invoiced_product_price, :decimal
  end
end
