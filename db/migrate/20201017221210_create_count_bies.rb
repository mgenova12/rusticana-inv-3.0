class CreateCountBies < ActiveRecord::Migration[6.0]
  def change
    create_table :count_bies do |t|
      t.string :name

      t.timestamps
    end
  end
end
