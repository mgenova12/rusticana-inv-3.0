class AddRowOrderToDistributor < ActiveRecord::Migration[6.0]
  def change
    add_column :distributors, :row_order, :integer
  end
end
