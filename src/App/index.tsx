import { DefaultSeo } from 'next-seo';
import { MetaTag, OpenGraph } from 'next-seo/lib/types';
import { PropsWithChildren, useMemo } from 'react';
import Theme from '../components/Theme';
import Container from './Container';
import GlobalStyles from './GlobalStyles';
import og800x600 from './og-800-600.png';
import og1200x900 from './og-1200-900.png';

export default function App({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Theme>
        <GlobalStyles />
        <DefaultSeo
          defaultTitle="Stuart Thomson"
          description="Software Developer | Human Being"
          additionalMetaTags={useMemo<MetaTag[]>(
            () => [{ name: 'viewport', content: 'initial-scale=1.0, width=device-width' }],
            [],
          )}
          openGraph={useMemo<OpenGraph>(
            () => ({
              type: 'website',
              site_name: 'Stuart Thomson',
              title: 'Stuart Thomson',
              description: 'Software Developer | Human Being',
              profile: {
                firstName: 'Stuart',
                lastName: 'Thomson',
                username: 'sthom',
              },
              images: [
                { url: og800x600, alt: 'Stuart Thomson', height: 600, width: 800 },
                { url: og1200x900, alt: 'Stuart Thomson', height: 900, width: 1200 },
              ],
            }),
            [],
          )}
        />
        <Container>{children}</Container>
      </Theme>
    </>
  );
}
