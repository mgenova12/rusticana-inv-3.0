class StoreOrder < ApplicationRecord
  has_many :orders, -> { joins(:store).where(stores: { active: true }) }
end
