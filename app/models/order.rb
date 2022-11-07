class Order < ApplicationRecord
  has_many :inventories, -> { order(created_at: :desc) }
  belongs_to :store, optional: true
  belongs_to :prepcenter, optional: true
  belongs_to :store_order, optional: true

  def is_prepcenter_inventories
    self.inventories.joins(:store_good_including_deleted).where(store_goods: { is_prepcenter: true })
  end

  def scanned_inventories
    self.inventories.where(scanned: true).joins(:store_good_including_deleted).where(store_goods: { is_prepcenter: true })
  end

  def unscanned_inventories
    self.inventories.where(scanned: [nil,false]).where.not(quantity_needed: 0).joins(:store_good_including_deleted).where(store_goods: { is_prepcenter: true })
  end

  def pending_inventories
    self.inventories.where(status: 'pending').order(:created_at)
  end

  def pending_inventories_count
    self.inventories.where(status: 'pending').size
  end  

end
