class Store < ApplicationRecord
  belongs_to :prepcenter
  has_many :inventories
  has_many :locations
  has_many :store_goods, -> { order(created_at: :asc) }
  has_many :products, through: :store_goods
  has_many :orders, -> { order(created_at: :desc) }
  has_many :store_orders, through: :orders

  def store_order_status
    self.orders.find_by(status: 'incomplete')
  end

end
