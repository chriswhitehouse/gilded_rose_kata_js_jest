const { Shop } = require('../../src/shop.js')

describe("Shop", function () {
  it("should record items", function() {
    const shop = new Shop([{name: 'normalItem', sellIn: 1, quality: 2}])
    expect(shop.items[0].name).toBe('normalItem')
  })

  describe("#updateQuality", function() {
    it("should update the qiality of all items", function() {
      const mockUpdateQuality = jest.fn()
      const shop = new Shop([{name: 'mockItem', updateQuality: mockUpdateQuality}, {name: 'mockItemToo', updateQuality: mockUpdateQuality}])
      shop.updateQuality()
      expect(mockUpdateQuality.mock.calls.length).toBe(2)
    })
  })
})
