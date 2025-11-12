class AddCouponIdToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_column :customers, :coupon_id, :integer
    add_index :customers, :coupon_id, unique: true
  end
end

