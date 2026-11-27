import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  CreditCard, 
  Sparkles, 
  Plus, 
  Search, 
  Bell, 
  Check, 
  ChevronDown, 
  Building2, 
  Code, 
  Flame, 
  Moon, 
  Sun, 
  Share2, 
  Download, 
  Terminal, 
  X,
  Laptop
} from 'lucide-react';
import { CustomizationSettings } from '../../../types/studio';
import { getComponentStyles } from '../../../utils/styleHelper';
import { sound } from '../../../utils/soundEngine';

interface ProfileProps {
  settings: CustomizationSettings;
  variantId: string;
}

// 23. PROFILE NAVIGATION
export const ProfileNavigationComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [settingsActive, setSettingsActive] = useState(false);
  const styles = getComponentStyles(settings);

  return (
    <div className="w-full max-w-sm flex flex-col items-center relative">
      <div 
        style={styles.container}
        className="flex items-center gap-3 p-2.5 px-4 rounded-2xl border shadow-xl backdrop-blur-xl"
      >
        {/* Avatar with beacon */}
        <div className="relative">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner ring-2 ring-cyan-500/30"
            style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})` }}
          >
            VX
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
        </div>

        {/* User Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs">Vesper X</span>
            <span 
              className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold"
              style={{ backgroundColor: `${settings.primaryColor}20`, color: settings.primaryColor }}
            >
              CHIEF ARCHITECT
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] opacity-60 font-mono mt-0.5">
            <span>PING: 14ms</span>
            <span>•</span>
            <span className="text-emerald-400">SESSION: ACTIVE</span>
          </div>
        </div>

        {/* Settings button */}
        <button 
          onClick={() => {
            sound.playHover();
            setSettingsActive(!settingsActive);
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            settingsActive ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-white/10 opacity-70 hover:opacity-100'
          }`}
          title="Quick Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {settingsActive && (
        <div className="absolute top-16 w-64 p-3 rounded-2xl bg-[#070b1a]/95 border border-cyan-400/40 shadow-2xl backdrop-blur-2xl z-50 text-xs animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
            <span className="font-bold text-cyan-300">Vesper System Controls</span>
            <button onClick={() => setSettingsActive(false)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div>Encrypted Key: 0x99A...E8</div>
            <div className="text-emerald-400 font-mono">Sync Status: Fully Linked</div>
          </div>
        </div>
      )}
    </div>
  );
};

