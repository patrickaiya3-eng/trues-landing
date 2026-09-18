import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AProject Type: ${formData.projectType}%0A%0AMessage:%0A${formData.message}`;
    window.location.href = `mailto:patrickaiya3@gmail.com?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(message)}`;
    setShowModal(false);
  };

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

        @keyframes orbit {
          0% { transform: rotateZ(0deg) translateX(120px) rotateZ(0deg); }
          100% { transform: rotateZ(360deg) translateX(120px) rotateZ(-360deg); }
        }

        @media (max-width: 768px) {
          @keyframes orbit {
            0% { transform: rotateZ(0deg) translateX(90px) rotateZ(0deg); }
            100% { transform: rotateZ(360deg) translateX(90px) rotateZ(-360deg); }
          }
        }

        @media (max-width: 480px) {
          @keyframes orbit {
            0% { transform: rotateZ(0deg) translateX(70px) rotateZ(0deg); }
            100% { transform: rotateZ(360deg) translateX(70px) rotateZ(-360deg); }
          }
        }

        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .hero-text { animation: slide-in-left 0.8s ease 0.2s both; }
        .hero-image { animation: slide-in-right 0.8s ease 0.2s both; }
        .hero-image img { animation: float 3s ease-in-out infinite; }
        .hero-image .glow { animation: glow-pulse 3s ease-in-out infinite; }
        
        .carousel-container {
          width: 500px;
          height: 500px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .carousel-center {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,107,53,0.3), transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 10;
          box-shadow: 0 0 60px rgba(255, 107, 53, 0.2);
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        .carousel-center img {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #9B7653;
          animation: float 3s ease-in-out infinite;
        }
        
        .orbit-item {
          position: absolute;
          width: 100px;
          height: 100px;
          animation: orbit 8s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .orbit-item img {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #9B7653;
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
          animation: fade-in-scale 0.6s ease;
        }
        
        .orbit-item:nth-child(1) { animation-delay: 0s; }
        .orbit-item:nth-child(2) { animation-delay: -2s; }
        .orbit-item:nth-child(3) { animation-delay: -4s; }
        .orbit-item:nth-child(4) { animation-delay: -6s; }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 10, 13, 0.8);
          backdrop-filter: blur(8px);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .modal-overlay.active {
          display: flex;
        }

        .modal-content {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border: 1px solid rgba(255, 107, 53, 0.2);
          border-radius: 20px;
          padding: 48px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(255, 107, 53, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          color: #F5F3EE;
        }

        .modal-close {
          background: none;
          border: none;
          color: #9CA3AF;
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
        }

        .modal-close:hover {
          color: #9B7653;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #F5F3EE;
          margin-bottom: 8px;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 107, 53, 0.05);
          border: 1px solid rgba(255, 107, 53, 0.2);
          border-radius: 8px;
          color: #F5F3EE;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.3s;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          background: rgba(255, 107, 53, 0.1);
          border-color: rgba(255, 107, 53, 0.5);
          box-shadow: 0 0 12px rgba(255, 107, 53, 0.2);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-select option {
          background: #080A0D;
          color: #F5F3EE;
        }

        .char-count {
          font-size: 12px;
          color: #9CA3AF;
          margin-top: 4px;
          text-align: right;
        }

        .form-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #9B7653 0%, #A0826D 100%);
          color: #080A0D;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        }

        .form-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
        }
        
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 60px 20px !important;
          }
          
          .nav-links {
            display: none !important;
          }

          .carousel-container {
            width: 350px !important;
            height: 350px !important;
          }

          .carousel-center {
            width: 200px !important;
            height: 200px !important;
          }

          .carousel-center img {
            width: 180px !important;
            height: 180px !important;
          }

          .orbit-item {
            width: 70px !important;
            height: 70px !important;
          }

          .orbit-item img {
            width: 60px !important;
            height: 60px !important;
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

          .carousel-container {
            width: 280px !important;
            height: 280px !important;
          }

          .carousel-center {
            width: 160px !important;
            height: 160px !important;
          }

          .carousel-center img {
            width: 145px !important;
            height: 145px !important;
          }

          .orbit-item {
            width: 55px !important;
            height: 55px !important;
          }

          .orbit-item img {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>

      {/* MODAL - Contact Form */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Let's Build It</h2>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Your name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="Full name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Project type</label>
              <select 
                name="projectType"
                className="form-select"
                value={formData.projectType}
                onChange={handleFormChange}
                required
              >
                <option value="">Select a service...</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Web Development">Web Development</option>
                <option value="AI Automation Learning">AI Automation Learning</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tell me about it</label>
              <textarea 
                name="message"
                className="form-textarea" 
                placeholder="Describe your project..."
                value={formData.message}
                onChange={handleFormChange}
                maxLength={5000}
                required
              />
              <div className="char-count">{formData.message.length}/5000</div>
            </div>

            <button type="submit" className="form-button">Send message →</button>
          </form>
        </div>
      </div>

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
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#9B7653' }}>Patrick Trues</div>
        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#work" style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Work</a>
          <a href="#services" style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Services</a>
          <button style={{
            background: '#9B7653',
            color: '#080A0D',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }} onClick={() => setShowModal(true)}>Work With Me</button>
        </div>
      </nav>

      {/* HERO SECTION - PERSONAL POSITIONING */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '80px',
        padding: '80px 40px',
        position: 'relative',
        background: 'linear-gradient(135deg, #080A0D 0%, #11151B 100%, #080A0D 100%)',
        overflow: 'hidden'
      }} className="hero-grid">
        {/* Left: Text */}
        <div style={{ position: 'relative', zIndex: 10 }} className="hero-text">
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#9B7653',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '24px',
            opacity: 0.9
          }}>
            Builder / Developer / AI Specialist
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 10vw, 72px)',
            fontWeight: '800',
            lineHeight: '1.05',
            marginBottom: '24px',
            color: '#F5F3EE',
            letterSpacing: '-1px'
          }}>
            I'm Patrick Trues.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            lineHeight: '1.8',
            color: '#9CA3AF',
            marginBottom: '48px',
            maxWidth: '600px',
            fontWeight: '500'
          }}>
            I'm Patrick Trues, a software builder focused on AI automation and custom web solutions.
            <br /><br />
            By day, I build <a href="https://www.afroviaconnect.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9B7653', textDecoration: 'none', fontWeight: '700', cursor: 'pointer' }}>Afrovia</a>—a marketplace connecting African communities in Europe with verified service providers.
            <br /><br />
            By side, I help businesses automate workflows with AI and build custom websites that actually convert.
          </p>

          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '40px'
          }}>
            <button style={{
              background: 'linear-gradient(135deg, #9B7653 0%, #A0826D 100%)',
              color: '#080A0D',
              border: 'none',
              padding: '18px 42px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
              letterSpacing: '0.5px'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)';
            }}
            onClick={() => {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore My Work
            </button>
            <button style={{
              background: 'transparent',
              border: '2px solid #9B7653',
              color: '#9B7653',
              padding: '16px 40px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '0.5px'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#9B7653';
              e.currentTarget.style.color = '#080A0D';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#9B7653';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setShowModal(true)}>
              Work With Me
            </button>
          </div>
        </div>

        {/* Right: Animated Carousel */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px'
        }} className="hero-image">
          <div className="carousel-container">
            {/* Orbiting provider images - Diverse */}
            <div className="orbit-item">
              <img src="/chef.jpg" alt="Black Male Provider" />
            </div>
            <div className="orbit-item">
              <img src="/barber.jpg" alt="Black Female Provider" />
            </div>
            <div className="orbit-item">
              <img src="/doctotr.jpg" alt="White Female Provider" />
            </div>
            <div className="orbit-item">
              <img src="/engineer.jpg" alt="White Male Provider" />
            </div>

            {/* Center image */}
            <div className="carousel-center">
              <img src="/photo.jpg" alt="Trues" />
            </div>
          </div>
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
              color: '#9B7653',
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
              <strong style={{ color: '#9B7653' }}>What it does:</strong>
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
              <div style={{ color: '#9B7653', fontWeight: '600', marginBottom: '8px' }}>Provider Network</div>
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
              <div style={{ color: '#C8A882', fontWeight: '600', marginBottom: '8px' }}>European Reach</div>
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
              <div style={{ color: '#9B7653', fontWeight: '600', marginBottom: '8px' }}>Trust System</div>
              <div style={{ fontSize: '14px', color: '#9CA3AF' }}>Ratings and verification</div>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <a href="https://www.afroviaconnect.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              color: '#9B7653',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px 24px',
              border: '1px solid #9B7653',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'transparent'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#9B7653';
              e.currentTarget.style.color = '#080A0D';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#9B7653';
            }}>
              Explore Afrovia →
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section-padding" style={{
        padding: '80px 40px',
        background: '#11151B',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            {/* Years Experience */}
            <div style={{
              background: '#080A0D',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                📚
              </div>
              <div style={{
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontWeight: '700',
                color: '#C8A882',
                marginBottom: '8px'
              }}>
                3+
              </div>
              <div style={{
                fontSize: '16px',
                color: '#9CA3AF',
                fontWeight: '500'
              }}>
                Years experience
              </div>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #C8A882 0%, transparent 100%)',
                margin: '12px auto 0'
              }} />
            </div>

            {/* Projects */}
            <div style={{
              background: '#080A0D',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                🎯
              </div>
              <div style={{
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontWeight: '700',
                color: '#C8A882',
                marginBottom: '8px'
              }}>
                30+
              </div>
              <div style={{
                fontSize: '16px',
                color: '#9CA3AF',
                fontWeight: '500'
              }}>
                Projects shipped
              </div>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #C8A882 0%, transparent 100%)',
                margin: '12px auto 0'
              }} />
            </div>

            {/* Clients */}
            <div style={{
              background: '#080A0D',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.1)'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                😊
              </div>
              <div style={{
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontWeight: '700',
                color: '#C8A882',
                marginBottom: '8px'
              }}>
                25+
              </div>
              <div style={{
                fontSize: '16px',
                color: '#9CA3AF',
                fontWeight: '500'
              }}>
                Happy clients
              </div>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #C8A882 0%, transparent 100%)',
                margin: '12px auto 0'
              }} />
            </div>
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
              color: '#9B7653',
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
                e.currentTarget.style.borderColor = '#9B7653';
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
              color: '#C8A882',
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
                  color: '#C8A882',
                  fontWeight: '500'
                }}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-padding" style={{
        padding: '100px 40px',
        background: '#11151B',
        borderTop: '1px solid rgba(255, 107, 53, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: '700',
            color: '#F5F3EE',
            marginBottom: '60px',
            textAlign: 'center'
          }}>
            <span style={{ color: '#080A0D' }}>Featured </span>
            <span style={{ color: '#C8A882' }}>projects</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {/* Project 1 - Afrovia */}
            <div style={{
              background: '#080A0D',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.1)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.1)';
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#F5F3EE',
                marginBottom: '12px'
              }}>
                Afrovia
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#9CA3AF',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                Marketplace connecting African diaspora in Europe with verified service providers
              </p>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>React</span>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>Node.js</span>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>Supabase</span>
              </div>
              <a href="https://www.afroviaconnect.com" target="_blank" rel="noopener noreferrer" style={{
                fontSize: '14px',
                color: '#9B7653',
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                View project →
              </a>
            </div>

            {/* Project 2 - AI Automation */}
            <div style={{
              background: '#080A0D',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.1)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.1)';
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#F5F3EE',
                marginBottom: '12px'
              }}>
                AI Workflow Automation
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#9CA3AF',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                Custom n8n workflows that automate business processes and save thousands in manual work
              </p>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>n8n</span>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>OpenAI</span>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>ManyChat</span>
              </div>
              <button onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} style={{
                fontSize: '14px',
                color: '#9B7653',
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0
              }}>
                View project →
              </button>
            </div>

            {/* Project 3 - Web Development */}
            <div style={{
              background: '#080A0D',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.1)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.1)';
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#F5F3EE',
                marginBottom: '12px'
              }}>
                Custom Web Apps
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#9CA3AF',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                Modern, fast, and conversion-focused web applications built with React and Next.js
              </p>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>Next.js</span>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>React</span>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'rgba(216, 155, 50, 0.1)',
                  color: '#C8A882',
                  borderRadius: '6px'
                }}>Tailwind</span>
              </div>
              <button onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} style={{
                fontSize: '14px',
                color: '#9B7653',
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0
              }}>
                View project →
              </button>
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
                e.currentTarget.style.borderColor = '#9B7653';
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
              background: '#9B7653',
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
            onClick={() => setShowModal(true)}>
              Let's Build It
            </button>
            <a href="https://www.instagram.com/innerforge0/" target="_blank" rel="noopener noreferrer" style={{
              background: 'transparent',
              color: '#9B7653',
              border: '2px solid #9B7653',
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
              e.currentTarget.style.background = '#9B7653';
              e.currentTarget.style.color = '#080A0D';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#9B7653';
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
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#9B7653', textTransform: 'uppercase', marginBottom: '16px' }}>
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
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#9B7653'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → YouTube
                </a>
                <a href="https://www.instagram.com/innerforge0/" target="_blank" rel="noopener noreferrer" style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#9B7653'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Instagram
                </a>
                <a href="mailto:patrickaiya3@gmail.com" style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#9B7653'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Email: patrickaiya3@gmail.com
                </a>
                <a href="https://wa.me/41779131342" target="_blank" rel="noopener noreferrer" style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#9B7653'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → WhatsApp: +41 77 913 1342
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#C8A882', textTransform: 'uppercase', marginBottom: '16px' }}>
                Projects
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <a href="https://www.afroviaconnect.com" target="_blank" rel="noopener noreferrer" style={{
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#C8A882'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Afrovia
                </a>
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
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#C8A882'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}>
                  → Web Projects
                </button>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#9B7653', textTransform: 'uppercase', marginBottom: '16px' }}>
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
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#9B7653'}
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
                }} onMouseEnter={(e) => e.currentTarget.style.color = '#9B7653'}
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
            <p style={{ margin: '8px 0 0 0' }}>© 2026 Patrick Trues. Building digital products & AI automation systems.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
