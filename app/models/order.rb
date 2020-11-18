class Order < ApplicationRecord
  has_many :inventories
  belongs_to :store, optional: true
  belongs_to :prepcenter, optional: true
  belongs_to :store_order, optional: true
end
