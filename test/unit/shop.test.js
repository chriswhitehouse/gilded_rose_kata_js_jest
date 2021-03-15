const { Shop } = require('../../src/shop.js')

const shop = new Shop([{name: 'normalItem', sellIn: 1, quality: 2}])

describe("Shop", function () {
  it("should record items", function() {
    expect(shop.items[0].name).toBe('normalItem')
  })

  describe("#updateQuality", function() {
    it("should decrease quality of normal items by 1, before SellIn", function() {
      const shop = new Shop([{name: 'normalItem', sellIn: 1, quality: 2}])
      shop.updateQuality()
      expect(shop.items[0].sellIn).toBe(0)
      expect(shop.items[0].quality).toBe(1)
    })

    it("should maintain quality of normal items at 0, after SellIn", function() {
      const shop = new Shop([{name: 'normalItem', sellIn: 1, quality: 2}])
      shop.updateQuality()
      shop.updateQuality()
      shop.updateQuality()
      expect(shop.items[0].sellIn).toBe(-2)
      expect(shop.items[0].quality).toBe(0)
    })

    it("once sellIn date passes, quality of normal Items should degrade twice as fast", function() {
      const shop = new Shop([{name: 'normalItem', sellIn: 0, quality: 5}])
      shop.updateQuality()
      expect(shop.items[0].quality).toBe(3)
    })

    it("quality should never go negative", function() {
      const shop = new Shop([{name: 'normalItem', sellIn: 1, quality: 2}])
      for (let i = 0; i < 3; i++) {
        shop.updateQuality()
      }
      expect(shop.items[0].quality).toBe(0)
    })

    it("quality should never go above 50", function() {
      const shop = new Shop([{name: 'normalItem', sellIn: 1, quality: 2}])
      for (let i = 0; i < 50; i++) {
        shop.updateQuality()
      }
      expect(shop.items[0].quality).not.toBeGreaterThan(50)
    })

    it("'Aged Brie' actually increases in Quality the older it gets", function() {
      const shop = new Shop([{name: 'Aged Brie', sellIn: 1, quality: 5}])
      shop.updateQuality()
      expect(shop.items[0].quality).toBe(6)
      shop.updateQuality()
      expect(shop.items[0].quality).toBe(8)
    })

    it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function() {
      const shop = new Shop([{name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80}])
      shop.updateQuality()
      expect(shop.items[0].quality).toBe(80)
    })

    describe("'Backstage passes', like aged brie, increases in Quality as its SellIn value approaches", function() {
      it("Quality increases by 1 when there are more than 10 days", function() {
        const shop = new Shop([{name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 11, quality: 5}])
        shop.updateQuality()
        expect(shop.items[0].quality).toBe(6)
      })

      it("Quality increases by 2 when there are 10 days or less", function() {
        const shop = new Shop([{name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 8, quality: 5}])
        shop.updateQuality()
        expect(shop.items[0].quality).toBe(7)
      })

      it("Quality increases by 3 when there are 5 days or less", function() {
        const shop = new Shop([{name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 4, quality: 5}])
        shop.updateQuality()
        expect(shop.items[0].quality).toBe(8)
      })

      it("Quality drops to 0 after the concert", function() {
        const shop = new Shop([{name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 0, quality: 5}])
        shop.updateQuality()
        expect(shop.items[0].quality).toBe(0)
      })
    })
  })
})
