class ChangeChangeValueToDecimal < ActiveRecord::Migration[7.0]
  def change
    change_column :gift_card_changes, :change_value, :decimal
  end
end
