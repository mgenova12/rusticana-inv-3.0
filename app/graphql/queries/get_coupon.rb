module Queries
  class GetCoupon < Queries::BaseQuery
    argument :code, String, required: true

    description 'Find a coupon by code'

    type Types::CouponType, null: true

    def resolve(code:)
      Coupon.find_by(code: code)
    end

  end
end

