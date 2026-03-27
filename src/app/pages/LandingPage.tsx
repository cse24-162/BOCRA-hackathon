import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FileText, MessageSquare, Search, Smartphone, CheckCircle, Signal, FileCheck, Clock } from 'lucide-react';
import { QuickAccessCard } from '../components/QuickAccessCard';
import { StatCard } from '../components/StatCard';
import { getStatistics } from '../utils/api';
import { Statistic } from '../types';
import { Award, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import heroBg from '../assets/heroBg.png';
import heroo from '../assets/heroo.png';
import hero2 from '../assets/hero2.png'
import hackathon from '../assets/hackathon.jpg'

export function LandingPage() {
  const [active, setActive] = useState(0);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const [heroIndex, setHeroIndex] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);
  const [textKey, setTextKey] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  }, 6000);

  return () => clearInterval(interval);
}, []);

const nextSlide = () => {
  setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  setTextKey((prev) => prev + 1);
};

const prevSlide = () => {
  setHeroIndex((prev) =>
    prev === 0 ? heroSlides.length - 1 : prev - 1
  );
  setTextKey((prev) => prev + 1);
};

const handleTouchStart = (e) => {
  startX.current = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  endX.current = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  const distance = startX.current - endX.current;

  if (distance > 50) nextSlide();
  if (distance < -50) prevSlide();
};

  const services = [
    { title: "Submit Complaint", desc: "Report issues with telecom or broadcasting services and receive timely resolution.", link: "/complaints" },
    { title: "Apply for License", desc: "Start and manage your telecommunications or broadcasting license applications.", link: "/licensing" },
    { title: "Track Submission", desc: "Monitor the progress of your submissions such as complaints, and license applications in real-time.", link: "/tracking" },
    { title: "Check Device Registration", desc: "Verify whether your device is compliant and registered.", link: "/deviceRegistration" },
  ];

  useEffect(() => {
    async function loadStatistics() {
      try {
        const stats = await getStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error('Error loading statistics:', error);
        setStatistics([
          { label: 'Complaints Resolved', value: '0', icon: 'CheckCircle' },
          { label: 'Network Coverage', value: '96.8%', icon: 'Signal' },
          { label: 'Active Licenses', value: '0', icon: 'FileCheck' },
          { label: 'Avg Response Time', value: '2.3 days', icon: 'Clock' },
        ]);
      } finally {
        setIsLoadingStats(false);
      }
    }
    loadStatistics();
  }, []);

  const heroSlides = [
  {
    image: heroBg,
    title: (
      <>
        Connecting Botswana, <br />
        <span className="text-blue-200">Regulating the Digital Space</span>
      </>
    ),
    description:
      "Your central authority for telecommunications licensing, complaint resolution, and regulatory compliance — serving citizens and industry across Botswana."
  },
  {
    image: heroo,
    title: (
      <>
        Fast & Transparent <br />
        <span className="text-blue-200">Complaint Resolution</span>
      </>
    ),
    description:
      "Submit, track, and resolve complaints efficiently through our digital-first regulatory platform."
  },
  {
    image: hero2,
    title: (
      <>
        Empowering Digital Growth <br />
        <span className="text-blue-200">Across Botswana</span>
      </>
    ),
    description:
      "We enable fair competition, licensing, and innovation in the telecom sector."
  }
];

  return (
    <>
      {/* Hero Section */}
<section
 className="relative text-white overflow-hidden min-h-[85vh] flex items-center"
  style={{}}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
    {/* BACKGROUND IMAGE LAYERS (SMOOTH FADE) */}
  <div className="absolute inset-0">
    {heroSlides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
          index === heroIndex
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-105'
        }`}
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      />
    ))}
  </div>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#003A5C]/75 via-[#0077B3]/60 to-[#0095DA]/40" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl text-center sm:text-left">

      {/* TITLE (changes per slide) */}
     <h1
     key={textKey}
     className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
>
<span className="inline-block animate-fadeUp">
    {heroSlides[heroIndex].title}
  </span>
  </h1>
<p
  key={textKey + 1}
  className="text-lg sm:text-xl text-blue-100 mb-8 animate-fadeUp delay-100"
>
  {heroSlides[heroIndex].description}
</p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
        <a
          href="/complaints"
          className="group inline-flex items-center justify-center bg-[#0095DA] hover:bg-[#0077B3] px-6 py-3 rounded-md font-medium transition-all duration-300"
        >
          Submit a Complaint
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </a>

        <a
          href="/services"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium border border-white/40 backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          Explore Our Services
        </a>
      </div>
    </div>
  </div>

  {/* LEFT ARROW */}
  <button
    onClick={prevSlide}
    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full transition"
  >
    <ChevronLeft size={24} />
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={nextSlide}
    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-3 rounded-full transition"
  >
    <ChevronRight size={24} />
  </button>

  {/* DOTS */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
    {heroSlides.map((_, index) => (
      <button
        key={index}
        onClick={() => setHeroIndex(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          heroIndex === index ? 'bg-white w-6' : 'bg-white/50 w-2'
        }`}
      />
    ))}
  </div>
