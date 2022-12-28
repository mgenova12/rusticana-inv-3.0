class AddGiftCardChangeValues < ActiveRecord::Migration[6.0]
  def change
    add_column :gift_card_changes, :change_value, :integer
    add_column :gift_card_changes, :change_event, :string
    add_column :gift_card_changes, :store_id, :integer
    add_column :gift_card_changes, :gift_card_id, :integer
  end
end
