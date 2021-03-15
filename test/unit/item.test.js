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
})
