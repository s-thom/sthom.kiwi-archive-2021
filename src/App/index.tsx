import { DefaultSeo } from 'next-seo';
import { DefaultSeoProps, OpenGraph } from 'next-seo/lib/types';
import { PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';
import Theme from '../components/Theme';
import og1200x900 from './og-1200-900.png';
import og800x600 from './og-800-600.png';

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
`;

export default function App({ children }: PropsWithChildren<{}>) {
  return (
    <Theme>
      <DefaultSeo
        defaultTitle="Stuart Thomson"
        description="Software Developer | Human Being"
        additionalMetaTags={useMemo<DefaultSeoProps['additionalMetaTags']>(
          () => [
            { name: 'viewport', content: 'initial-scale=1.0, width=device-width' },
            { name: 'theme-color', content: '#0D1117' },
            { name: 'msapplication-TileColor', content: '#0D1117' },
            { name: 'msapplication-TileImage', content: '/icons/ms-icon-144x144.png' },
          ],
          [],
        )}
        additionalLinkTags={useMemo<DefaultSeoProps['additionalLinkTags']>(
          () => [
            { rel: 'author', type: 'text/plain', href: '/humans.txt' },
            { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon.ico' },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
            { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
            { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
            { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
            { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
            { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
            { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
            { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
            { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
            { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
            { rel: 'manifest', href: '/manifest.json' },
          ],
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
              { url: og800x600.src, alt: 'Stuart Thomson', height: 600, width: 800 },
              { url: og1200x900.src, alt: 'Stuart Thomson', height: 900, width: 1200 },
            ],
          }),
          [],
        )}
      />
      <Container>{children}</Container>
    </Theme>
  );
}
