class AddValuesToGiftcard < ActiveRecord::Migration[7.0]
  def change
    add_column :gift_cards, :first_name, :string
    add_column :gift_cards, :last_name, :string
    add_column :gift_cards, :phone_number, :string
    add_column :gift_card_changes, :payment_method, :string
  end
end
