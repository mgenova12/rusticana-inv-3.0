class Prepcenter < ApplicationRecord
  has_many :stores
  has_many :store_goods, -> { order(created_at: :asc) }
  has_many :products, through: :store_goods
  has_many :orders, -> { order(created_at: :desc) }
  has_many :locations

  def order_status
    self.orders.find_by(status: 'incomplete', is_quick_order: false)
  end

  def quick_order_status
    Order.find_by(status: 'incomplete', is_quick_order: true)
  end

end
