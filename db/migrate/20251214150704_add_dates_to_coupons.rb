class AddDatesToCoupons < ActiveRecord::Migration[7.0]
  def change
    add_column :coupons, :activated_on, :datetime
    add_column :coupons, :redeemed_on, :datetime
  end
end
