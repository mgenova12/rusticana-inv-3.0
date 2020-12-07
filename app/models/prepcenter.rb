class Prepcenter < ApplicationRecord
  has_many :stores
  has_many :store_goods
  has_many :products, through: :store_goods  
  has_many :orders
end
