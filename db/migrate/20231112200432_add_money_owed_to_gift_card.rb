class AddMoneyOwedToGiftCard < ActiveRecord::Migration[7.0]
  def change
    add_column :gift_cards, :money_owed, :integer
  end
end
