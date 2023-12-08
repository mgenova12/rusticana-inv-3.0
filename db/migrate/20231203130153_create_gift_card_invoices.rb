class CreateGiftCardInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :gift_card_invoices do |t|

      t.timestamps
    end
    add_column :gift_card_invoices, :amount_paid, :decimal
  end
end
