class Order < ApplicationRecord
  has_many :inventories
  belongs_to :store
  belongs_to :store_order, optional: true
end
