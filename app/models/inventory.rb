class Inventory < ApplicationRecord
  belongs_to :store_good
  belongs_to :store
  belongs_to :location
  belongs_to :order  
end
