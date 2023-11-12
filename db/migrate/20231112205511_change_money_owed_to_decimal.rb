class ChangeMoneyOwedToDecimal < ActiveRecord::Migration[7.0]
  def change
    change_column :gift_cards, :money_owed, :decimal
  end
end
