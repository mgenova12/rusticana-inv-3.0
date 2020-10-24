class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :store_id
      t.string :delivery_day
      t.string :status
      t.integer :store_order_id
      t.integer :sale_total
      t.string :message
      t.boolean :paid

      t.timestamps
    end
  end
end
