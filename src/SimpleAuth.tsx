import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { X, Mail, Lock, DollarSign, Gift } from 'lucide-react';

interface SimpleAuthProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const SimpleAuth: React.FC<SimpleAuthProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const savedRefCode = localStorage.getItem('referralCode');
    if (savedRefCode && !isLogin) {
      setReferralCode(savedRefCode.toUpperCase());
    }
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await (supabase as any)
          .from('users')
          .select('*')
          .eq('email', email.toLowerCase().trim())
          .eq('password', password)
          .single();

        if (result.error || !result.data) {
          setError('Invalid email or password');
          setLoading(false);
          return;
        }

        setSuccess('✅ Login successful! Welcome back!');
        setTimeout(() => onSuccess(result.data), 1000);
      } else {
        const cleanEmail = email.toLowerCase().trim();

        const existingResult = await (supabase as any)
          .from('users')
          .select('id')
          .eq('email', cleanEmail)
          .single();

        if (existingResult.data) {
          setError('Email already registered. Please login instead.');
          setLoading(false);
          return;
        }

        let referrerId: any = null;
        if (referralCode.trim()) {
          const referrerResult = await (supabase as any)
            .from('users')
            .select('id, referral_code')
            .eq('referral_code', referralCode.toUpperCase().trim())
            .single();

          if (referrerResult.data) {
            referrerId = referrerResult.data.id;
          } else {
            setError('Invalid referral code. Sign up anyway without it?');
          }
        }

        const signupResult = await (supabase as any)
          .from('users')
          .insert([
            {
              email: cleanEmail,
              password,
              referred_by: referrerId,
              balance: 1.00,
            },
          ])
          .select()
          .single();

        if (signupResult.error) {
          console.error('Signup error:', signupResult.error);
          setError('Signup failed. Please try again.');
          setLoading(false);
          return;
        }

        const newUser = signupResult.data;

        if (referrerId) {
          try {
            await (supabase as any).from('referrals').insert([
              {
                referrer_id: referrerId,
                referred_id: newUser.id,
                reward_paid: true,
              },
            ]);

            await (supabase as any).rpc('increment_balance', {
              user_id: referrerId,
              amount: 1.0,
            });

            setSuccess(`🎉 Account created! You got $1.00 signup bonus + $1.00 referral bonus = $2.00!`);
            newUser.balance = 2.00;
          } catch (refError) {
            console.error('Referral processing error:', refError);
            setSuccess('🎉 Account created! You got $1.00 signup bonus!');
          }
        } else {
          setSuccess('🎉 Account created! You got $1.00 signup bonus!');
        }

        localStorage.removeItem('referralCode');
        setTimeout(() => onSuccess(newUser), 2500);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '450px',
          width: '90%',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#8A8A8A',
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#5A5A5A',
              marginBottom: '8px',
            }}
          >
            {isLogin ? 'Welcome Back!' : 'Join Dibby'}
          </h2>
          {!isLogin && (
            <div
              style={{
                background: 'linear-gradient(135deg, #FFE5F8 0%, #FFF3E0 100%)',
                padding: '16px',
                borderRadius: '12px',
                marginTop: '16px',
                border: '2px solid #FFB84D',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                <DollarSign size={24} color="#FFB84D" />
                <span style={{ fontWeight: 700, color: '#5A5A5A', fontSize: '18px' }}>
                  Get $1.00 Instantly!
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#8A8A8A' }}>
                Plus earn $1 for every friend you refer
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#5A5A5A',
                fontSize: '14px',
              }}
            >
              <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #FFE5DB',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#5A5A5A',
                fontSize: '14px',
              }}
            >
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #FFE5DB',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              placeholder="Min 6 characters"
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: '#5A5A5A',
                  fontSize: '14px',
                  gap: '6px',
                }}
              >
                <Gift size={16} />
                Referral Code (Optional)
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#2E7D32',
                    marginLeft: '4px',
                  }}
                >
                  Get +$1 bonus!
                </span>
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                maxLength={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #FFE5DB',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 600,
                }}
                placeholder="ABC123"
              />
              <div style={{ fontSize: '11px', color: '#8A8A8A', marginTop: '4px' }}>
                6-character code from your friend
              </div>
            </div>
          )}

          {error && (
            <div
              style={{
                backgroundColor: '#FFE5E5',
                color: '#D32F2F',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                backgroundColor: '#E8F5E9',
                color: '#2E7D32',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#CCCCCC' : '#FFB84D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            {loading ? '⏳ Processing...' : isLogin ? 'Login' : '🎁 Sign Up & Get $1'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFB84D',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};
