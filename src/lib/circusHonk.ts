// Squeeze-bulb clown honk synthesized with Web Audio: two short reedy pulses
// ("honk-honk") with a downward pitch bend, filtered to sound like a rubber horn.
// No external audio files, per the origin-local Web Audio rule.

export function playCircusHonk(context: AudioContext) {
  const now = context.currentTime;

  const master = context.createGain();
  master.gain.value = 0.9;

  // Reedy, buzzy timbre: band-limited so it reads as a rubber bulb horn.
  const tone = context.createBiquadFilter();
  tone.type = "bandpass";
  tone.frequency.value = 700;
  tone.Q.value = 1.4;
  const honkShape = context.createBiquadFilter();
  honkShape.type = "lowpass";
  honkShape.frequency.value = 2600;
  honkShape.Q.value = 0.7;

  tone.connect(honkShape).connect(master).connect(context.destination);

  // Two pulses: a short "h" lead-in and the main honk.
  const pulses = [
    { start: 0, duration: 0.1, gain: 0.06, from: 480, to: 420 },
    { start: 0.13, duration: 0.32, gain: 0.16, from: 420, to: 255 },
  ];

  const stops: OscillatorNode[] = [];
  for (const pulse of pulses) {
    const t0 = now + pulse.start;
    const end = t0 + pulse.duration;

    const env = context.createGain();
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(pulse.gain, t0 + 0.015);
    env.gain.setTargetAtTime(pulse.gain * 0.85, t0 + 0.05, 0.05);
    env.gain.exponentialRampToValueAtTime(0.001, end);
    env.connect(tone);

    // Reedy buzz: base tone + its fifth, slightly detuned like a real bulb horn.
    for (const detune of [0, 7]) {
      const oscillator = context.createOscillator();
      oscillator.type = "square";
      oscillator.detune.value = detune * 10;
      oscillator.frequency.setValueAtTime(pulse.from, t0);
      oscillator.frequency.exponentialRampToValueAtTime(pulse.to, end);
      oscillator.connect(env);
      oscillator.start(t0);
      oscillator.stop(end + 0.05);
      oscillator.onended = () => oscillator.disconnect();
      stops.push(oscillator);
    }
  }

  const lastEnd = now + pulses[pulses.length - 1].start + pulses[pulses.length - 1].duration;
  window.setTimeout(() => master.disconnect(), Math.max(0, (lastEnd - context.currentTime + 0.1) * 1000));
  void stops;
}
