import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import {
  Calendar,
  Clock,
  Palette,
  Upload,
  CloudUpload,
  File,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// 14. Date Picker Simulator
export const DatePickerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [selectedDay, setSelectedDay] = useState(24);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <label className="text-slate-300 font-semibold">DEPLOYMENT_CALENDAR</label>
        <span className="text-[10px] text-cyan-400">NOV 2026</span>
      </div>

      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border"
      >
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-300">
          <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-3.5 h-3.5" /></button>
          <span className="font-bold">NOVEMBER 2026</span>
          <button className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-3.5 h-3.5" /></button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-500 mb-2">
          {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isSel = day === selectedDay;
            return (
              <button
                key={day}
                onClick={() => {
                  sound.playBlip(1200 + day * 10);
                  setSelectedDay(day);
                }}
                className={`py-1.5 rounded transition-all ${
                  isSel
                    ? 'font-bold text-black shadow-glow-cyan'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: isSel ? customizations.primaryColor : 'transparent',
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 15. Time Picker Simulator
export const TimePickerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [hour, setHour] = useState(20);
  const [minute, setMinute] = useState(45);
  const [isPm, setIsPm] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        LAUNCH_WINDOW_TIME
      </label>

      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border flex items-center justify-around font-mono"
      >
        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 mb-1">HOURS</span>
          <div className="text-2xl font-bold text-white bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
            {hour.toString().padStart(2, '0')}
          </div>
        </div>

        <span className="text-2xl text-cyan-400 font-bold">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 mb-1">MINUTES</span>
          <div className="text-2xl font-bold text-white bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
            {minute.toString().padStart(2, '0')}
          </div>
        </div>

        {/* AM/PM Switcher */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => {
              sound.playHover();
              setIsPm(false);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              !isPm ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-500'
            }`}
          >
            AM
          </button>
          <button
            onClick={() => {
              sound.playHover();
              setIsPm(true);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isPm ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-500'
            }`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};

// 16. Color Picker Simulator
export const ColorPickerSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations, updateCustomizations } = useStudio();
  const [hex, setHex] = useState(customizations.primaryColor || '#00e5ff');

  const swatches = ['#00e5ff', '#ff007f', '#7000ff', '#00ff66', '#ffb700', '#9BA8AB'];

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        ATMOSPHERIC_SPECTRAL_COLOR
      </label>

      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-4 border space-y-4"
      >
        {/* Color preview box */}
        <div 
          className="h-20 rounded-xl border flex items-center justify-center font-mono font-bold text-xs shadow-inner"
          style={{
            backgroundColor: hex,
            color: '#06141B',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {hex.toUpperCase()}
        </div>

        {/* Quick Swatches */}
        <div className="flex items-center justify-between gap-1.5">
          {swatches.map((c) => (
            <button
              key={c}
              onClick={() => {
                sound.playConfirm();
                setHex(c);
                updateCustomizations({ primaryColor: c });
              }}
              style={{ backgroundColor: c }}
              className={`w-7 h-7 rounded-lg border-2 transition-transform hover:scale-110 ${
                hex === c ? 'border-white shadow-glow-cyan' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 17. File Upload Simulator
export const FileUploadSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [fileName, setFileName] = useState('quantum_matrix_spec.json');

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-2">
      <label className="block text-xs font-mono text-slate-300 font-semibold">
        ATTACH_SCHEMATIC
      </label>

      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DE6',
          borderColor: '#253745',
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-3 border flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-cyan-400">
            <File className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-xs font-mono font-semibold text-white truncate">{fileName}</div>
            <div className="text-[10px] font-mono text-slate-400">1.4 MB • JSON FORMAT</div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playConfirm();
            setFileName('updated_manifest_2026.bin');
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-black shrink-0 transition-all"
          style={{ backgroundColor: customizations.primaryColor }}
        >
          REPLACE
        </button>
      </div>
    </div>
  );
};

// 18. Drag & Drop Upload Simulator
export const DragDropUploadSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [isOver, setIsOver] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          sound.playConfirm();
          setIsOver(false);
        }}
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: isOver ? '#06141B' : '#11212DE6',
          borderColor: isOver ? customizations.primaryColor : `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
          boxShadow: isOver ? `0 0 25px ${customizations.primaryColor}60` : 'none',
        }}
        className="p-8 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
      >
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border transition-transform group-hover:scale-110"
          style={{
            backgroundColor: '#06141B',
            borderColor: `${customizations.primaryColor}60`,
          }}
        >
          <CloudUpload className="w-6 h-6" style={{ color: customizations.primaryColor }} />
        </div>

        <h4 className="text-xs font-bold text-white mb-1 font-mono">
          DRAG & DROP TELEMETRY PAYLOAD
        </h4>
        <p className="text-[11px] text-slate-400 mb-3">
          Support for .json, .wasm, .glsl up to 100MB
        </p>

        <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400">
          OR CLICK TO BROWSE STORAGE
        </span>
      </div>
    </div>
  );
};

// 19. OTP Input Simulator
export const OtpInputSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [digits, setDigits] = useState(['8', '4', '2', '0', '9', '1']);

  const handleDigitChange = (index: number, val: string) => {
    sound.playBlip(1200 + index * 50);
    const newDigits = [...digits];
    newDigits[index] = val.slice(-1);
    setDigits(newDigits);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-1 space-y-3 text-center">
      <div>
        <label className="block text-xs font-mono text-slate-300 font-semibold">
          TWO-FACTOR_NEURAL_AUTH
        </label>
        <p className="text-[11px] text-slate-400 mt-0.5">Enter 6-digit confirmation key</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            style={{
              borderRadius: `${Math.max(4, customizations.borderRadius / 2)}px`,
              backgroundColor: '#06141BE6',
              borderColor: digit ? customizations.primaryColor : '#253745',
              borderWidth: `${customizations.borderWidth || 1}px`,
              boxShadow: digit ? `0 0 10px -2px ${customizations.primaryColor}80` : 'none',
              color: '#CCD0CF',
            }}
            className="w-10 h-12 text-center text-base font-mono font-bold outline-none border focus:border-cyan-400 transition-all"
          />
        ))}
      </div>

      <button
        onClick={() => sound.playConfirm()}
        className="text-[11px] font-mono text-cyan-400 hover:underline"
      >
        [RESEND TEMPORARY TOKEN]
      </button>
    </div>
  );
};
