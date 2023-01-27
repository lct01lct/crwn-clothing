import SHOP_DATA from '@/data/shop-data';

export type Category = typeof SHOP_DATA[number];
export type CategoryMap = {
  [key: Category['title']]: Category['items'];
};

export type Product = typeof SHOP_DATA[number]['items'][number];
