import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';
import OurTeam from '../components/home/OurTeam';
import Testimonials from '../components/home/Testimonials';
import ServiceCoverage from '../components/home/ServiceCoverage';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategories />
      <HowItWorks />
      <WhyChooseUs />
      <OurTeam />
      <Testimonials />
      <ServiceCoverage />
    </div>
  );
}
