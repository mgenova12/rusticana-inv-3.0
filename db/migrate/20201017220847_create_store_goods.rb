class CreateStoreGoods < ActiveRecord::Migration[6.0]
  def change
    create_table :store_goods do |t|
      t.integer :store_id
      t.integer :product_id
      t.integer :location_id
      t.integer :count_by_id
      t.integer :max_amount
      t.string :replenish_by
      t.string :delivery_day
      t.integer :amount_in_stock
      t.integer :container_type_id

      t.timestamps
    end
  end
end
