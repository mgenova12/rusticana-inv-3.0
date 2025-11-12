module Types
  class CustomerType < Types::BaseObject
    field :id, ID, null: true
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :phone_number, String, null: true
    field :email, String, null: true
    field :gift_card_count, Integer, null: true
    field :coupon, Types::CouponType, null: true
    field :created_at, String, null: true

    alias customer object

    def gift_card_count
      customer.gift_cards.size
    end
  end
end