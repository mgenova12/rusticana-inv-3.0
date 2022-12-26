class AddFeildsToGiftcard < ActiveRecord::Migration[6.0]
  def change
    add_column :gift_cards, :active, :boolean, default: true
    add_column :gift_cards, :amount, :decimal, default: true
    add_column :gift_cards, :card_number, :integer, default: true
  end
end
