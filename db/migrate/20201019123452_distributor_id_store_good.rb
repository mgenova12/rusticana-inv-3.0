class DistributorIdStoreGood < ActiveRecord::Migration[6.0]
  def change
    add_column :store_goods, :distributor_id, :integer
  end
end
