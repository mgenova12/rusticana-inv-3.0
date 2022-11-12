class StoreGood < ApplicationRecord
  acts_as_paranoid
  
  has_many :inventories
  belongs_to :store, optional: true
  belongs_to :prepcenter, optional: true
  belongs_to :product
  belongs_to :location
  belongs_to :distributor
  belongs_to :count_by

  belongs_to :product_including_deleted, class_name: "Product",
    foreign_key: 'product_id', with_deleted: true

end
