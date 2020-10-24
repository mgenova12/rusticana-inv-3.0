class CreateStoreOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :store_orders do |t|
      t.datetime :delivery_date
      t.string :status
      t.integer :orders_complete

      t.timestamps
    end
  end
end
