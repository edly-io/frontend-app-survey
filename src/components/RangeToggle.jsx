import React from "react";

export default function RangeToggle({ value = 1, onChange, label }) {
  const TRACK_COLOR = "#BE3712";
  const THUMB_COLOR = "#ffffff";

  const css = `
    .range-toggle { display: inline-flex; gap: 8px; align-items: center; font-family: system-ui, sans-serif; }
    .range-toggle input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 35px;            
      height: 10px;   
      border-radius: 999px;
      padding: 0;
      margin: 0;
      cursor: pointer;
      background: ${TRACK_COLOR}; /* plain solid track color */
      outline: none;
    }

    /* WebKit track & thumb */
    .range-toggle input[type="range"]::-webkit-slider-runnable-track {
      height: 10px;
      border-radius: 999px;
      background: ${TRACK_COLOR};
    }
    .range-toggle input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      margin-top: -4px; /* center thumb */
      border-radius: 50%;
      background: ${THUMB_COLOR};
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
      border: 1px solid rgba(0,0,0,0.08);
    }

    /* Firefox track & thumb */
    .range-toggle input[type="range"]::-moz-range-track {
      height: 10px;
      border-radius: 999px;
      background: ${TRACK_COLOR};
    }
    .range-toggle input[type="range"]::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${THUMB_COLOR};
      border: 1px solid rgba(0,0,0,0.08);
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }

    /* IE / old Edge */
    .range-toggle input[type="range"]::-ms-track {
      width: 100%;
      height: 10px;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    .range-toggle input[type="range"]::-ms-fill-lower,
    .range-toggle input[type="range"]::-ms-fill-upper {
      background: ${TRACK_COLOR};
      border-radius: 999px;
    }
    .range-toggle input[type="range"]::-ms-thumb {
      width: 18px;
      height: 18px;
      background: ${THUMB_COLOR};
      border-radius: 50%;
    }

    /* focus */
    .range-toggle input[type="range"]:focus::-webkit-slider-thumb,
    .range-toggle input[type="range"]:focus::-moz-range-thumb {
      box-shadow: 0 0 0 4px rgba(190,55,18,0.12);
    }

    .range-label { font-size: 0.9rem; }
    .range-value { min-width: 18px; text-align: center; font-size: 0.9rem; }
  `;

  return (
    <div className="range-toggle">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <strong className="range-label">Bar</strong>
      <input
        type="range"
        min="0"
        max="1"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label ?? "Chart type slider"}
      />
      <strong className="range-value">Pie</strong>
    </div>
  );
}
