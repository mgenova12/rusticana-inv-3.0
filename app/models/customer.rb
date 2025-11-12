class Customer < ApplicationRecord
  has_many :gift_cards
  belongs_to :coupon, optional: true
end
