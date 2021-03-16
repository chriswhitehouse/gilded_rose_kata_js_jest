class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    switch (this.name) {
      case 'Aged Brie':
        this.updateAgedBrie();
        break;
      case 'Sulfuras, Hand of Ragnaros':
        this.updateSulfuras();
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateBackstagePass();
        break;
      default:
        this.updateOther();
    }
  }

  updateAgedBrie() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }

    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {
      if (this.quality < 50) {
        this.quality = this.quality + 1;
      }
    }
  }

  updateSulfuras() {

  }

  updateBackstagePass() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
    if (this.sellIn < 11) {
      this.quality = this.quality + 1;
    }
    if (this.sellIn < 6) {
      this.quality = this.quality + 1;
    }

    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {
      this.quality = this.quality - this.quality;
    }
  }

  updateOther() {
    if (this.quality > 0) {
      this.quality = this.quality - 1;
    }

    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {
      if (this.quality > 0) {
          this.quality = this.quality - 1;
      }
    }
  }
}

module.exports = {
  Item
}
