import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { X } from 'lucide-react';

interface SimpleAuthProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const SimpleAuth: React.FC<SimpleAuthProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedRefCode = localStorage.getItem('referralCode');
    if (savedRefCode && !isLogin) {
      setReferralCode(savedRefCode.toUpperCase());
    }
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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

        alert('Login successful!');
        setTimeout(() => onSuccess(result.data), 500);
      } else {
        const cleanEmail = email.toLowerCase().trim();

        const existingResult = await (supabase as any)
          .from('users')
          .select('id')
          .eq('email', cleanEmail)
          .single();

        if (existingResult.data) {
          setError('Email already registered');
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
          setError('Signup failed');
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

            newUser.balance = 2.00;
          } catch (refError) {
            console.error('Referral error:', refError);
          }
        }

        localStorage.removeItem('referralCode');
        alert(`Account created! You have $${newUser.balance.toFixed(2)}`);
        setTimeout(() => onSuccess(newUser), 500);
      }
    } catch (err) {
      setError('Something went wrong');
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
          borderRadius: '8px',
          padding: '32px',
          maxWidth: '400px',
          width: '90%',
          position: 'relative',
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
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {!isLogin && (
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            Get $1 for signing up. Earn $1 for each friend you refer.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
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
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                maxLength={6}
                placeholder="Optional"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  textTransform: 'uppercase',
                }}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Have a referral code? You'll both get $1!
              </small>
            </div>
          )}

          {error && (
            <div
              style={{
                backgroundColor: '#fee',
                color: '#c00',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '16px',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#FFB84D',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFB84D',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};
