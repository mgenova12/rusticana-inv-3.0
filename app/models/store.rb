class Store < ApplicationRecord
  has_many :inventories
  belongs_to :prepcenter
  has_many :locations
  has_many :store_goods
  has_many :products, through: :store_goods
  
  has_many :orders
  has_many :store_orders, through: :orders
end
