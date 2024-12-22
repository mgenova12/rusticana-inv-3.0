class GiftCard < ApplicationRecord
  has_many :gift_card_changes
  belongs_to :store
  belongs_to :customer
  validates_uniqueness_of :card_number
end
