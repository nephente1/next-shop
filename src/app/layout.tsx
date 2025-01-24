import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Header from './components/Header';
import ReduxProvider from './components/ReduxProvider';
import Footer from './components/Footer';
import './styles/globals.css';

const montserratSans = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next 15 Shop App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserratSans.variable} grid grid-rows-[auto_1fr_auto] min-h-screen w-full font-[family-name:var(--font-montserrat)]`}
      >
        <ReduxProvider>
          <Header />
          <div className="flex flex-col w-full justify-items-start items-center">
            <main className="container flex-col mt-6">{children}</main>
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
