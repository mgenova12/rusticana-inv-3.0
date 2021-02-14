class Prepcenter < ApplicationRecord
  has_many :stores
  has_many :store_goods, -> { order(created_at: :asc) }
  has_many :products, through: :store_goods
  has_many :orders, -> { order(created_at: :desc) }
  has_many :locations

  def order_status
    self.orders.find_by(status: 'incomplete')
  end

end
