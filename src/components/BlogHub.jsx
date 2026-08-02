import React from 'react';
import { motion } from 'framer-motion';

const posts = [
  {
    id: 1,
    title: 'The Ultimate Post-Laser Care Routine',
    category: 'Treatment Care',
    excerpt: 'Ensure maximum results and minimal downtime after your laser hair removal session with these 5 essential tips.',
    date: 'August 12, 2026',
    image: '/assets/images/ayna.jpg' // Using fallback image
  },
  {
    id: 2,
    title: 'Why Vitamin C is a Must-Have in Summer',
    category: 'Skincare Advice',
    excerpt: 'Protect your skin against UV damage and pigmentation by incorporating a potent Vitamin C serum into your morning regimen.',
    date: 'July 28, 2026',
    image: '/assets/images/hero-bg.jpg'
  },
  {
    id: 3,
    title: 'Acne Scars vs. Pigmentation: Whats the Difference?',
    category: 'Education',
    excerpt: 'Understanding your skin condition is the first step. Learn how our dermatologists diagnose and treat different types of marks.',
    date: 'July 15, 2026',
    image: '/assets/images/about.jpg'
  }
];

export default function BlogHub() {
  return (
    <section id="blog" style={{ padding: '80px 0', backgroundColor: 'var(--bg-premium)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ color: 'var(--text-dark)', fontSize: '2.5rem', marginBottom: '15px' }}>Skincare Resource Hub</h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto' }}>Expert advice, treatment guides, and dermatological insights directly from Dr. Baaniya and the Ayna Clinic team.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {posts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="blog-img" />
              </div>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-green)', textTransform: 'uppercase', letterSpacing: '1px' }}>{post.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-body)' }}>{post.date}</span>
                </div>
                <h3 style={{ color: 'var(--text-dark)', fontSize: '1.3rem', marginBottom: '15px', lineHeight: '1.4' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>{post.excerpt}</p>
                <a href="#blog" style={{ color: 'var(--primary-green)', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Read Article <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#blog" className="btn-premium btn-inline">View All Articles</a>
        </div>
      </div>
    </section>
  );
}
