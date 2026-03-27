import { useState } from "react";
import heroImg from "../assets/heroBg.png";
 
type FAQItem = {
  question: string;
  answer: string;
};
 
const FAQS: FAQItem[] = [
  {
    question: "What does BOCRA do?",
    answer:
      "BOCRA regulates the communications sector in Botswana, including telecommunications, radio communications, and postal services. It ensures fair access, affordability, and quality services for all citizens.",
  },
  {
    question: "How do I lodge a complaint?",
    answer:
      "You can lodge a complaint through the BOCRA complaints portal or by visiting our offices. Provide all relevant details including service provider information and issue description.",
  },
  {
    question: "Who issues telecom licenses?",
    answer:
      "BOCRA is responsible for issuing and managing licenses for telecommunications and broadcasting operators in Botswana.",
  },
  {
    question: "How long does complaint resolution take?",
    answer:
      "Resolution times vary depending on complexity, but BOCRA aims to resolve most complaints within a reasonable and transparent timeframe.",
  },
];
 
const glassCard = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
};
 
export function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
 
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 
  return (
    <div className="w-full min-h-screen bg-white">
 
      {/* HERO SECTION */}
      <section className="relative h-[55vh] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003A5C]/80 via-[#0077B3]/60 to-[#0095DA]/40" />
        <div className="relative text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BOCRA</h1>
          <p className="text-blue-100 text-lg">
            Empowering Botswana's digital future through fair, secure, and accessible communications regulation.
          </p>
        </div>
      </section>
 
      {/* WHO WE ARE */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          The Botswana Communications Regulatory Authority (BOCRA) is the national
          regulator for the communications sector. We oversee telecommunications,
          postal services, and radio communications to ensure efficient, fair,
          and innovative digital access across Botswana.
        </p>
      </section>
 
      {/* MISSION / VALUES */}
      <section
        style={{
          position: 'relative',
          backgroundImage: `url('src/app/assets/BOCRA-image.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '80px 16px',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 30, 60, 0.65)',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1152px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Our Mission', text: 'To regulate and promote an innovative, competitive, and inclusive communications sector in Botswana.' },
            { title: 'Our Vision', text: 'A digitally connected Botswana with accessible and reliable communication services for all.' },
            { title: 'Our Values', text: 'Transparency, fairness, innovation, accountability, and service excellence.' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                ...glassCard,
                padding: '28px 24px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#7DD3FC', marginBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
 
      {/* WHAT WE DO — glass cards on background image */}
      <section
        style={{
          position: 'relative',
          backgroundImage: `url('src/app/assets/BOCRA-image.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '80px 16px',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 30, 60, 0.65)',
            zIndex: 0,
          }}
        />
 
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1152px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '32px',
            }}
          >
            What We Do
          </h2>
 
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Regulation',
                text: 'We regulate telecom, postal, and broadcasting services to ensure compliance and fairness.',
              },
              {
                title: 'Licensing',
                text: 'We issue licenses to service providers in the communications sector.',
              },
              {
                title: 'Consumer Protection',
                text: 'We protect users from unfair practices and ensure quality service delivery.',
              },
              {
                title: 'Spectrum Management',
                text: 'We manage radio frequency spectrum for efficient national usage.',
              },
              {
                title: 'Digital Inclusion',
                text: 'We promote affordable access to communication services across Botswana.',
              },
              {
                title: 'Dispute Resolution',
                text: 'We mediate between consumers and service providers to resolve complaints.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  ...glassCard,
                  padding: '24px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
                }}
              >
                <h3
                  style={{
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px',
                    fontSize: '16px',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* FAQ SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{ fontWeight: openIndex === index ? '600' : 'normal' }}
                  className="w-full text-left px-5 py-4 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-[#0077B3] font-bold">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
 
    </div>
  );
}

