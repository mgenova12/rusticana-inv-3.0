class Addproductfields < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :distributor_id, :integer
    add_column :products, :category_id, :integer
    add_column :products, :description, :text
    add_column :products, :distributor_number, :string
    add_column :products, :brand, :string
    add_column :products, :unit_size, :string
    add_column :products, :portion_size, :integer
    add_column :products, :marked_up_price, :decimal
    add_column :products, :p_id, :integer
    add_column :products, :aisle_number, :integer
    add_column :products, :days_till_expire, :integer
    add_column :products, :barcode, :bigint
  end
end
