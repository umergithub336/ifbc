import React from "react";
import HomeBanner from "./BannerComponents/HomeBanner";
import About from "../GlobalPageSections/About";
import About2 from "../GlobalPageSections/About2";
import Services from "./Services";
import Testimonials from "../GlobalPageSections/Testimonials";
import PreFooter from "src/Globals/PreFooter";
import PageTransition from "src/Animations/PageTransition";

const MainHome = () => {
  return (
    <PageTransition>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full">
            <HomeBanner />
            <About />
            <About2 />
            <Services />
            <Testimonials />
            <PreFooter />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default MainHome;
