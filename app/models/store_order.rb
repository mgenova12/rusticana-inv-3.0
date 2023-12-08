class StoreOrder < ApplicationRecord
  has_many :orders, -> { joins(:store).unscope(where: :active) }
end