</section>

      {/* Values Section */}
      <section className="relative w-full bg-gradient-to-b from-[#0095DA]/10 via-white/50 to-white py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 tracking-wide">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {[
              { title: "Excellence", subtitle: "World-class service", icon: Award, text: "We strive to be a world-class leader in regulatory services through committed teams and impeccable customer service." },
              { title: "Proactiveness", subtitle: "Forward thinking", icon: TrendingUp, text: "We are forward-looking in our delivery, keeping pace with evolving industry trends before they demand a response." },
              { title: "Integrity", subtitle: "Honest & accountable", icon: ShieldCheck, text: "We demonstrate openness, honesty and accountability in all our decisions and in the execution of our mandate." },
              { title: "People", subtitle: "Our greatest asset", icon: Users, text: "Our people are key to our success. We harness individual skills and strengths, developing them to work as one." }
            ].map((value, index) => (
              <div
                key={index}
                className="relative bg-white/80 rounded-xl border border-gray-200 shadow-sm p-6 min-h-[240px] flex flex-col justify-between overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-full"
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-0 hover:opacity-90 bg-gradient-to-br from-[#0095DA]/20 to-[#0077B3]/30 backdrop-blur-md border border-white/30 rounded-xl text-gray-900 transition-opacity duration-300">
                  <p className="text-sm leading-relaxed">{value.text}</p>
                </div>
                <div className="value-icon mb-4 z-10 text-center">
                  <value.icon size={36} className="text-gray-900" />
                </div>
                <div className="z-10 text-center">
                  <h3 className="value-title font-bold text-lg text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{value.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="relative py-24 bg-gradient-to-br from-[#003A5C] via-[#004f7a] to-[#0095DA] text-white overflow-hidden">
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold">Our Services</h2>
      <p className="text-lg text-blue-100 mt-3">
        Access key regulatory services quickly and efficiently
      </p>
    </div>

    {/* Cards */}
    <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
      {services.map((service, index) => (
        <div
          key={index}
          className="min-w-[260px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/20 transition-all duration-300"
        >
          <div>
            <div className="text-sm text-blue-200 mb-2">
              0{index + 1}
            </div>
            <h3 className="text-xl font-bold mb-3">
              {service.title}
            </h3>
            <p className="text-blue-100 text-sm">
              {service.desc}
            </p>
          </div>

          <a
            href={service.link}
            className="mt-6 inline-block bg-white text-[#003A5C] px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-gray-100 transition"
          >
            Proceed →
          </a>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center mt-16">
      <a
        href="/services"
        className="inline-flex items-center gap-2 bg-white text-[#003A5C] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
      >
        Explore Services →
      </a>
    </div>

  </div>
</section>

      {/* Media & Events Section */}
<section className="relative py-24 bg-gradient-to-b from-white to-[#0095DA]/10 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900">Media & Events</h2>
      <p className="text-gray-600 mt-3">Stay updated with the latest from BOCRA</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">

      {/* FEATURED CARD */}
      <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group h-[400px]">
        <img
          src={hackathon}
          alt="Featured Event"
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute bottom-0 p-6 text-white">
          <span className="text-xs uppercase tracking-widest text-blue-200">Event</span>
          <h3 className="text-2xl font-bold mt-2">
            BOCRA WEBSITE DEVELOPMENT HACKATHON
          </h3>
          <p className="text-sm text-white/80 mt-2 max-w-lg">
            Bringing together stakeholders to shape Botswana’s digital future.
          </p>
        </div>
      </div>

      {/* SIDE CARDS */}
      <div className="flex flex-col gap-6">

        {/* Card 1 */}
        <div className="relative rounded-2xl overflow-hidden group h-[190px]">
          <img
            src={hero2}
            alt="News"
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-4 text-white">
            <span className="text-xs text-blue-200 uppercase">Announcement</span>
            <h4 className="font-semibold text-sm mt-1">
               Botswana collaborates with five SADC Member States to substantially reduce and harmonise 
               mobile roaming tariffs.
            </h4>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-2xl overflow-hidden group h-[190px]">
          <img
            src={heroBg}
            alt="Update"
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-4 text-white">
            <span className="text-xs text-blue-200 uppercase">Update</span>
            <h4 className="font-semibold text-sm mt-1">
              BOCRA approves reduced data prices for Orange & BTC Botswana
            </h4>
          </div>
        </div>

      </div>
    </div>

    {/* CTA */}
    <div className="text-center mt-12">
      <a
        href="/media"
        className="inline-flex items-center gap-2 bg-[#0095DA] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0077B3] transition"
      >
        View All Media →
      </a>
    </div>

  </div>
</section>
    </>
  );
}

