class AddEmailToGiftCard < ActiveRecord::Migration[7.0]
  def change
    add_column :gift_cards, :email, :string
  end
end
