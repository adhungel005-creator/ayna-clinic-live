import React from 'react';

export default function Footer() {
  return (
    <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <p>© 2026 Ayna Clinic. Professional Care You Can Trust.</p>
      <a href="?employee=true" style={{ fontSize: '0.8rem', color: 'var(--primary-green)', textDecoration: 'none' }}>
        Employee Portal Login
      </a>
    </footer>
  );
}
