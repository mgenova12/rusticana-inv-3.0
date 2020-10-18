class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.integer :store_id
      t.integer :row_order

      t.timestamps
    end
  end
end
