import { Josefin_Sans } from '@next/font/google';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/Layout/Layout';
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --josefin-font: ${josefinSans.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;