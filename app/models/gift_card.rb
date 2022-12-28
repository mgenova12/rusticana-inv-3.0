class GiftCard < ApplicationRecord
  has_many :gift_card_changes
  validates_uniqueness_of :card_number
end
