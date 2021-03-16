class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    if (this.name != 'Aged Brie' && this.name != 'Backstage passes to a TAFKAL80ETC concert' && this.name != 'Sulfuras, Hand of Ragnaros') {
      if (this.quality > 0) {
        this.quality = this.quality - 1;
      }
    } else {
      if (this.quality < 50) {
        this.quality = this.quality + 1;
        if (this.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.sellIn < 11) {
            this.quality = this.quality + 1;
          }
          if (this.sellIn < 6) {
            this.quality = this.quality + 1;
          }
        }
      }
    }
    if (this.name != 'Sulfuras, Hand of Ragnaros') {
      this.sellIn = this.sellIn - 1;
    }
    if (this.sellIn < 0) {
      if (this.name != 'Aged Brie') {
        if (this.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.quality > 0) {
            if (this.name != 'Sulfuras, Hand of Ragnaros') {
              this.quality = this.quality - 1;
            }
          }
        } else {
          this.quality = this.quality - this.quality;
        }
      } else {
        if (this.quality < 50) {
          this.quality = this.quality + 1;
        }
      }
    }

  }

}

module.exports = {
  Item
}
