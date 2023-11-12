class GiftCard < ApplicationRecord
  has_many :gift_card_changes
  belongs_to :store
  validates_uniqueness_of :card_number
end
