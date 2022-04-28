import { NextSeo } from 'next-seo';
import Layout from '../src/components/Layout';
import { home, privacyPolicy } from '../src/paths';

export default function Home() {
  return (
    <Layout
      breadcrumbs={[
        { path: home({}), name: 'Home' },
        { path: privacyPolicy({}), name: 'Privacy Policy' },
      ]}
    >
      <NextSeo title="Privacy Policy | Stuart Thomson" />
      <h1>Privacy Policy</h1>
      <p>I run a few small services. These are listed below.</p>
      <ul>
        <li>
          <a href="#sthom-kiwi">sthom.kiwi</a>
        </li>
        <li>
          <a href="#blog">blog.sthom.kiwi</a>
        </li>
        <li>
          <a href="#paste">paste</a>
        </li>
        <li>
          <a href="#linkdrop">linkdrop</a>
        </li>
      </ul>
      <p>I want to keep user data processing to a minimum, because it&apos;s hard to get right.</p>
      <p>
        By visiting/using these services, you accept these uses of your data are reasonable. I will endeavour to keep
        these up to date, which means they may change at any time.
      </p>
      <h2 id="sthom-kiwi">sthom.kiwi</h2>
      <p>
        This website collects analytics data using Google Analytics. This data is used to satisfy my curiosity as to
        what people actually want to know about me. This data is not forwarded on to third parties, besides Google who
        offers the service. Google maintains it own privacy policy, and they also offer{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="blank" rel="noopener nofollow noreferrer">
          an extension to opt out of analytics collection
        </a>
        .
      </p>
      <p>
        This website is hosted on Vercel, who maintains their own privacy policy. They do not have access to customer
        data, except where express permission is granted.
      </p>
      <p>
        This website collects access logs, which include user IP addresses. These IP addresses are not used to identify
        individuals.
      </p>
      <p>This website does not sell personal data to third parties for marketing or any other purposes.</p>
      <h2 id="blog">blog.sthom.kiwi</h2>
      <p>
        This website collects analytics data using Google Analytics. This data is used to satisfy my curiosity as to
        what people like to read, so I can make more of it and get fake internet points. This data is not forwarded on
        to third parties, besides Google who offers the service. Google maintains it own privacy policy, and they also
        offer{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="blank" rel="noopener nofollow noreferrer">
          an extension to opt out of analytics collection
        </a>
        .
      </p>
      <p>
        This website is hosted on Vercel, who maintains their own privacy policy. They do not have access to customer
        data, except where express permission is granted.
      </p>
      <p>
        This website collects access logs, which include user IP addresses. These IP addresses are not used to identify
        individuals.
      </p>
      <p>This website does not sell personal data to third parties for marketing or any other purposes.</p>
      <h2 id="paste">paste</h2>
      <p>
        This website collects access logs, which include user IP addresses. These IP addresses are not used to identify
        individuals.
      </p>
      <p>This website does not sell personal data to third parties for marketing or any other purposes.</p>
      <h2 id="linkdrop">linkdrop</h2>
      <p>
        This website uses email addresses as login identifiers. This, and all other, information is stored encrypted at
        rest. Passwords are hashed before being stored.
      </p>
      <p>This website uses cookies for session information. No other cookies are used.</p>
      <p>
        This website collects access logs, which include user IP addresses. These IP addresses are not used to identify
        individuals.
      </p>
      <p>
        This website is hosted on fly.io, who maintains their own privacy policy. They do not have access to customer
        data, except where express permission is granted.
      </p>
      <p>This website does not sell personal data to third parties for marketing or any other purposes.</p>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};
