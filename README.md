# gilded_rose_kata_js_jest
A classic tech test kata; refactor legacy code into high quality code, whilst adding a new feature.

## Motivation
To test the ability to pick up a code base, read, interpret, and improve. Ensuring high quality code and implementation, using TDD, OOP, and consistent code style. This time in JavaScript with Jest.

## Design Approach


## Build status


## Code style


## Screenshots


## Tech/framework used


## Features
### User Stories

Existing features:

```
As a small inn owner
So that I can keep track of my stock
I want to maintain an inventory of items
```
```
As a small inn owner
So that I know when I need to sell an item by
I want each item to have a 'SellIn' property
```
```
As a small inn owner
So that I know the value of an item when I sell it
I want each item to have a 'Quality' property
```
```
As a small inn owner
So that I can maintain a current view of quality and sellIn
I want to be able to update quality of every item in the inventory at the end of each day
```

New feature:
```
As a small inn owner
So that I can sell 'conjured' items
I want each 'conjured' item to degrade in quality twice as fast as normal items
```
### Acceptance Criteria

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
Quality drops to 0 after the concert
- Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.


### Domain Model
| Nouns     | Activities     |
| :------------- | :------------- |
| Item       |  name, quality, sell_in, to_s     |
| Inventory  | update_quality |

## Code Example
Before:
```JavaScript
class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
```

After:
```JavaScript

```

## Installation
* Clone the repo.
* `$ npm install`

## Tests
Test can be run with:
`$ npm test`

[] examples, [] failures, [] coverage.

## How to use?
Use in node:

```
$ node
> const GildedRose = require('./src/gilded_rose.js')
> const apple = new GildedRose.Item("apple", 10, 10)
> const banana = new GildedRose.Item("banana", 20, 5)
> const items = [apple, banana]
> const inventory = new GildedRose.Shop(items)
> inventory.updateQuality()
> inventory.updateQuality()
etc
```
