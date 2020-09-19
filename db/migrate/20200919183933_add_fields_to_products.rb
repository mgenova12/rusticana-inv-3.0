class AddFieldsToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :mark_up, :integer
    add_column :products, :price, :decimal
    add_column :products, :case_quantity, :integer
  end
end
