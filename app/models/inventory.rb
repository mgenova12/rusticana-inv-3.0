class Inventory < ApplicationRecord
  belongs_to :store_good
  belongs_to :store, optional: true
  belongs_to :prepcenter, optional: true
  belongs_to :location
  belongs_to :order  

  has_one :product, :through => :store_good
end
