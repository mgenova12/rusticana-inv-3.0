class Distributor < ApplicationRecord
  has_many :products
  has_many :store_goods
end
