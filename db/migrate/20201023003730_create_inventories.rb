class CreateInventories < ActiveRecord::Migration[6.0]
  def change
    create_table :inventories do |t|
      t.integer :store_good_id
      t.integer :store_id
      t.integer :location_id
      t.integer :order_id
      t.string :status
      t.integer :quantity
      t.integer :quantity_needed
      t.integer :invoiced_quantity
      t.boolean :scanned
      t.string :reason_code

      t.timestamps
    end
  end
end
