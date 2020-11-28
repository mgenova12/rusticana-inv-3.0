class Location < ApplicationRecord
  belongs_to :store, optional: true
  has_many :store_goods
  has_many :inventories
end
