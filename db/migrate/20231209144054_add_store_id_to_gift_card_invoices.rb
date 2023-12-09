class AddStoreIdToGiftCardInvoices < ActiveRecord::Migration[7.0]
  def change
    add_column :gift_card_invoices, :store_id, :integer
  end
end
