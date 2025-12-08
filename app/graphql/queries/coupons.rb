module Queries
  class Coupons < Queries::BaseQuery
    
    description 'Find all Coupons'

    type [Types::CouponType], null: false

    def resolve
      Coupon.order('created_at DESC')
    end

  end
end

