import { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      {/* <style jsx global>
        {`
          :root {
            --josefin-font: ${josefinSans.style.fontFamily};
          }
        `}
      </style> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;