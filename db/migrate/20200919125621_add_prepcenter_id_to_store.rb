class AddPrepcenterIdToStore < ActiveRecord::Migration[6.0]
  def change
    add_column :stores, :prepcenter_id, :integer
  end
end
