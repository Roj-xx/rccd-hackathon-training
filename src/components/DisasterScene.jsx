export default function DisasterScene({ detected = false, label = 'PERSON', confidence = 87 }) {
  return (
    <svg
      className="scene"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sceneBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1420" />
          <stop offset="55%" stopColor="#111b2b" />
          <stop offset="100%" stopColor="#070c14" />
        </linearGradient>
        <linearGradient id="sceneBeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fb6d4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9fb6d4" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sceneDust" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#cfd9e8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#cfd9e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#sceneBg)" />

      <rect x="0" y="0" width="1600" height="620" fill="#121b2a" />
      {[200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="608" stroke="#0a101a" strokeWidth="3" opacity="0.5" />
      ))}

      <polygon
        points="230,150 560,120 596,300 560,450 380,500 240,430 206,270"
        fill="#1d2d48"
      />
      <path
        d="M230,150 560,120 596,300 560,450 380,500 240,430 206,270 Z"
        fill="none"
        stroke="#0a101a"
        strokeWidth="10"
      />
      <polygon points="232,158 380,140 360,240 246,268" fill="#0a101a" opacity="0.55" />
      <polygon points="520,430 588,330 586,444 470,486" fill="#0a101a" opacity="0.5" />
      <polygon points="250,158 566,136 980,790 420,812" fill="url(#sceneBeam)" opacity="0.4" />

      <polygon points="0,0 1600,0 1600,74 0,132" fill="#070c13" />
      <rect x="360" y="-40" width="112" height="680" fill="#0a101a" stroke="#1d2839" strokeWidth="3" transform="rotate(-21 416 300)" />
      <rect x="984" y="-60" width="92" height="630" fill="#0b111c" stroke="#1d2839" strokeWidth="3" transform="rotate(16 1030 255)" />
      <rect x="1268" y="46" width="70" height="470" fill="#0a101a" stroke="#1d2839" strokeWidth="3" transform="rotate(-9 1303 280)" />
      <path d="M600 0 C624 130 556 214 588 336" stroke="#2a3547" strokeWidth="5" fill="none" />
      <path d="M700 0 C686 96 742 168 722 268" stroke="#243044" strokeWidth="4" fill="none" />

      <polygon points="0,612 1600,576 1600,900 0,900" fill="#0d141f" />
      {[
        [0, 900],
        [320, 900],
        [640, 900],
        [960, 900],
        [1280, 900],
        [1600, 900],
      ].map(([x, y]) => (
        <line key={x} x1="820" y1="590" x2={x} y2={y} stroke="#ffffff" strokeWidth="2" opacity="0.05" />
      ))}
      <line x1="0" y1="716" x2="1600" y2="700" stroke="#ffffff" strokeWidth="2" opacity="0.05" />

      <polygon points="0,900 0,742 96,706 208,738 318,690 440,730 560,776 660,900" fill="#151e2d" />
      <polygon points="96,706 158,690 206,730 148,744" fill="#1e293b" />
      <polygon points="318,690 384,712 344,752 292,732" fill="#1e293b" />
      <polygon points="440,730 512,752 474,790 420,766" fill="#1c2637" />

      <polygon points="1600,900 1600,676 1500,716 1396,678 1300,730 1226,790 1196,900" fill="#151e2d" />
      <polygon points="1500,716 1560,700 1600,742 1544,752" fill="#1e293b" />
      <polygon points="1396,678 1452,704 1414,744 1360,716" fill="#1c2637" />

      <polygon points="694,824 744,806 778,842 738,866" fill="#1a2334" />
      <polygon points="1246,838 1300,820 1330,856 1284,876" fill="#1a2334" />
      <polygon points="186,846 238,832 264,864 220,884" fill="#1a2334" />
      <rect x="546" y="840" width="86" height="16" rx="4" fill="#1c2637" transform="rotate(-7 589 848)" />

      <g className="scene__person">
        <path d="M1058 634 C1112 654 1152 690 1166 744" stroke="#39414f" strokeWidth="34" fill="none" strokeLinecap="round" />
        <path d="M902 596 C872 634 852 672 846 704" stroke="#454e5e" strokeWidth="26" fill="none" strokeLinecap="round" />
        <path
          d="M886 556 C950 524 1034 532 1080 582 L1094 648 C1036 692 946 700 890 668 C864 634 862 584 886 556 Z"
          fill="#57616f"
          stroke="#0a0f18"
          strokeWidth="4"
        />
        <path d="M934 546 C958 592 962 646 946 690" stroke="#46505e" strokeWidth="9" fill="none" opacity="0.7" />
        <path d="M1050 652 C1104 678 1140 712 1146 756" stroke="#46505f" strokeWidth="36" fill="none" strokeLinecap="round" />
        <path d="M906 578 C878 620 866 668 872 716" stroke="#525c6c" strokeWidth="28" fill="none" strokeLinecap="round" />
        <circle cx="874" cy="724" r="15" fill="#9c8b78" stroke="#0a0f18" strokeWidth="3" />
        <ellipse cx="852" cy="588" rx="44" ry="46" fill="#9c8b78" stroke="#0a0f18" strokeWidth="4" />
        <path
          d="M812 592 C804 546 834 522 866 530 C894 537 906 560 900 578 C884 556 842 552 812 592 Z"
          fill="#2a251f"
          stroke="#0a0f18"
          strokeWidth="3"
        />
        <ellipse cx="1160" cy="752" rx="26" ry="17" fill="#222a36" stroke="#0a0f18" strokeWidth="3" />
        <path d="M1096 690 L1140 654 L1206 686 L1236 754 L1180 792 L1108 774 Z" fill="#1b2434" stroke="#0e1522" strokeWidth="4" />
        <path d="M1150 706 L1188 690 L1214 724 L1196 758 L1156 752 Z" fill="#232e40" />
      </g>

      <ellipse cx="420" cy="300" rx="310" ry="165" fill="url(#sceneDust)" />
      <ellipse cx="1150" cy="260" rx="340" ry="180" fill="url(#sceneDust)" />
      <ellipse cx="840" cy="640" rx="430" ry="150" fill="url(#sceneDust)" opacity="0.6" />

      {detected && (
        <g className="detect-box">
          <rect className="detect-box__rect" x="786" y="502" width="460" height="304" />
          <path className="detect-box__corner" d="M786 542 V502 H826" />
          <path className="detect-box__corner" d="M1206 502 H1246 V542" />
          <path className="detect-box__corner" d="M786 764 V804 H826" />
          <path className="detect-box__corner" d="M1206 804 H1246 V764" />
          <g className="detect-box__chip">
            <rect x="790" y="446" width="196" height="64" rx="7" className="detect-box__chip-bg" />
            <text x="808" y="474" className="detect-box__label">
              {label}
            </text>
            <text x="808" y="498" className="detect-box__conf">
              {confidence}% CONFIDENCE
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
