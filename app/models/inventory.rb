class Inventory < ApplicationRecord
  belongs_to :store_good
  belongs_to :store, optional: true
  belongs_to :prepcenter, optional: true
  belongs_to :location
  belongs_to :order  
  has_one :product, :through => :store_good

  belongs_to :store_good_including_deleted, class_name: "StoreGood",
    foreign_key: 'store_good_id', with_deleted: true


end
