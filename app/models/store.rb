class Store < ApplicationRecord
  default_scope { where active: true }
  belongs_to :prepcenter
  has_many :inventories
  has_many :locations
  has_many :store_goods, -> { order(created_at: :asc) }
  has_many :products, through: :store_goods
  has_many :orders, -> { order(created_at: :desc) }
  has_many :store_orders, through: :orders
  has_many :gift_cards
  has_many :gift_card_invoices

  def order_status
    current_store_order = StoreOrder.order(:delivery_date).last

    if current_store_order.orders.pluck(:store_id).include?(self.id) && current_store_order.orders_complete != 2
      orders.where(is_quick_order: false).order(created_at: :desc).first
    else
      self.orders.find_by(status: 'incomplete', is_quick_order: false)
    end
  end

  def is_prepcenter_store_goods
    self.store_goods.with_deleted.where(is_prepcenter: true)
  end

  def gift_card_money_owed
    gift_cards.sum(:money_owed)
  end
end
