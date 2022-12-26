class ChangeColumnToBigInt < ActiveRecord::Migration[6.0]
  def change
    change_column :gift_cards, :card_number, :bigint
    add_column :gift_cards, :notes, :string
  end
end
