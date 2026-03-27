import { useState } from 'react';
import { Link } from 'react-router';

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function getStrengthLabel(score: number) {
  if (score <= 1) return 'Weak';
  if (score <= 3) return 'Medium';
  return 'Strong';
}

function getStrengthColor(score: number) {
  if (score <= 1) return 'bg-red-500';
  if (score <= 3) return 'bg-yellow-400';
  return 'bg-green-500';
}

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const strength = getPasswordStrength(password);

  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6ff] via-white to-[#f5faff] px-4">

      {/* Glass Card (matches modern login style) */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Register to access BOCRA services
        </p>

        <form className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white/70 border border-white/40 outline-none focus:border-[#0095DA]"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/70 border border-white/40 outline-none focus:border-[#0095DA]"
            required
          />

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/70 border border-white/40 outline-none focus:border-[#0095DA]"
              required
            />

            {/* Strength */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="w-full h-2 bg-white/40">
                  <div
                    className={`h-2 transition-all ${getStrengthColor(strength)}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-gray-600">
                  Strength:{' '}
                  <span className="font-medium">
                    {getStrengthLabel(strength)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white/70 border border-white/40 outline-none focus:border-[#0095DA]"
            required
          />

          {/* Match indicator */}
          {confirmPassword && (
            <p
              className={`text-xs ${
                passwordsMatch ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#0095DA] text-white py-2 font-medium hover:bg-[#0077B3] transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-5 text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0095DA] font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}