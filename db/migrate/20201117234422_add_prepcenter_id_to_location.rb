class AddPrepcenterIdToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :prepcenter_id, :integer
  end
end
