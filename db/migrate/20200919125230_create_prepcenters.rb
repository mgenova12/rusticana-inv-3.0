class CreatePrepcenters < ActiveRecord::Migration[6.0]
  def change
    create_table :prepcenters do |t|
      t.string :name

      t.timestamps
    end
  end
end
