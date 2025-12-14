module Queries
  class Coupons < Queries::BaseQuery
    
    description 'Find all Coupons'

    type [Types::CouponType], null: false

    def resolve
      Coupon.left_joins(:customer)
        .select('coupons.*')
        .select(Arel.sql("CASE 
          WHEN redeemed_on IS NOT NULL THEN 1
          WHEN activated_on IS NOT NULL AND redeemed_on IS NULL THEN 2
          WHEN customers.id IS NOT NULL THEN 3
          ELSE 4
        END AS sort_priority"))
        .distinct
        .order('sort_priority', 'created_at DESC')
    end

  end
end

