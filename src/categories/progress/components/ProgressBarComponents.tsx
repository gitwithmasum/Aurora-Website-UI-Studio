import React, { useState } from 'react';
import { useStudio } from '../../../context/StudioContext';
import { sound } from '../../../utils/soundEngine';
import { Check, Upload, Clock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

// 3. Linear Progress Bar Simulator
export const LinearProgressBarSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [val, setVal] = useState(68);

  return (
    <div className="w-full max-w-sm mx-auto p-4 space-y-3 select-none">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-slate-300 font-bold">QUANTUM COMPILATION</span>
        <span style={{ color: customizations.primaryColor }} className="font-extrabold">{val}%</span>
      </div>

      <div className="relative w-full h-2.5 bg-[#06141B] rounded-full overflow-hidden border border-white/10 p-0.5">
        <div
          className="h-full rounded-full transition-all duration-500 relative"
          style={{
            width: `${val}%`,
            backgroundColor: customizations.primaryColor,
            boxShadow: `0 0 12px ${customizations.primaryColor}`,
          }}
        >
          {/* Laser head flare */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-glow-cyan" />
        </div>
      </div>

      <div className="flex justify-between text-[10px] font-mono text-slate-500">
        <span>ETA: 00:04 SEC</span>
        <span>42 / 64 MODULES</span>
      </div>
    </div>
  );
};

// 8. Upload Progress Simulator
export const UploadProgressSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [progress, setProgress] = useState(82);

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white font-mono truncate">
              telemetry_payload.bin
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400">{progress}%</span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 bg-[#06141B] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: customizations.primaryColor,
              boxShadow: `0 0 10px ${customizations.primaryColor}`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>82.4 MB / 100 MB</span>
          <span className="text-emerald-400 font-bold">14.2 MB/s</span>
        </div>
      </div>
    </div>
  );
};

// 9. Step Progress Indicator Simulator
export const StepProgressIndicatorSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [currentStep, setCurrentStep] = useState(2);

  const steps = ['Clearance', 'Neural Link', 'Deployment', 'Verification'];

  return (
    <div className="w-full max-w-sm mx-auto p-2">
      <div className="flex items-center justify-between relative mb-3">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={idx}
              onClick={() => {
                sound.playBlip(1200 + idx * 80);
                setCurrentStep(stepNum);
              }}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-black'
                    : isCurrent
                    ? 'shadow-glow-cyan text-black font-extrabold'
                    : 'bg-[#11212D] text-slate-500 border border-white/20'
                }`}
                style={{
                  backgroundColor: isCurrent ? customizations.primaryColor : undefined,
                }}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <span className="text-xs font-mono font-bold text-white">
          STEP {currentStep}: {steps[currentStep - 1]?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

// 10. Multi-step Progress Bar Simulator
export const MultiStepProgressBarSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();
  const [activeStage, setActiveStage] = useState(3);

  return (
    <div className="w-full max-w-sm mx-auto p-2 space-y-2">
      <div className="flex justify-between text-xs font-mono text-slate-300">
        <span>MISSION PIPELINE</span>
        <span className="text-cyan-400">PHASE {activeStage} OF 4</span>
      </div>

      {/* 4 Segmented Bars */}
      <div className="grid grid-cols-4 gap-1.5 h-2">
        {[1, 2, 3, 4].map((stage) => {
          const isFilled = stage <= activeStage;
          return (
            <div
              key={stage}
              onClick={() => {
                sound.playBlip(1200 + stage * 50);
                setActiveStage(stage);
              }}
              className="rounded-full cursor-pointer transition-all"
              style={{
                backgroundColor: isFilled ? customizations.primaryColor : '#253745',
                boxShadow: isFilled ? `0 0 8px ${customizations.primaryColor}80` : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// 13. Timeline Progress Simulator
export const TimelineProgressSimulator: React.FC<{ variantId: string }> = ({ variantId }) => {
  const { customizations } = useStudio();

  const events = [
    { title: 'Core Firmware Flashed', time: '14:20:00', status: 'done' },
    { title: 'Sub-atomic Handshake', time: '14:22:15', status: 'done' },
    { title: 'Deploying Edge Ingress', time: '14:23:40', status: 'active' },
    { title: 'Global Mesh Validation', time: 'PENDING', status: 'pending' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-1">
      <div
        style={{
          borderRadius: `${customizations.borderRadius}px`,
          backgroundColor: '#11212DF8',
          borderColor: `${customizations.primaryColor}50`,
          borderWidth: `${customizations.borderWidth || 1}px`,
        }}
        className="p-5 border space-y-3 font-mono text-xs"
      >
        <div className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider mb-2">
          AUDIT TRAIL TIMELINE
        </div>

        {events.map((ev, i) => (
          <div key={i} className="flex items-start gap-3 relative">
            {i !== events.length - 1 && (
              <div className="absolute left-2 top-4 bottom-0 w-0.5 bg-white/10" />
            )}

            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 z-10 ${
                ev.status === 'done'
                  ? 'bg-emerald-400 text-black'
                  : ev.status === 'active'
                  ? 'bg-cyan-400 text-black animate-pulse shadow-glow-cyan'
                  : 'bg-slate-700 text-slate-500'
              }`}
            >
              {ev.status === 'done' && <Check className="w-2.5 h-2.5" />}
            </div>

            <div className="flex-1 flex items-center justify-between">
              <span className={ev.status === 'active' ? 'text-white font-bold' : 'text-slate-400'}>
                {ev.title}
              </span>
              <span className="text-[10px] text-slate-500">{ev.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
