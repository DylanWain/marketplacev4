import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { DollarSign, Users, Copy, Check, LogOut, Gift, Share2 } from 'lucide-react';

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const [stats, setStats] = useState({ total_referrals: 0, total_earned: 0 });
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const isMobile = window.innerWidth < 768;

  const referralLink = `${window.location.origin}?ref=${user.referral_code}`;
  const referralCode = user.referral_code || 'LOADING';

  useEffect(() => {
    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [user.id]);

  const loadStats = async () => {
    try {
      // @ts-ignore - Supabase typesconst { data }: any = await supabase.rpc('get_user_stats', { user_id: user.id });
      if (data && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Dibby and Get $1!',
          text: `Use my code ${referralCode} to get $1 when you sign up!`,
          url: referralLink,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      copyReferralLink();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: isMobile ? '60px' : '70px',
        right: '20px',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        minWidth: isMobile ? '300px' : '360px',
        maxWidth: isMobile ? '90vw' : '400px',
        zIndex: 999,
        border: '2px solid #FFE5DB',
      }}
    >
      {/* User Header */}
      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #FFE5DB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#8A8A8A', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Balance
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                lineHeight: 1,
              }}
            >
              <DollarSign size={28} />
              {user.balance?.toFixed(2) || '0.00'}
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: '10px 16px',
              backgroundColor: '#FFE5DB',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#5A5A5A',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFD5C4')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFE5DB')}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
        <div style={{ fontSize: '13px', color: '#8A8A8A', marginTop: '8px', wordBreak: 'break-all' }}>
          {user.email}
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE5DB 100%)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #FFB84D',
          }}
        >
          <Users size={24} color="#FFB84D" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#5A5A5A' }}>
            {stats.total_referrals}
          </div>
          <div style={{ fontSize: '12px', color: '#8A8A8A', fontWeight: 600 }}>
            Referrals
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '2px solid #2E7D32',
          }}
        >
          <Gift size={24} color="#2E7D32" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#2E7D32' }}>
            ${stats.total_earned?.toFixed(2) || '0.00'}
          </div>
          <div style={{ fontSize: '12px', color: '#8A8A8A', fontWeight: 600 }}>
            Earned
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FFE5F8 0%, #FFF3E0 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '3px dashed #FFB84D',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#5A5A5A',
            marginBottom: '12px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          🎁 Your Referral Code
        </div>

        {/* Large Referral Code Display */}
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid #FFB84D',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#FFB84D',
              letterSpacing: '4px',
              fontFamily: 'monospace',
            }}
          >
            {referralCode}
          </div>
          <button
            onClick={copyReferralCode}
            style={{
              marginTop: '8px',
              padding: '8px 16px',
              backgroundColor: copiedCode ? '#2E7D32' : '#FFB84D',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'background-color 0.3s',
            }}
          >
            {copiedCode ? (
              <>
                <Check size={16} /> Copied!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy Code
              </>
            )}
          </button>
        </div>

        {/* Share Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={copyReferralLink}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: copiedLink ? '#2E7D32' : 'white',
              border: '2px solid #FFB84D',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: copiedLink ? 'white' : '#5A5A5A',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.3s',
            }}
          >
            {copiedLink ? (
              <>
                <Check size={16} /> Link Copied!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy Link
              </>
            )}
          </button>

          <button
            onClick={shareReferral}
            style={{
              padding: '12px 16px',
              backgroundColor: '#FFB84D',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF9F2E')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFB84D')}
          >
            <Share2 size={16} />
            Share
          </button>
        </div>

        <div
          style={{
            fontSize: '11px',
            color: '#8A8A8A',
            marginTop: '12px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Share your code and earn <strong>$1.00</strong> for each friend who signs up!
        </div>
      </div>

      {/* Info Banner */}
      <div
        style={{
          backgroundColor: '#FFF8F5',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#8A8A8A',
          textAlign: 'center',
          border: '1px solid #FFE5DB',
        }}
      >
        💡 Cash out anytime via PayPal or bank transfer
      </div>
    </div>
  );
};
