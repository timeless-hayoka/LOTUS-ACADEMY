import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

interface TerminalLine {
  t: string;
  c: string;
}

const lines: TerminalLine[] = [
  {t:'$ nmap -sV 10.10.14.5', c:'prompt'},
  {t:'Starting scan...', c:'sys'},
  {t:'  WARNING: -sV without -p scans default ports only.', c:'err'},
  {t:'mentor › You\'re scanning blind. Last week you missed a service on 8080 doing exactly this.', c:'mentor'},
  {t:'mentor › Add -p- to sweep all ports. Want to try again?', c:'mentor'},
  {t:'$ nmap -sV -p- 10.10.14.5', c:'prompt'},
  {t:'  8080/tcp  open  http  (caught it this time)', c:'ok'},
  {t:'mentor › That\'s the one. Noted — you\'ve got full-port sweeps down now.', c:'mentor'},
];

export default function Landing() {
  const [typedLines, setTypedLines] = useState<TerminalLine[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [currentLineClass, setCurrentLineClass] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'good' | 'bad' | '', text: string }>({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: any;

    const typeLine = () => {
      if (lineIndex >= lines.length) {
        setIsCompleted(true);
        return;
      }

      const txt = lines[lineIndex].t;
      const cssClass = lines[lineIndex].c;
      setCurrentLineClass(cssClass);

      if (charIndex <= txt.length) {
        setCurrentLineText(txt.slice(0, charIndex));
        charIndex++;
        const speed = cssClass === 'mentor' ? 14 : 22;
        timeoutId = setTimeout(typeLine, speed);
      } else {
        // Line typing completed, push to history
        setTypedLines(prev => [...prev, { t: txt, c: cssClass }]);
        setCurrentLineText('');
        setCurrentLineClass('');
        lineIndex++;
        charIndex = 0;
        const delay = lines[lineIndex - 1].c === 'mentor' ? 420 : 260;
        timeoutId = setTimeout(typeLine, delay);
      }
    };

    // Start typing after initial delay
    const startDelay = setTimeout(typeLine, 900);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID";

    try {
      if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        throw new Error('endpoint-not-configured');
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('submit-failed');
      
      setStatus({ 
        type: 'good', 
        text: "You're on the list. We'll reach out when your seat opens." 
      });
      setEmail('');
    } catch (err: any) {
      setStatus({ 
        type: 'bad', 
        text: err.message === 'endpoint-not-configured'
          ? "Form not connected yet — add your Formspree endpoint in the code or environment."
          : "Something went wrong. Try again, or email judedrift@phidrift.xyz."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page-wrapper">
      <div className="wrap">
        <nav>
          <div className="logo">LOTUS <span>// Academy</span></div>
          <div className="flex items-center gap-6">
            <Link to="/auth" className="text-[#938c7e] hover:text-[#e0a649] transition-colors font-mono text-sm uppercase tracking-wider">
              Sign In
            </Link>
            <div className="badge">Private Alpha</div>
          </div>
        </nav>

        <header>
          <div className="eyebrow">Cybersecurity · Business Automation</div>
          <h1>The first AI teacher that <em>actually remembers you.</em></h1>
          <p className="lede">
            Stop grinding through generic video courses. LOTUS gives you a live, sandboxed terminal where an AI mentor <strong>watches your commands, catches your mistakes, and adapts to your pace.</strong> Built from the ground up — not another wrapper.
          </p>

          <div className="terminal">
            <div className="term-bar">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="term-title">lotus@sandbox — recon-101</span>
            </div>
            <div className="term-body">
              {typedLines.map((line, idx) => (
                <div key={idx} className={`ln ${line.c}`}>
                  {line.t}
                </div>
              ))}
              {currentLineClass && (
                <div className={`ln ${currentLineClass}`}>
                  {currentLineText}
                </div>
              )}
              {isCompleted && <span className="cursor"></span>}
            </div>
          </div>
        </header>

        <section>
          <div className="sec-label">How it works</div>
          <div className="grid">
            <div className="cell">
              <div className="num">01</div>
              <h3>It remembers</h3>
              <p>A persistent memory layer tracks what you've learned, where you've struggled, and what to reinforce next — so every session builds on the last instead of starting over.</p>
            </div>
            <div className="cell">
              <div className="num">02</div>
              <h3>It watches live</h3>
              <p>A real sandboxed terminal, isolated from anything that matters. Run commands for real. The mentor reads what you type and steps in the moment something goes sideways.</p>
            </div>
            <div className="cell">
              <div className="num">03</div>
              <h3>It adapts</h3>
              <p>Move fast and it gets out of your way. Get stuck and it slows down, explains, and reroutes. The pace is yours, not a fixed playlist's.</p>
            </div>
          </div>

          <div className="tracks">
            <div className="track">
              <div className="k">Track 01</div>
              <div className="v">Cybersecurity</div>
            </div>
            <div className="track">
              <div className="k">Track 02</div>
              <div className="v">Business Automation</div>
            </div>
          </div>
        </section>

        <section className="cta" id="join">
          <h2>The first <span className="price">100</span> lock in founding pricing.</h2>
          <p className="cta-sub">
            LOTUS is in private alpha. Join the waitlist and you'll be among the first invited in — at the <strong style={{ color: 'var(--gold-soft)' }}>$19/mo founding rate, locked for life.</strong> No charge today. We'll only email you when your seat is ready.
          </p>

          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com" 
              required 
              autoComplete="email" 
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Claim my seat'}
            </button>
          </form>
          
          {status.text && (
            <div className={`msg ${status.type}`}>
              {status.text}
            </div>
          )}
          
          <p className="formnote">Private alpha · no spam · unsubscribe anytime</p>
        </section>

        <footer>
          <div>LOTUS // Academy — built in Virginia Beach</div>
          <div><a href="mailto:judedrift@phidrift.xyz">judedrift@phidrift.xyz</a></div>
        </footer>
      </div>
    </div>
  );
}
