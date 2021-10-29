export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor( name, quality, sellIn ) {
        this.name = name;
        this.quality = quality;
        this.sellIn = sellIn;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor( items: Array<Item> ) {
        this.items = items;
    }

    tick() {

        // NEW
        this.items.forEach( item => {

            // Condiciones
            let backstage: boolean = item.name != 'Backstage passes to a TAFKAL80ETC concert';
            let sulfuras: boolean = item.name != 'Sulfuras, Hand of Ragnaros';
            let conjured: boolean = item.name == 'Conjured Mana Cake';
            let aged: boolean = item.name != 'Aged Brie';

            // Identificando producto para aumentar/reducir calidad si está dentro del rango
            if ( 0 < item.quality && item.quality < 50 ) {
                if ( aged && backstage ) {
                    if ( sulfuras )
                        item.quality--;

                    // Productos Conjured
                    if ( conjured )
                        item.quality--;
                } else { // En caso contenga "Backstage ..."
                    item.quality++;
                    if ( !backstage ) {
                        if ( item.sellIn < 11 ) item.quality++;
                        if ( item.sellIn < 6 ) item.quality++;
                    }
                }
            }

            // Reduciendo el tiempo de venta en uno si el producto no es Sulfuras
            if ( sulfuras )
                item.sellIn--;

            // Reduce la calidad para productos vencidos
            if ( item.sellIn < 0 ) {
                if ( item.name != 'Aged Brie' ) {
                    if ( backstage && item.quality > 0 ) {
                        if ( sulfuras ) {
                            item.quality--;

                            // Productos Conjured
                            if ( conjured )
                                item.quality--;
                        }
                    } else {
                        item.quality -= item.quality;
                    }
                } else {
                    if ( item.quality < 50 ) item.quality++;
                }
            }
        } );

        return this.items;
    }
}
