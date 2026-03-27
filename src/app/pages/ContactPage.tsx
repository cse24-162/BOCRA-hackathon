import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactPage() {
  const address = 'Plot 50671, Independence Avenue, Gaborone, Botswana';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  const glassCard = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  };

  const iconBox = {
    width: '48px',
    height: '48px',
    background: 'rgba(255,255,255,0.25)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid rgba(255,255,255,0.35)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: `url('src/app/assets/BOCRA-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 30, 60, 0.55)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '48px 16px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

          {/* Page Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
              Contact Us
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>
              Get in touch with BOCRA for support and inquiries
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>

            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Contact Information Card */}
              <div style={{ ...glassCard, padding: '24px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
                  Contact Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Address */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={iconBox}>
                      <MapPin size={22} color="white" />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '4px', fontSize: '14px' }}>
                        Physical Address
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px' }}>
                        Plot 50671, Independence Avenue<br />Gaborone, Botswana
                      </p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '12px',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            textDecoration: 'none',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        >
                          Google Maps
                        </a>
                        <a
                          href={appleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '12px',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            textDecoration: 'none',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        >
                          Apple Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={iconBox}>
                      <Phone size={22} color="white" />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '4px', fontSize: '14px' }}>
                        Phone Numbers
                      </h3>
                      <a
                        href="tel:+26739577555"
                        style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                      >
                        Main: +267 395 7755
                      </a>
                      <a
                        href="tel:+26739577789"
                        style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                      >
                        Complaints Hotline: +267 395 7789
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={iconBox}>
                      <Mail size={22} color="white" />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '4px', fontSize: '14px' }}>
                        Email Addresses
                      </h3>
                      {[
                        { label: 'General', email: 'info@bocra.org.bw' },
                        { label: 'Licensing', email: 'licensing@bocra.org.bw' },
                        { label: 'Complaints', email: 'complaints@bocra.org.bw' },
                      ].map(({ label, email }) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '14px', textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                        >
                          {label}: {email}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Hours */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={iconBox}>
                      <Clock size={22} color="white" />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '4px', fontSize: '14px' }}>
                        Office Hours
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                        Monday – Friday: 7:30 AM – 4:30 PM<br />
                        Saturday – Sunday: Closed
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Quick Support Card */}
              <div style={{ ...glassCard, padding: '24px' }}>
                <h3 style={{ fontWeight: '600', color: 'white', marginBottom: '8px' }}>Quick Support</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
                  For immediate assistance with urgent matters, please use our digital services:
                </p>
                <ul style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>• Track your submission status online</li>
                  <li>• Submit complaints 24/7 through the portal</li>
                  <li>• Access your dashboard for updates</li>
                </ul>
              </div>
            </div>

            {/* Contact Form Card */}
            <div style={{ ...glassCard, padding: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
                Send Us a Message
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { id: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name' },
                  { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'your.email@example.com' },
                  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+267 7XXX XXXX' },
                  { id: 'subject', label: 'Subject *', type: 'text', placeholder: 'Brief subject of your inquiry' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      id={id}
                      placeholder={placeholder}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginBottom: '6px' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Provide details about your inquiry..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#0095DA',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0077B3')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0095DA')}
                >
                  Send Message
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}