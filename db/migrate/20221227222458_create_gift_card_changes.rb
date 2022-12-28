class CreateGiftCardChanges < ActiveRecord::Migration[6.0]
  def change
    create_table :gift_card_changes do |t|

      t.timestamps
    end
  end
end
