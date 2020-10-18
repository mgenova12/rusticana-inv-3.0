class Product < ApplicationRecord
  belongs_to :distributor, optional: true
  belongs_to :category
  has_many :store_goods
end
