import Carsection from "@/app/carSection/page";
import ExploreSection from "@/app/explore/page";
import HeroSection from "@/app/heroSection/page";
import TestimonialSlider from "@/components/testimonals/testimonal";
import React from "react";
import BlogsSection from "./blog/page";
import ProductSection from "@/components/productSection/productSection";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Carsection />
      <TestimonialSlider />
      <ProductSection />
      <ExploreSection />
      <BlogsSection
        limit={3}
        sectionTitle="Happy Buyers, Real Stories"
        sectionSubtitle="Stories from happy buyers who found their car with DriveXDeals."
        seeMoreLink="/blogs"
      />
      <Footer />
    </div>
  );
};

export default HomePage;