// 24. PROFILE DROPDOWN
export const ProfileDropdownComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const styles = getComponentStyles(settings);

  const handleAction = (label: string) => {
    sound.playConfirm();
    setFeedbackMsg(`${label} Activated ✓`);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center relative">
      <button 
        onClick={() => {
          sound.playHover();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs mb-3 font-medium transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-[10px]">
          DR
        </div>
        <span>Dr. Vance</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {feedbackMsg && (
        <div className="absolute top-10 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono mb-2 animate-in fade-in z-50">
          {feedbackMsg}
        </div>
      )}

      {isOpen && (
        <div 
          style={styles.container}
          className="w-72 border rounded-2xl shadow-2xl p-2 space-y-2 animate-in fade-in zoom-in-95 backdrop-blur-2xl"
        >
          {/* Header Info */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white">
              DR
            </div>
            <div>
              <div className="font-bold text-xs">Dr. Vance Sterling</div>
              <div className="text-[10px] opacity-60">vance@nexus.network</div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Quantum Pro Tier</div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-0.5 text-xs">
            <button 
              onClick={() => handleAction('Personal Profile')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
            >
              <User className="w-3.5 h-3.5 opacity-70" />
              <span>Personal Profile</span>
            </button>
            <button 
              onClick={() => handleAction('Security & 2FA Keys')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
            >
              <Shield className="w-3.5 h-3.5 opacity-70" />
              <span>Security & 2FA Keys</span>
            </button>
            <button 
              onClick={() => handleAction('Billing & Plan Usage')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 opacity-70" />
              <span>Billing & Plan Usage</span>
            </button>
            <button 
              onClick={() => handleAction('Studio Preferences')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
            >
              <Settings className="w-3.5 h-3.5 opacity-70" />
              <span>Studio Preferences</span>
            </button>
          </div>

          <div className="pt-2 border-t border-white/10">
            <button 
              onClick={() => handleAction('Session Terminated')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-500/20 text-rose-400 text-left transition-colors text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 25. QUICK ACTION MENU
export const QuickActionMenuComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [expanded, setExpanded] = useState(true);

  const actions = [
    { label: 'New Project', icon: Plus, color: '#06b6d4' },
    { label: 'Deploy Edge', icon: Sparkles, color: '#3b82f6' },
    { label: 'Import Repo', icon: Download, color: '#10b981' },
    { label: 'Share Link', icon: Share2, color: '#f59e0b' },
  ];

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative flex flex-col items-center">
        {/* Expanded speed dial actions */}
        {expanded && (
          <div className="mb-3 space-y-2 flex flex-col items-center animate-in fade-in slide-in-from-bottom-3 duration-200">
            {actions.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.label} className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/15 text-[11px] font-medium text-white shadow-xl whitespace-nowrap">
                    {act.label}
                  </span>
                  <button 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-black shadow-lg transition-transform hover:scale-110 active:scale-95"
                    style={{ backgroundColor: act.color, boxShadow: `0 0 15px ${act.color}80` }}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Primary Action Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
          style={{ 
            backgroundColor: settings.primaryColor,
            color: '#000000',
            boxShadow: `0 0 25px ${settings.primaryColor}80`,
            transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
          aria-label="Toggle Quick Action Menu"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      </div>

      <span className="text-[11px] opacity-50 mt-4 font-mono">
        Floating Speed Dial action trigger with radial/vertical stack
      </span>
    </div>
  );
};

// 26. SEARCH BAR
export const SearchBarComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const styles = getComponentStyles(settings);

  const mockResults = [
    { title: 'Cluster Gateway Protocol', cat: 'Docs' },
    { title: 'Zero-Trust SSL Rotation', cat: 'Security' },
    { title: 'Kubernetes Pod Autoscaler', cat: 'Compute' },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-lg relative">
      <div 
        style={styles.container}
        className={`w-full flex items-center gap-2.5 border rounded-xl transition-all shadow-md ${
          focused ? 'ring-2 ring-cyan-500/50 border-cyan-400' : ''
        }`}
      >
        <Search className="w-4 h-4 text-cyan-400 shrink-0" />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search components, tokens, APIs..."
          className="w-full bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery('')} className="p-1 hover:bg-white/10 rounded">
            <X className="w-3.5 h-3.5 opacity-60" />
          </button>
        )}
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono opacity-60 shrink-0">
          ⌘K
        </kbd>
      </div>

      {/* Autocomplete dropdown */}
      {focused && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-xl bg-slate-900 border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono opacity-60">
            <span>RECENT QUERIES & SUGGESTIONS</span>
            <button onClick={() => setFocused(false)} className="hover:underline">Close</button>
          </div>
          <div className="mt-2 space-y-1">
            {mockResults.length === 0 ? (
              <div className="py-2 text-center text-xs opacity-50">No results found for "{query}"</div>
            ) : (
              mockResults.map((res) => (
                <div 
                  key={res.title} 
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer"
                >
                  <span>{res.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 font-mono opacity-50">{res.cat}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 27. NOTIFICATION MENU
export const NotificationMenuComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState<'all' | 'alerts' | 'deploy'>('all');
  const [clearedAll, setClearedAll] = useState(false);
  const styles = getComponentStyles(settings);

  const initialNotifications = [
    { id: '1', title: 'Critical CPU spike detected on Node-04', time: '2m ago', type: 'alerts', unread: true },
    { id: '2', title: 'New build deployed to staging (commit #e4f9b)', time: '14m ago', type: 'deploy', unread: true },
    { id: '3', title: 'Database snapshot backed up to AWS S3', time: '1h ago', type: 'all', unread: false },
  ];

  const notifications = initialNotifications.map(n => clearedAll ? { ...n, unread: false } : n);
  const filtered = notifications.filter(n => filter === 'all' || n.type === filter);
  const unreadTotal = notifications.filter(n => n.unread).length;

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <button
        onClick={() => {
          sound.playHover();
          setIsOpen(!isOpen);
        }}
        className="relative px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 mb-3 transition-colors"
      >
        <Bell className="w-4 h-4 text-cyan-400" />
        <span>Notifications</span>
        {unreadTotal > 0 && (
          <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-black text-[10px] font-bold">
            {unreadTotal}
          </span>
        )}
      </button>

      {isOpen && (
        <div 
          style={styles.container}
          className="w-80 border rounded-2xl shadow-2xl p-3 space-y-2.5 animate-in fade-in zoom-in-95 backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-xs">Activity Feed</span>
            <div className="flex gap-1">
              {(['all', 'alerts', 'deploy'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    sound.playBlip(1200);
                    setFilter(f);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-colors ${
                    filter === f ? 'bg-cyan-500 text-black font-bold' : 'opacity-60 hover:opacity-100 text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto text-xs">
            {filtered.map((n) => (
              <div 
                key={n.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  n.unread ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-white/5 border-white/5 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-[11px] leading-snug">{n.title}</div>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-0.5" />}
                </div>
                <div className="text-[9px] opacity-50 font-mono mt-1">{n.time}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 text-center">
            <button 
              onClick={() => {
                sound.playConfirm();
                setClearedAll(true);
              }}
              className="text-[11px] text-cyan-400 hover:underline font-mono"
            >
              {clearedAll ? 'All notifications cleared ✓' : 'Mark all as read'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 28. ACCOUNT SWITCHER
export const AccountSwitcherComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [selected, setSelected] = useState('nexus-corp');
  const [isOpen, setIsOpen] = useState(true);
  const [workspaceCreatedMsg, setWorkspaceCreatedMsg] = useState(false);
  const styles = getComponentStyles(settings);

  const workspaces = [
    { id: 'nexus-corp', name: 'Nexus Core Systems', plan: 'Enterprise', members: 42 },
    { id: 'quantum-labs', name: 'Quantum Research Labs', plan: 'Team', members: 8 },
    { id: 'personal-sandbox', name: 'Personal Studio', plan: 'Free', members: 1 },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <button
        onClick={() => {
          sound.playHover();
          setIsOpen(!isOpen);
        }}
        className="w-64 flex items-center justify-between px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs mb-3 font-medium transition-colors"
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold truncate">
            {workspaces.find(w => w.id === selected)?.name}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          style={styles.container}
          className="w-64 border rounded-2xl shadow-2xl p-2 space-y-1.5 animate-in fade-in zoom-in-95 backdrop-blur-2xl text-xs"
        >
          <div className="px-2 py-1 text-[10px] font-mono uppercase opacity-50">
            Switch Organization
          </div>

          {workspaces.map((w) => {
            const isCurrent = selected === w.id;
            return (
              <button
                key={w.id}
                onClick={() => {
                  sound.playBlip(1200);
                  setSelected(w.id);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                  isCurrent ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300' : 'hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs">{w.name}</div>
                  <div className="text-[10px] opacity-60 font-mono">{w.plan} • {w.members} members</div>
                </div>
                {isCurrent && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10">
            <button 
              onClick={() => {
                sound.playScan();
                setWorkspaceCreatedMsg(true);
                setTimeout(() => setWorkspaceCreatedMsg(false), 2500);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-white/20 hover:border-cyan-400 text-xs opacity-70 hover:opacity-100 transition-all text-slate-200"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{workspaceCreatedMsg ? 'Workspace Provisioned ✓' : 'Create Workspace'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 29. USER STATUS & PRESENCE
export const UserStatusPresenceComponent: React.FC<ProfileProps> = ({ settings, variantId }) => {
  const [status, setStatus] = useState<'online' | 'coding' | 'dnd' | 'away'>('coding');

  const statuses = [
    { id: 'online', label: 'Online', color: '#10b981', note: 'Available for sync' },
    { id: 'coding', label: 'Deep Coding', color: '#06b6d4', note: 'Writing neural rust modules' },
    { id: 'dnd', label: 'Do Not Disturb', color: '#f43f5e', note: 'Mute alerts' },
    { id: 'away', label: 'Away / In VR', color: '#f59e0b', note: 'Idle for 15m' },
  ];

  const current = statuses.find(s => s.id === status)!;

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl w-full">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white">
              JD
            </div>
            <span 
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900"
              style={{ backgroundColor: current.color }}
            />
          </div>
          <div>
            <div className="font-bold text-xs text-white">Jane Developer</div>
            <div className="text-[11px] opacity-70 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.color }} />
              <span>{current.label}</span>
            </div>
          </div>
        </div>

        {/* Status choices */}
        <div className="mt-3 space-y-1.5">
          {statuses.map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id as any)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                status === s.id ? 'bg-white/10 border border-white/15' : 'hover:bg-white/5 opacity-70'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="font-medium">{s.label}</span>
              </div>
              <span className="text-[10px] opacity-50 font-mono">{s.note}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
