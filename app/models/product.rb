class Product < ApplicationRecord
  belongs_to :distributor, optional: true
  belongs_to :category
  has_many :store_goods
  has_many :inventories, through: :store_goods
end
