import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  FAQs,
  Features,
  Footer,
  Header,
  Hero,
  ListingTypes,
  ListingWork,
  Stats,
  Testimonials,
} from '@/features/sponsor';
import { Meta } from '@/layouts/Meta';
import { cn } from '@/utils';

const font = localFont({
  src: '../../../public/assets/landingsponsor/fonts/OverusedGrotesk-VF.woff2',
  variable: '--font-overused-grotesk',
});

const Sponsor = () => {
  const [videoPopup, setVideoPopup] = useState<boolean>(false);
  const router = useRouter();

  const VideoPlayback = () => {
    return (
      <div
        className="fixed z-50 grid h-screen w-screen place-content-center bg-[rgba(191,203,220,0.67)] font-sans"
        onClick={() => setVideoPopup(false)}
      >
        <div className="relative flex w-[95vw] flex-col gap-5 overflow-hidden pt-[56.25%] lg:w-[60vw]">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            src="https://www.youtube.com/embed/tHdS-JNwsgg?autoplay=1&mute=1"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Meta
        title="Find Top Talent for Your Crypto Projects on Superteam Earn"
        description="Seeking top talent for your crypto project? Superteam Earn connects you with experts for Bounties, Projects, and Grants in the crypto space."
        og={`${router.basePath}/assets/og/sponsor.png`}
      />

      {videoPopup && <VideoPlayback />}

      <Header />

      <div
        className={cn(
          'flex flex-col items-center overflow-hidden bg-white',
          font.className,
        )}
        style={font.style}
      >
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Hero />
          <ListingTypes />
          <Features showVideo={() => setVideoPopup(true)} />
          <Stats />
          <ListingWork />
          <Testimonials />
          <FAQs />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Sponsor;
