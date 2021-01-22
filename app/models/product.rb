class Product < ApplicationRecord
  acts_as_paranoid
  
  belongs_to :distributor, optional: true
  belongs_to :category
  belongs_to :container, optional: true
  has_many :store_goods
  has_many :inventories, through: :store_goods

  def product_inventories(store_order_id: nil)
    order_ids = StoreOrder.find(store_order_id).orders.ids
    self.inventories.where(order_id: order_ids) 

    # access to height with self[:height]. 
    # You must use self[:height] so as to access the height property
    # and not call the method you defined.  Note: This overrides the
    # getter for height.
  end

end
