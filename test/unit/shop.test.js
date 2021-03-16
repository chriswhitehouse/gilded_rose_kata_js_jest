const { Shop } = require('../../src/shop.js')
const { Item } = require('../../src/item.js')


describe("Shop", function () {
  it("should record items", function() {
    const shop = new Shop([new Item('normalItem', 1, 2)])
    expect(shop.items[0].name).toBe('normalItem')
  })

  describe("#updateQuality", function() {
    it("should update the qiality of all items", function() {
      const shop = new Shop([new Item('normalItem', 1, 2), new Item('normalItemToo', 2, 5)])
      shop.updateQuality()
      expect(shop.items[0].sellIn).toBe(0)
      expect(shop.items[0].quality).toBe(1)
      expect(shop.items[1].sellIn).toBe(1)
      expect(shop.items[1].quality).toBe(4)
    })
  })
})
