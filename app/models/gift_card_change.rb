class GiftCardChange < ApplicationRecord
  belongs_to :gift_card
  belongs_to :store
end
