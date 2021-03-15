const { Shop } = require("../../src/shop.js");
const { Item } = require("../../src/item.js");

const items = [
      new Item('apple', 1, 3)
    ];

const shop = new Shop(items)

describe("So that I can keep track of my stock", function() {
  it("I want to maint an gildedRose of items", function() {
    expect(items[0].name).toBe('apple');
  });
});

describe("So that I know when I need to sell an item by", function() {
  it("I want each item to have a 'SellIn' property", function() {
    expect(items[0].sellIn).toBe(1);
  });
});

describe("So that I know the value of an item when I sell it", function() {
  it("I want each item to have a 'Quality' property", function() {
    expect(items[0].quality).toBe(3);
  });
});

describe("So that I can maintain a current view of quality and sellIn", function() {
  it("I want to be able to update quality of every item in the inventory at the end of each day", function() {
    shop.updateQuality()
    expect(shop.items[0].sellIn).toBe(0);
    expect(shop.items[0].quality).toBe(2);
  });
});

describe("Manages the quality of an gildedRose over time", function() {
  const gildedRoseItems = [
        new Item('apple', 1, 3),
        new Item('banana', 2, 4),
        new Item('Aged Brie', 1, 5),
        new Item('Sulfuras, Hand of Ragnaros', 1, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 11, 5)
      ];

  const gildedRose = new Shop(gildedRoseItems)

  it("Normal items quality decrease by 1 before sellIn date + 'Aged Brie' actually increases in Quality the older it gets", function() {
    gildedRose.updateQuality()
    expect(gildedRose.items[0].quality).toBe(2)
    expect(gildedRose.items[1].quality).toBe(3)
    expect(gildedRose.items[2].quality).toBe(6)
    expect(gildedRose.items[3].quality).toBe(80)
    expect(gildedRose.items[4].quality).toBe(6)
  })

  it("Once the sell by date has passed, Quality degrades twice as fast + BACKSTAGE PASS Quality increases by 2 with less than 10 sellIn days", function() {
    gildedRose.updateQuality()
    expect(gildedRose.items[0].quality).toBe(0)
    expect(gildedRose.items[4].quality).toBe(8)
  })

  it("BACKSTAGE PASS Quality increases by 3 with less than 5 sellIn days + The Quality of an item is never negative", function() {
    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality()
    }
    expect(gildedRose.items[0].quality).toBe(0)
    expect(gildedRose.items[4].quality).toBe(19)
  })

  it("BACKSTAGE PASS Quality drops to 0 after the concert", function() {
    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality()
    }
    expect(gildedRose.items[4].quality).toBe(0)
  })

  it("The Quality of an item is never more than 50", function() {
    for (let i = 0; i < 12; i++) {
      gildedRose.updateQuality()
    }
    expect(gildedRose.items[2].quality).not.toBeGreaterThan(50)
  })


})
