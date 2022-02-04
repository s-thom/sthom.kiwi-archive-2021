import { DOMAttributes } from 'react';
import { HomeBackground } from './home-background';

// To prevent tree shaking dropping all the code, export this object
export const ELEMENTS = {
  HomeBackground,
};

// https://coryrylan.com/blog/how-to-use-web-components-with-typescript-and-react

type CustomEvents<K extends string> = { [key in K]: (event: CustomEvent) => void };

type CustomElement<T, K extends string | undefined = undefined> = Partial<
  T & DOMAttributes<T> & { children: any } & (K extends string ? CustomEvents<`on${K}`> : {})
>;

// =======
// Remember to add new elements to both of these type definitions as well
// =======

declare global {
  interface HTMLElementTagNameMap {
    'sthom-home-background': HomeBackground;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sthom-home-background': CustomElement<HomeBackground>;
    }
  }
}
