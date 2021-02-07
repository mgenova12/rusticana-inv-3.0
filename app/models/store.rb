class Store < ApplicationRecord
  belongs_to :prepcenter
  has_many :inventories
  has_many :locations
  has_many :store_goods
  has_many :products, through: :store_goods
  has_many :orders
  has_many :store_orders, through: :orders

end
