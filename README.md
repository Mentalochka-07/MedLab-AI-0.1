# ⚡ PhysioLab AI — Interactive Action Potential & Synaptic Transmission (v2.0)

> **High-Performance Biophysical Simulation & Medical Education Platform**  
> Inspired by *ciechanow.ski*, *Seeing Theory*, and *Distill.pub*. Minimalist, scientific, high signal-to-noise ratio.

---

## 🌟 1. What's New in v2.0

* **🌐 Full Bilingual Localization (i18n - English & Russian):**  
  Instant runtime switching between **English (EN)** and **Russian (RU)** across all headers, model catalogs, interactive sliders, pharmacological blockers, clinical pearls, and canvas tooltips without page reload.
* **📚 Physiology Catalog Dropdown (`"Физиология"` / `"Physiology"`):**  
  Multi-model expandable architecture featuring the core active model (*Action Potential & Synaptic Transmission*) alongside planned models (*Cardiac Cycle & Wiggers Diagram*, *Pulmonary Mechanics & Compliance*, *Reflex Arc & CNS*, *Countercurrent Nephron Transport*).
* **⏱️ Precise Simulation Speed Scaling (0.1x to 1.0x):**  
  Dedicated physics time-step scaling slider allowing students to run at **0.1x (Ultra Slow-Mo)**, **0.25x**, **0.5x**, or **1.0x (Real-time)**. Ion particles, voltage-gated channels, and vesicle fusion move at a pace where individual ionic movements can be tracked visually.
* **💬 Step-by-Step Educational Callouts in Slow Motion:**  
  During slow-motion playback ($\le 0.5\text{x}$), contextual step-by-step annotation cards float dynamically over the active biological structures:
  1. *Depolarization: $\text{Na}^+$ enters through voltage-gated Nav channels*
  2. *Repolarization: $\text{K}^+$ efflux restoring resting negative potential*
  3. *Terminal Depolarization: $\text{Ca}_V2.1$ opening and $\text{Ca}^{2+}$ influx*
  4. *SNARE Exocytosis: Vesicle fusion and quantal Acetylcholine release into the $20\,\text{nm}$ cleft*
  5. *Postsynaptic EPSP: $\text{nAChR}$ receptor opening and cation influx*
* **🌓 Minimalist Dual Theme (Dark Oscilloscope & Clean Light Paper):**  
  Instant toggle between `#090D16` (Deep Lab Oscilloscope mode) and `#FAFAFA` (Minimalist Ciechanowski Clean Paper mode).

---

## 🔬 2. Biological & Mathematical Core

### A. 4-Variable Hodgkin-Huxley System (RK4)

Membrane potential $V_m$ is governed by:

$$C_m \frac{dV}{dt} = I_{ext} - \bar{g}_{Na} m^3 h (V - E_{Na}) - \bar{g}_K n^4 (V - E_K) - g_L (V - E_L)$$

Integrated via **4th-Order Runge-Kutta (RK4)** with adaptive biological sub-stepping:

$$\Delta t_{bio} = \frac{\Delta t_{wall}}{1000} \times (10.0 \times \text{timeScale})$$

This guarantees $100\%$ numerical stability, zero stiffness artifacts, and smooth 60 FPS animation at all speeds from $0.1\text{x}$ to $1.0\text{x}$.

### B. Dynamic Nernst Potentials at $37^\circ\text{C}$

$$E_{ion} = \frac{RT}{zF} \ln\left(\frac{[Ion]_{out}}{[Ion]_{in}}\right) \approx \frac{26.72}{z} \ln\left(\frac{[Ion]_{out}}{[Ion]_{in}}\right) \text{ mV}$$

