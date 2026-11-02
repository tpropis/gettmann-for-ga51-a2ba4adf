export function playCircusHonk(context: AudioContext) {
  const now = context.currentTime;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.13, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
  gain.connect(context.destination);
  for (const frequency of [310, 415]) {
    const oscillator = context.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.linearRampToValueAtTime(frequency * 0.78, now + 0.3);
    oscillator.connect(gain);
    oscillator.start(now);
    oscillator.stop(now + 0.34);
    oscillator.onended = () => oscillator.disconnect();
  }
  window.setTimeout(() => gain.disconnect(), 450);
}