// Gabbi em versão chibi, desenhada em SVG a partir da ficha de personagem dela.
// Provisória: quando ela mandar a mascote desenhada à mão, é só trocar por <img>.
const INK = '#160d14';
const HAIR = '#3b2520';
const HAIR_HI = '#5a3a30';
const SKIN = '#f7dccf';
const BLACK = '#211a24';
const BLACK_2 = '#2e2532';
const WINE = '#a3203a';

export const mascot = (cls = '') => `
<svg class="mascot ${cls}" viewBox="0 0 240 360" role="img" aria-label="Gabbi">
  <defs>
    <pattern id="fishnet" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="7" height="7" fill="${SKIN}"/>
      <path d="M0 0H7M0 0V7" stroke="${INK}" stroke-width="1.6"/>
    </pattern>
  </defs>
  <g stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <!-- cabelo de trás (long bob em camadas) -->
    <path fill="${HAIR}" d="M40 100C36 44 86 16 122 18c44 2 84 30 80 86l6 70-15-9-4 21-14-15-6 15-26-12H96l-26 12-6-15-14 15-4-21-15 9z"/>
    <!-- bolsa com chaveiro de coelhinho -->
    <path fill="none" d="M70 176 46 214"/>
    <rect fill="${BLACK}" x="26" y="212" width="38" height="40" rx="8"/>
    <path fill="none" stroke-width="3" d="M34 224h22"/>
    <!-- pernas: meia 7/8 preta e meia arrastão -->
    <path fill="${SKIN}" d="M84 272h22v22H84zM136 272h22v22h-22z"/>
    <path fill="${BLACK}" d="M84 292h22v40H84z"/>
    <path fill="url(#fishnet)" d="M136 292h22v40h-22z"/>
    <path fill="none" stroke-width="4" d="M84 292h22M136 292h22"/>
    <!-- coturnos plataforma -->
    <path fill="${BLACK}" d="M78 326h32v12h4v14H72v-14h6z"/>
    <path fill="${BLACK}" d="M132 326h32v12h4v14h-42v-14h6z"/>
    <path fill="none" stroke="#6b6270" stroke-width="2.5" d="M84 333h20M138 333h20"/>
    <!-- saia pregueada -->
    <path fill="${BLACK}" d="M66 244h110l14 36H52z"/>
    <path fill="none" stroke-width="3" d="M84 248l-6 30M104 248l-3 30M124 248v30M144 248l4 30M162 248l8 30"/>
    <!-- moletom oversized -->
    <path fill="${BLACK_2}" d="M70 166c-12 6-18 34-16 84h134c2-50-4-78-16-84z"/>
    <path fill="${BLACK}" d="M104 168l17 30 17-30z"/>
    <path fill="none" stroke-width="3" d="M100 170v78M142 170v78"/>
    <!-- braço caído -->
    <path fill="${BLACK_2}" d="M64 172c-22 12-26 52-18 78l22-2c-3-24 2-46 10-62z"/>
    <circle fill="${SKIN}" cx="56" cy="256" r="10"/>
    <!-- braço acenando -->
    <path fill="${BLACK_2}" d="M172 172c22-6 38-30 42-54l-18-7c-6 20-18 36-32 44z" class="mascot-arm"/>
    <g class="mascot-hand">
      <circle fill="${SKIN}" cx="208" cy="104" r="12"/>
      <path fill="none" stroke-width="4" d="M201 92l-3-10M209 90v-11M217 93l4-9"/>
    </g>
    <!-- pescoço e choker com cruz -->
    <path fill="${SKIN}" d="M108 150h26v20h-26z"/>
    <path fill="none" stroke-width="7" d="M106 160h30"/>
    <path fill="none" stroke="#c9c2cc" stroke-width="2.5" d="M121 164v12M117 168h8"/>
    <!-- rosto -->
    <ellipse fill="${SKIN}" cx="121" cy="108" rx="58" ry="52"/>
    <!-- mechas da frente -->
    <path fill="${HAIR}" d="M64 92c-6 36 0 68 14 84l10-24c-8-18-10-40-8-60z"/>
    <path fill="${HAIR}" d="M178 92c6 36 0 68-14 84l-10-24c8-18 10-40 8-60z"/>
    <!-- franja cortina meio desfiada -->
    <path fill="${HAIR}" d="M62 96c6-42 36-56 60-56s54 14 58 56l-11-9-5 15-11-17-6 13-14-20-5 15-4-15-14 20-6-13-11 17-5-15z"/>
    <path fill="none" stroke="${HAIR_HI}" stroke-width="3" d="M88 58c10-8 22-11 32-11"/>
    <!-- boina vermelha, caída pro lado -->
    <g transform="rotate(-14 120 40) translate(-6 -8) scale(.92)" style="transform-box:view-box">
    <path fill="${WINE}" d="M56 58c6-34 82-48 120-22 14 10 6 24-16 26-30 4-70 6-94 6-10 0-12-4-10-10z"/>
    <path fill="none" stroke-width="4" d="M116 22l3-8"/>
    <path fill="none" stroke="#c94a5f" stroke-width="3" d="M80 40c16-10 38-14 58-12"/>
    </g>
    <!-- olhos -->
    <g class="mascot-eyes">
      <ellipse fill="#2a1916" cx="99" cy="114" rx="10" ry="12"/>
      <ellipse fill="#2a1916" cx="143" cy="114" rx="10" ry="12"/>
      <circle fill="#fff" stroke="none" cx="95" cy="109" r="3.6"/>
      <circle fill="#fff" stroke="none" cx="139" cy="109" r="3.6"/>
      <path fill="none" stroke-width="4.5" d="M88 108q11-11 22-1M132 107q11-10 22 1"/>
    </g>
    <!-- bochechas, pintinha e boca -->
    <ellipse fill="#f3a6b4" stroke="none" opacity=".85" cx="86" cy="132" rx="10" ry="5"/>
    <ellipse fill="#f3a6b4" stroke="none" opacity=".85" cx="156" cy="132" rx="10" ry="5"/>
    <circle fill="${INK}" stroke="none" cx="153" cy="124" r="1.6"/>
    <path fill="none" stroke-width="3.5" d="M114 137q7 6 14 0"/>
    <!-- chaveiro de coelhinho -->
    <path fill="none" stroke-width="2.5" d="M38 252v8"/>
    <g fill="#fff" stroke-width="3">
      <path d="M32 262c-2-10 0-14 3-14s4 6 2 13M42 261c0-9 3-13 6-12s2 7-1 13"/>
      <circle cx="39" cy="270" r="8"/>
    </g>
  </g>
</svg>`;
