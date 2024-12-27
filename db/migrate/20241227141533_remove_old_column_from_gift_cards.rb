class RemoveOldColumnFromGiftCards < ActiveRecord::Migration[7.0]
  def change
    remove_column :gift_cards, :first_name, :string
    remove_column :gift_cards, :last_name, :string
    remove_column :gift_cards, :phone_number, :string
    remove_column :gift_cards, :email, :string
  end
end
