class ChangeColumnToString < ActiveRecord::Migration[6.0]
  def change
    change_column :gift_cards, :card_number, :string
  end
end
