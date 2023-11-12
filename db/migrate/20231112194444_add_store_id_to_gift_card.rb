class AddStoreIdToGiftCard < ActiveRecord::Migration[7.0]
  def change
    add_column :gift_cards, :store_id, :integer
  end
end
