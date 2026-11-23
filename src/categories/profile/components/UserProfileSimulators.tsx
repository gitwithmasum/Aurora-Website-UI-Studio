import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  User,
  Shield,
  Key,
  Lock,
  QrCode,
  Github,
  Globe,
  Check,
  Settings,
  LogOut,
  ChevronDown,
  Layers,
  Award,
  Sparkles,
} from 'lucide-react';

export const AvatarSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [online, setOnline] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none font-mono">
      <div className="relative inline-block mb-3">
        <div
          className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-xl font-bold p-1 cursor-pointer"
          onClick={() => {
            sound.playHover();
            setOnline(!online);
          }}
          style={{
            borderColor: customizations.primaryColor,
            boxShadow: `0 0 20px -3px ${customizations.primaryColor}80`,
            background: `radial-gradient(circle, ${customizations.primaryColor}20, #06141B)`,
          }}
        >
          <span style={{ color: customizations.primaryColor }}>KV</span>
        </div>
        <span
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#06141B] ${
            online ? 'bg-emerald-400 shadow-glow-emerald animate-pulse' : 'bg-slate-500'
          }`}
        />
      </div>

      <h4 className="text-sm font-bold text-white">Cmdr. Kaelen Voss</h4>
      <p className="text-xs text-slate-400">@voss.aurora • Cyber Architect</p>
      <span className="text-[10px] text-cyan-400 mt-1 inline-block">CLICK AVATAR TO TOGGLE PRESENCE</span>
    </div>
  );
};

export const AvatarGroupSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center font-mono select-none">
      <div className="flex items-center justify-center -space-x-3 mb-3">
        {['KV', 'ER', 'AL', 'TX'].map((init, i) => (
          <div
            key={init}
            className="w-10 h-10 rounded-full border-2 border-[#11212D] bg-[#06141B] flex items-center justify-center text-xs font-bold text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
            style={{ borderColor: i === 0 ? customizations.primaryColor : undefined }}
          >
            {init}
          </div>
        ))}
        <div 
          className="w-10 h-10 rounded-full border-2 border-[#11212D] text-xs font-bold flex items-center justify-center text-black"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          +8
        </div>
      </div>
      <p className="text-xs text-slate-400">12 Operatives in Active Squad</p>
    </div>
  );
};

export const ProfileDropdownSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-3"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold">
            KV
          </div>
          <div>
            <div className="font-bold text-white">Cmdr. Kaelen Voss</div>
            <div className="text-[10px] text-slate-400">Clearance: Level 4 Pro</div>
          </div>
        </div>

        <div className="space-y-1">
          {['Operative Dossier', 'Neural Credentials', 'Workspace Telemetry', 'Sign Out'].map((item, i) => (
            <div
              key={i}
              onClick={() => sound.playHover()}
              className="p-2 rounded-lg hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 cursor-pointer transition-colors flex items-center justify-between"
            >
              <span>{item}</span>
              {i === 3 ? <LogOut className="w-3.5 h-3.5 text-rose-400" /> : <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TwoFactorAuthSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-1 font-mono text-xs">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-3 text-center"
      >
        <QrCode className="w-16 h-16 mx-auto text-cyan-400 p-2 border border-cyan-500/30 rounded-xl bg-black/60 shadow-glow-cyan" />
        <h4 className="font-bold text-white uppercase">AUTHENTICATOR APP 2FA</h4>
        <p className="text-[11px] text-slate-400">Scan QR matrix or enter manual key:</p>
        <div className="p-2 rounded bg-[#06141B] border border-white/10 text-cyan-300 font-bold tracking-widest text-[11px]">
          74AF - 99B2 - C440 - 110E
        </div>
      </div>
    </div>
  );
};

export const SocialProfileLinksSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  return (
    <div className="w-full max-w-sm mx-auto p-4 flex items-center justify-center gap-3">
      {[
        { name: 'Github', icon: Github },
        { name: 'Matrix', icon: Globe },
        { name: 'Vault', icon: Key },
        { name: 'Security', icon: Shield },
      ].map((s) => {
        const Icon = s.icon;
        return (
          <button
            key={s.name}
            onClick={() => sound.playBlip(1300)}
            className="w-10 h-10 rounded-xl bg-[#11212D] border border-white/10 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-md hover:scale-110"
            title={s.name}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};
