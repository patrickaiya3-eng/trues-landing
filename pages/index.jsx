import React, { useState, useEffect } from 'react';

export default function LandingPage() {
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
    const email = formData.email;
    const message = `Name: ${formData.name}%0AEmail: ${email}%0AProject Type: ${formData.projectType}%0A%0AMessage:%0A${formData.message}`;
    window.location.href = `mailto:patrickaiya3@gmail.com?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(message)}`;
    setShowModal(false);
  };

  return (
    <div style={{ 
      background: '#0F172A',
      color: '#F5F3EE',
      minHeight: '100vh',
      fontFamily: 'inherit'
    }}>
      <style>{`
        * {
          scroll-behavior: smooth;
        }
        
        :root {
          --primary-teal: #06B6D4;
          --accent-cyan: #0EA5E9;
          --light-text: #F5F3EE;
          --muted-text: #9CA3AF;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 20px 60px rgba(6, 182, 212, 0.15);
          }
          50% { 
            box-shadow: 0 25px 70px rgba(6, 182, 212, 0.25);
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

        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpModal {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          background: radial-gradient(circle at 30% 30%, rgba(6,182,212,0.3), transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 10;
          box-shadow: 0 0 60px rgba(6, 182, 212, 0.2);
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        .carousel-center img {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #06B6D4;
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
          border: 2px solid #06B6D4;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
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
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeInModal 0.3s ease;
        }

        .modal-overlay.active {
          display: flex;
        }

        .modal-content {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 20px;
          padding: 48px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUpModal 0.3s ease;
          box-shadow: 0 20px 60px rgba(6, 182, 212, 0.1);
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
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #06B6D4;
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
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.2);
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
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.2);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-select option {
          background: #0F172A;
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
          background: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%);
          color: #0F172A;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
        }

        .form-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(6, 182, 212, 0.4);
        }

        .form-button:active {
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
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

          .modal-content {
            padding: 32px;
          }
        }
        
        button, a {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 480px) {
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

          .modal-content {
            padding: 24px;
            max-width: 95%;
          }
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
        background: `rgba(15, 23, 42, ${Math.min(scrollY / 100, 0.95)})`,
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(6, 182, 212, 0.1)' : 'none',
        zIndex: 1000,
        padding: '16px 20px',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#06B6D4' }}>Patrick Trues</div>
        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#work" style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Work</a>
          <a href="#services" style={{ color: '#F5F3EE', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }}>Services</a>
          <button style={{
            background: '#06B6D4',
            color: '#0F172A',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }} onClick={() => setShowModal(true)}>Work With Me</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '80px',
        padding: '80px 40px',
        position: 'relative',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%, #0F172A 100%)'
      }} className="hero-grid">
        {/* Left: Text */}
        <div style={{ position: 'relative', zIndex: 10 }} className="hero-text">
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#06B6D4',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '24px',
            opacity: 0.9
          }}>
            Software Builder
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
            By day, I build <a href="https://www.afroviaconnect.com" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4', textDecoration: 'none', fontWeight: '700', cursor: 'pointer' }}>Afrovia</a>—a marketplace connecting African communities in Europe with verified service providers.
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
              background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
              color: '#0F172A',
              border: 'none',
              padding: '18px 42px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
              letterSpacing: '0.5px'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
            }}
            onClick={() => {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore My Work
            </button>
            <button style={{
              background: 'transparent',
              border: '2px solid #06B6D4',
              color: '#06B6D4',
              padding: '16px 40px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '0.5px'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#06B6D4';
              e.currentTarget.style.color = '#0F172A';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#06B6D4';
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
            {/* Orbiting diverse provider images */}
            <div className="orbit-item">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" alt="Black Male Professional" />
            </div>
            <div className="orbit-item">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" alt="Black Female Professional" />
            </div>
            <div className="orbit-item">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop" alt="White Female Professional" />
            </div>
            <div className="orbit-item">
              <img src="https://images.unsplash.com/photo-1507051957259-fe2df1d68ecb?w=120&h=120&fit=crop" alt="White Male Professional" />
            </div>

            {/* Center image */}
            <div className="carousel-center">
              <img src="/photo.jpg" alt="Patrick Trues" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section-padding" style={{
        padding: '80px 40px',
        background: '#1E293B',
        borderTop: '1px solid rgba(6, 182, 212, 0.1)'
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
              background: '#0F172A',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(6, 182, 212, 0.1)'
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
                color: '#06B6D4',
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
                background: 'linear-gradient(90deg, #06B6D4 0%, transparent 100%)',
                margin: '12px auto 0'
              }} />
            </div>

            {/* Projects */}
            <div style={{
              background: '#0F172A',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(6, 182, 212, 0.1)'
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
                color: '#06B6D4',
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
                background: 'linear-gradient(90deg, #06B6D4 0%, transparent 100%)',
                margin: '12px auto 0'
              }} />
            </div>

            {/* Clients */}
            <div style={{
              background: '#0F172A',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(6, 182, 212, 0.1)'
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
                color: '#06B6D4',
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
                background: 'linear-gradient(90deg, #06B6D4 0%, transparent 100%)',
                margin: '12px auto 0'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding" style={{
        padding: '100px 40px',
        background: '#0F172A',
        borderTop: '1px solid rgba(6, 182, 212, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: '700',
            color: '#F5F3EE',
            marginBottom: '60px',
            textAlign: 'center'
          }}>
            What I Offer
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {[
              { title: 'AI Automation', desc: 'Design and build custom workflows for your business.' },
              { title: 'Web & WebApp Development', desc: 'Modern websites and applications built for growth.' },
              { title: 'AI Automation Learning', desc: 'Hands-on guidance to build your own automations.' }
            ].map((service, i) => (
              <div key={i} style={{
                background: '#1E293B',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid rgba(6, 182, 212, 0.1)',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.1)';
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#F5F3EE', marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: '1.6' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="section-padding" style={{
        padding: '60px 40px',
        background: '#0F172A',
        borderTop: '1px solid rgba(6, 182, 212, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#9CA3AF', marginBottom: '24px' }}>Built with intent. No templates. No shortcuts.</p>
          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>© 2026 Patrick Trues. Building digital products & AI automation systems. | Email: patrickaiya3@gmail.com | WhatsApp: +41 77 913 1342</p>
        </div>
      </section>

    </div>
  );
}
