import LandingHero from "@/app/components/login/landing-hero";

const LandingPage = () => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <LandingHero />
      </div>
    </main>
  );
};

export default LandingPage;
