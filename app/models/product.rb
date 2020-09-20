class Product < ApplicationRecord
  belongs_to :distributor, optional: true
  belongs_to :category
end
