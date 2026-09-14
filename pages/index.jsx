import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={{ 
      background: '#080A0D',
      color: '#F5F3EE',
      minHeight: '100vh',
      fontFamily: 'inherit'
    }}>
      <style>{`
        * {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 20px 60px rgba(255, 107, 53, 0.15);
          }
          50% { 
            box-shadow: 0 25px 70px rgba(255, 107, 53, 0.25);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .hero-text { animation: slide-in-left 0.8s ease 0.2s both; }
        .hero-image { animation: slide-in-right 0.8s ease 0.2s both; }
        .hero-image img { animation: float 3s ease-in-out infinite; }
        .hero-image .glow { animation: glow-pulse 3s ease-in-out infinite; }
        
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .nav-links {
            display: none !important;
          }
        }
        
        button, a {
          transition: all 0.3s ease;
        }
        
        button:active, a:active {
          transform: translateY(-2px);
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 32px !important;
          }
          
          h2 {
            font-size: 24px !important;
          }
          
          .section-padding {
            padding: 60px 20px !important;
          }
        }
      `}</style>
      
      {/* STICKY NAV */}
      <nav style={{
        position: 'sticky',
        top: 0,
        background: `rgba(8, 10, 13, ${Math.min(scrollY / 100, 0.95)})`,
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(255, 107, 53, 0.1)' : 'none',
        zIndex: 1000,
        padding: '16px 20px',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#FF6B35' }}>Trues</div>
        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#work" style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Work</a>
          <a href="#services" style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Services</a>
          <button style={{
            background: '#FF6B35',
            color: '#080A0D',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }} onClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Work With Me</button>
        </div>
      </nav>

      {/* HERO SECTION - PERSONAL POSITIONING */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '60px',
        padding: '80px 40px',
        position: 'relative',
        background: 'linear-gradient(135deg, #080A0D 0%, #11151B 100%)'
      }} className="hero-grid">
        {/* Left: Text */}
        <div style={{ position: 'relative', zIndex: 10 }} className="hero-text">
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#FF6B35',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '24px'
          }}>
            Builder / Developer / AI Specialist
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 64px)',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#F5F3EE'
          }}>
            I'm Trues.
          </h1>

          <h2 style={{
            fontSize: 'clamp(24px, 6vw, 48px)',
            fontWeight: '600',
            lineHeight: '1.2',
            marginBottom: '32px',
            color: '#D89B32'
          }}>
            I build digital products, AI automations & web experiences.
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#9CA3AF',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            Currently building <strong style={{ color: '#FF6B35' }}>Afrovia</strong> — a marketplace connecting African diaspora communities in Europe with verified local service providers.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: '#FF6B35',
              color: '#080A0D',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore My Work
            </button>
            <button style={{
              background: 'transparent',
              border: '2px solid #FF6B35',
              color: '#FF6B35',
              padding: '14px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF6B35';
              e.currentTarget.style.color = '#080A0D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#FF6B35';
            }}
            onClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Work With Me
            </button>
          </div>
        </div>

        {/* Right: Image with Editorial Treatment */}
        <div style={{
          position: 'relative',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        }} className="hero-image">
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} className="glow" />
          <img
            src="/photo.jpg"
            alt="Trues"
            style={{
              width: '100%',
              maxWidth: '350px',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(255, 107, 53, 0.15)',
              position: 'relative',
              zIndex: 5,
              border: '1px solid rgba(255, 107, 53, 0.2)'
            }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.2), transparent)',
            pointerEvents: 'none'
          }} />
        </div>
      </section>

      {/* FLAGSHIP PROJECT: AFROVIA */}
      <section id="work" className="section-padding" style={{
        padding: '100px 40px',
        background: '#11151B',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }} onTouchStart={() => null}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#FF6B35',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              FLAGSHIP PROJECT
            </div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#F5F3EE',
              marginBottom: '24px'
            }}>
              Afrovia
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#9CA3AF',
              maxWidth: '600px',
              lineHeight: '1.8'
            }}>
              A marketplace connecting diaspora communities across Europe with verified African service providers.
            </p>
          </div>

          <div style={{
            background: '#080A0D',
            border: '1px solid rgba(255, 107, 53, 0.2)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '40px'
          }}>
            <div style={{
              padding: '40px',
              color: '#9CA3AF',
              fontSize: '16px',
              lineHeight: '1.8'
            }}>
              <strong style={{ color: '#FF6B35' }}>What it does:</strong>
              <ul style={{ margin: '16px 0', paddingLeft: '20px' }}>
                <li>Provider discovery and verification</li>
                <li>Service booking and management</li>
                <li>Community trust and ratings</li>
                <li>Multilingual support across Europe</li>
              </ul>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 107, 53, 0.1)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🤝</div>
              <div style={{ color: '#FF6B35', fontWeight: '600', marginBottom: '8px' }}>Provider Network</div>
              <div style={{ fontSize: '14px', color: '#9CA3AF' }}>Verified African service providers</div>
            </div>
            <div style={{
              background: 'rgba(216, 155, 50, 0.1)',
              border: '1px solid rgba(216, 155, 50, 0.2)',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌍</div>
              <div style={{ color: '#D89B32', fontWeight: '600', marginBottom: '8px' }}>European Reach</div>
              <div style={{ fontSize: '14px', color: '#9CA3AF' }}>Diaspora communities across Europe</div>
            </div>
            <div style={{
              background: 'rgba(255, 107, 53, 0.1)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
              <div style={{ color: '#FF6B35', fontWeight: '600', marginBottom: '8px' }}>Trust System</div>
              <div style={{ fontSize: '14px', color: '#9CA3AF' }}>Ratings and verification</div>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <button style={{
              display: 'inline-block',
              color: '#FF6B35',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px 24px',
              border: '1px solid #FF6B35',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'transparent'
            }} onMouseEnter={(e) => {
              e.target.style.background = '#FF6B35';
              e.target.style.color = '#080A0D';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#FF6B35';
            }} onClick={() => alert('Afrovia link coming soon')}>
              Explore Afrovia →
            </button>
          </div>
        </div>
      </section>

      {/* AI AUTOMATION SECTION */}
      <section className="section-padding" style={{
        padding: '100px 40px',
        background: '#080A0D',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#FF6B35',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              CAPABILITIES
            </div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#F5F3EE',
              marginBottom: '16px'
            }}>
              AI Automation
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#9CA3AF',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              I build custom workflows that automate repetitive tasks, qualify leads, and scale operations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              { icon: '🤖', title: 'AI Agents', desc: 'Autonomous systems for lead qualification' },
              { icon: '📧', title: 'Email Automation', desc: 'Sequences, follow-ups, drip campaigns' },
              { icon: '💬', title: 'WhatsApp Flows', desc: 'Lead capture and customer support' },
              { icon: '📊', title: 'Data Integration', desc: 'API connections and CRM sync' },
              { icon: '⏰', title: 'Scheduled Workflows', desc: 'Time-based automation and triggers' },
              { icon: '🔄', title: 'Tool Integration', desc: 'n8n, Zapier, Make, and custom APIs' }
            ].map((item, i) => (
              <div key={i} style={{
                background: '#11151B',
                border: '1px solid rgba(255, 107, 53, 0.15)',
                borderRadius: '8px',
                padding: '32px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.05)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.15)';
                e.currentTarget.style.background = '#11151B';
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#F5F3EE', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEB DEVELOPMENT SECTION */}
      <section className="section-padding" style={{
        padding: '100px 40px',
        background: '#11151B',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#D89B32',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              DEVELOPMENT
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: '700',
              color: '#F5F3EE',
              marginBottom: '16px'
            }}>
              Websites & Web Apps
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#9CA3AF',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Modern web experiences built with React, Next.js, and designed for conversion and performance.
            </p>
          </div>

          <div style={{
            background: '#080A0D',
            border: '1px solid rgba(216, 155, 50, 0.2)',
            borderRadius: '12px',
            padding: '40px',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'APIs', 'Responsive Design', 'Performance'].map((tech, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  border: '1px solid rgba(216, 155, 50, 0.2)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  color: '#D89B32',
                  fontWeight: '500'
                }}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OFFERING */}
      <section id="services" className="section-padding" style={{
        padding: '100px 40px',
        background: '#080A0D'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: '700',
              color: '#F5F3EE',
              marginBottom: '16px'
            }}>
              What I Offer
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#9CA3AF',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Consulting, development, and learning services tailored to your needs.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {[
              { title: 'AI Automation Consulting', desc: 'Design and build custom workflows for your business.' },
              { title: 'Web & WebApp Development', desc: 'Modern websites and applications built for growth.' },
              { title: 'AI Automation Learning', desc: 'Hands-on guidance to build your own automations.' }
            ].map((service, i) => (
              <div key={i} style={{
                background: '#11151B',
                border: '1px solid rgba(255, 107, 53, 0.15)',
                borderRadius: '8px',
                padding: '40px',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#F5F3EE',
                  marginBottom: '12px'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#9CA3AF',
                  lineHeight: '1.8'
                }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding" style={{
        padding: '120px 40px',
        background: '#11151B',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: '700',
            color: '#F5F3EE',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Have an idea worth building?
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: '#9CA3AF',
            marginBottom: '40px',
            lineHeight: '1.8'
          }}>
            Let's collaborate on something great. Whether it's a custom AI workflow, a web application, or your next big idea.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: '#FF6B35',
              color: '#080A0D',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              touchAction: 'manipulation'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => alert('Contact form coming soon - Email: hello@trues.dev')}>
              Let's Build It
            </button>
            <a href="https://www.instagram.com/innerforge0/" target="_blank" rel="noopener noreferrer" style={{
              background: 'transparent',
              color: '#FF6B35',
              border: '2px solid #FF6B35',
              padding: '14px 38px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              touchAction: 'manipulation'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FF6B35';
              e.currentTarget.style.color = '#080A0D';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#FF6B35';
            }}>
              Follow My Journey
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER / SOCIAL LINKS */}
      <section className="section-padding" style={{
        padding: '60px 40px',
        background: '#080A0D',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#FF6B35', textTransform: 'uppercase', marginBottom: '16px' }}>
                Connect
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <a href="https://www.youtube.com/@TrueStoryTime11" target="_blank" rel="noopener noreferrer" style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → YouTube
                </a>
                <a href="https://www.instagram.com/innerforge0/" target="_blank" rel="noopener noreferrer" style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Instagram
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#D89B32', textTransform: 'uppercase', marginBottom: '16px' }}>
                Projects
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button onClick={() => {
                  const el = document.getElementById('work');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#D89B32'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Afrovia
                </button>
                <button onClick={() => alert('Web projects coming soon')} style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#D89B32'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Web Projects
                </button>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#FF6B35', textTransform: 'uppercase', marginBottom: '16px' }}>
                Services
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <button onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → AI Automation
                </button>
                <button onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Web Development
                </button>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 107, 53, 0.1)',
            paddingTop: '40px',
            textAlign: 'center',
            color: '#9CA3AF',
            fontSize: '14px'
          }}>
            <p>Built with intent. No templates. No shortcuts.</p>
            <p style={{ margin: '8px 0 0 0' }}>© 2026 Trues. Building digital products & AI automation systems.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
