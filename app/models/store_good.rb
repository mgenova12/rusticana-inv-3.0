class StoreGood < ApplicationRecord
  has_many :inventories
  belongs_to :store, optional: true
  belongs_to :prepcenter, optional: true
  belongs_to :product
  belongs_to :location
  belongs_to :distributor
  belongs_to :count_by
  belongs_to :container, optional: true
end
