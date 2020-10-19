class Location < ApplicationRecord
  belongs_to :store
  has_many :store_goods
end
