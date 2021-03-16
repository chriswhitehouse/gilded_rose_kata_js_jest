const { Item } = require('../../src/item.js')

const item = new Item('testItem', 1, 2)

describe("Item", function () {
  it("should record item name", function() {
    expect(item.name).toBe('testItem')
  })

  it("should record item sellIn days", function() {
    expect(item.sellIn).toBe(1)
  })

  it("should record item quality", function() {
    expect(item.quality).toBe(2)
  })

  it("should updateQuality", function() {
    item.updateQuality()
    expect(item.quality).toBe(1)
  })

  describe("#updateQuality", function() {
    it("should decrease quality of normal items by 1, before SellIn", function() {
      const item = new Item('normalItem', 1, 2)
      item.updateQuality()
      expect(item.sellIn).toBe(0)
      expect(item.quality).toBe(1)
    })

    it("should maintain quality of normal items at 0, after SellIn", function() {
      const item = new Item('normalItem', 1, 2)
      item.updateQuality()
      item.updateQuality()
      item.updateQuality()
      expect(item.sellIn).toBe(-2)
      expect(item.quality).toBe(0)
    })

    it("once sellIn date passes, quality of normal Items should degrade twice as fast", function() {
      const item = new Item('normalItem', 0, 5)
      item.updateQuality()
      expect(item.quality).toBe(3)
    })

    it("quality should never go negative", function() {
      const item = new Item('normalItem', 1, 2)
      for (let i = 0; i < 3; i++) {
        item.updateQuality()
      }
      expect(item.quality).toBe(0)
    })

    it("quality should never go above 50", function() {
      const item = new Item('normalItem', 1, 2)
      for (let i = 0; i < 50; i++) {
        item.updateQuality()
      }
      expect(item.quality).not.toBeGreaterThan(50)
    })

    it("'Aged Brie' actually increases in Quality the older it gets", function() {
      const item = new Item('Aged Brie', 1, 5)
      item.updateQuality()
      expect(item.quality).toBe(6)
      item.updateQuality()
      expect(item.quality).toBe(8)
    })

    it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function() {
      const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80)
      item.updateQuality()
      expect(item.quality).toBe(80)
    })

    describe("'Backstage passes', like aged brie, increases in Quality as its SellIn value approaches", function() {
      it("Quality increases by 1 when there are more than 10 days", function() {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 5)
        item.updateQuality()
        expect(item.quality).toBe(6)
      })

      it("Quality increases by 2 when there are 10 days or less", function() {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 8, 5)
        item.updateQuality()
        expect(item.quality).toBe(7)
      })

      it("Quality increases by 3 when there are 5 days or less", function() {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 5)
        item.updateQuality()
        expect(item.quality).toBe(8)
      })

      it("Quality drops to 0 after the concert", function() {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5)
        item.updateQuality()
        expect(item.quality).toBe(0)
      })
    })
  })
})
