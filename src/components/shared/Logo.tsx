import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: { container: 'w-10 h-10', inner: 'w-6 h-6', text: 'text-lg', dot: 'w-3 h-3' },
    md: { container: 'w-14 h-14', inner: 'w-10 h-10', text: 'text-3xl', dot: 'w-4 h-4' },
    lg: { container: 'w-20 h-20', inner: 'w-14 h-14', text: 'text-5xl', dot: 'w-6 h-6' }
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className={`${s.container} bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500`}>
          <div className={`${s.inner} bg-gradient-to-br from-white/90 to-white/70 rounded-xl flex items-center justify-center`}>
            <div className="text-transparent bg-gradient-to-br from-emerald-600 to-blue-600 bg-clip-text font-black text-xl">L</div>
          </div>
        </div>
        <div className={`absolute -top-1 -right-1 ${s.dot} bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce`}></div>
      </div>
      {showText && (
        <div>
          <h1 className={`${s.text} font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent`}>
            Lowbal
          </h1>
          {size !== 'sm' && <p className="text-sm text-gray-300 font-medium">AI-Powered Negotiation</p>}
        </div>
      )}
    </div>
  );
};

export default Logo;