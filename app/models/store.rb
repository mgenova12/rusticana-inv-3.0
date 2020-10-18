class Store < ApplicationRecord
  belongs_to :prepcenter
  has_many :locations
  has_many :store_goods
  has_many :products, through: :store_goods
end