* Normal Baseline: $E_{Na} \approx +61.5\,\text{mV}$, $E_K \approx -95.0\,\text{mV}$, $E_{Ca} \approx +135\,\text{mV}$.
* Hyperkalemia ($[K^+]_{out} = 8.5\,\text{mM}$): $E_K$ shifts to $-75\,\text{mV}$, depolarizing resting $V_m$ to $-55\,\text{mV}$ and inducing persistent $\text{Na}^+$ channel inactivation ($h$-gate lock).

---

## 💉 3. Clinical Scenarios & Presets

1. **Normal Action Potential & Synapse / Норма:** Standard $15\,\mu\text{A}/\text{cm}^2$ pulse, all-or-none AP, $\text{Ca}^{2+}$ influx, SNARE fusion, robust EPSP.
2. **Local Anesthetic (Lidocaine / TTX) / Лидокаин:** Blocks $\text{Nav}$ ($g_{Na}=0$); stimulus produces only passive subthreshold electronic decay.
3. **Severe Hyperkalemia / Тяжёлая гиперкалиемия:** Depolarization block and inexcitability due to persistent $h$-gate closure.
4. **Botulinum Neurotoxin (BoNT) / Ботулотоксин:** Cleaves SNAP-25 / Syntaxin; exocytosis rate $= 0$; flaccid neuromuscular block.
5. **Potassium Channel Block (TEA) / Блокатор Kv:** Impaired repolarization with a prolonged plateau action potential.
6. **Hypokalemia / Гипокалиемия:** Membrane hyperpolarizes to $-80\,\text{mV}$, raising threshold.

---

## 📂 4. Project Directory Structure

```
├── wasm/                     # Rust WebAssembly Simulation Engine
│   ├── Cargo.toml            # wasm-pack configuration
│   └── src/
│       └── lib.rs            # Rust RK4 Hodgkin-Huxley implementation
├── src/
│   ├── locales/
│   │   ├── en.json           # Comprehensive English dictionary
│   │   └── ru.json           # Comprehensive Russian medical dictionary
│   ├── context/
│   │   ├── LanguageContext.tsx # Instant EN/RU i18n switcher
│   │   └── ThemeContext.tsx    # Light/Dark mode switcher
│   ├── config/
│   │   └── models.ts         # Physiology models catalog
│   ├── types/
│   │   └── simulation.ts     # Biophysical types, states, parameters & interfaces
│   ├── math/
│   │   ├── hodgkinHuxley.ts  # 4th-order Runge-Kutta solver & Nernst equations
│   │   └── synapticEngine.ts # Presynaptic Ca2+, SNARE, exocytosis & EPSP kinetics
│   ├── engine/
│   │   └── simulationCoordinator.ts # Simulation loop, speed scaling, history & presets
│   ├── canvas/
│   │   ├── simulationCanvas.ts # Dual-theme HTML5 Canvas renderer (Neuron, Axon, Cleft)
│   │   └── oscilloscopeCanvas.ts # Real-time dual-theme oscilloscope (Vm & EPSP vs Time)
│   ├── components/
│   │   ├── Header.tsx        # Logo, Catalog dropdown, EN/RU switch, speed slider
│   │   ├── CanvasZone.tsx    # ZONE 1: Connected biophysical canvas container
│   │   ├── OscilloscopeZone.tsx # ZONE 2: Real-time oscilloscope plot container
│   │   └── ControlPanel.tsx  # ZONE 3: Presets, sliders, toxin toggles & clinical pearls
│   ├── App.tsx               # Root component with 60 FPS RAF loop
│   ├── index.css             # Tailwind CSS & custom styles
│   └── main.tsx              # React DOM entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 5. Quickstart

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

---

## ⌨️ 6. Keyboard Shortcuts

* <kbd>Space</kbd>: Trigger Depolarizing Stimulus Pulse ($15\,\mu\text{A}/\text{cm}^2$).
* <kbd>P</kbd>: Toggle Simulation Run / Pause.
* <kbd>R</kbd>: Reset simulation to baseline.
* <kbd>1</kbd> – <kbd>6</kbd>: Instant One-Click Clinical Presets.
