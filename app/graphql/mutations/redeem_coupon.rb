class Mutations::RedeemCoupon < Mutations::BaseMutation
  argument :coupon_id, ID, required: true

  field :coupon, Types::CouponType, null: true
  field :errors, [String], null: false

  def resolve(coupon_id:)
    coupon = Coupon.find_by(id: coupon_id)
    
    if coupon.nil?
      return {
        coupon: nil,
        errors: ["Coupon not found"]
      }
    end

    if coupon.redeemed_on.present?
      return {
        coupon: coupon,
        errors: ["Coupon has already been redeemed"]
      }
    end

    if coupon.activated_on.blank?
      return {
        coupon: coupon,
        errors: ["Coupon must be activated before it can be redeemed"]
      }
    end

    if coupon.update(redeemed_on: DateTime.now)
      {
        coupon: coupon,
        errors: []
      }
    else
      {
        coupon: nil,
        errors: coupon.errors.full_messages
      }
    end
  end
end

