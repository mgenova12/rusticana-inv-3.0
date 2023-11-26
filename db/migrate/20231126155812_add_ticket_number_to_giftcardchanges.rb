class AddTicketNumberToGiftcardchanges < ActiveRecord::Migration[7.0]
  def change
    add_column :gift_card_changes, :ticket_number, :string
  end
end
