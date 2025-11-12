import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = user.referral_code || 'LOADING';

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '70px',
        right: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '280px',
        zIndex: 999,
        border: '1px solid #ddd',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#333', fontWeight: 600, marginBottom: '4px' }}>
          {user.email}
        </div>
      </div>

      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Your Referral Code</div>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#FFB84D', letterSpacing: '2px', fontFamily: 'monospace', marginBottom: '8px' }}>
          {referralCode}
        </div>
        <button
          onClick={copyCode}
          style={{
            padding: '8px 12px',
            backgroundColor: copied ? '#2E7D32' : '#FFB84D',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Code</>}
        </button>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
          Share this code and earn $1 for each signup
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        Logout
      </button>
    </div>
  );
};
