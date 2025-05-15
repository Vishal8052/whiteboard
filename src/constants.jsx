import React from "react";

export const presetColors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#000000", // Black
];

export const MAGIC_ERASER = {
   MIN_SIZE: 20,
   SIZE_FACTOR: 2
};

export const CURSOR = {
    HEIGHT: 26,
    WIDTH: 2
};

export const ERASER = {
  SIZE_FACTOR:2,
}

export const TOOLS = [
  {
    name: "pen",
    icon: (
      <svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-0.015 0.015 1.26 1.26" xml:space="preserve"><path d="M.631.442C.738.455.878.578.889.69l.283-.285c.058-.058.056-.082-.004-.137l-.122-.11C.988.105.965.107.91.162zm.148.25A.26.26 0 0 0 .606.543C.393.488.189.719.201.888c.019.137-.16.157-.188.163.178.062.253.076.418.041.143-.03.421-.171.347-.4"/></svg>
    ),
  },
  {
    name: "line",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="4" y1="20" x2="20" y2="4" />
      </svg>
    ),
  },
  {
    name: "rectangle",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" />
      </svg>
    ),
  },
  {
    name: "circle",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    name: "arrow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="0" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  },
  {
    name: "text",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    name: "eraser",
    icon: (
      <svg width="24px" height="24px" viewBox="0 0 1.44 1.44" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path width="48" height="48" fill="white" fill-opacity="0.01" d="M0 0H1.44V1.44H0V0z"/><path d="M1.343 0.725 0.958 0.213 0.424 0.615 0.825 1.11l0.101 -0.07z" fill="#2F88FF" stroke="#000000" stroke-width="0.1290603" stroke-linejoin="round"/><path d="m0.825 1.11 -0.115 0.092 -0.317 0 -0.078 -0.103 -0.193 -0.256L0.435 0.607" stroke="#000000" stroke-width="0.1290603" stroke-linejoin="round"/><path d="M0.396 1.202h0.941" stroke="#000000" stroke-width="0.135" stroke-linecap="round"/></g><defs><clipPath id="clip0"><path width="48" height="48" fill="white" d="M0 0H1.44V1.44H0V0z"/></clipPath></defs></svg>
    ),
  },
  {
    name: "magic_eraser",
    icon: (
      <svg width="24" height="24" viewBox="0 0 0.48 0.48" xmlns="http://www.w3.org/2000/svg"><path fill="#444" d="M0 .15h.09v.03H0zM.15 0h.03v.09H.15zm.03.33H.15V.255l.03.03zM.33.18H.285L.255.15H.33zM.094.215l.021.021-.089.089L.005.304zm.21-.21.021.021-.089.089L.215.094zM.025.006.129.11.108.131.004.027zm.158.117L.12.183.414.48.48.417zm0 .042L.255.24.237.258.162.183z"/></svg>
    ),
  },
  {
    name: "undo",
    icon: (
      <svg width="24px" height="24px" viewBox="0 0 1.44 1.44" fill="none" xmlns="http://www.w3.org/2000/svg"><path width="48" height="48" fill="white" fill-opacity="0.01" d="M0 0H1.44V1.44H0V0z"/><path d="M0.338 1.102A0.538 0.538 0 0 0 0.72 1.26c0.298 0 0.54 -0.242 0.54 -0.54S1.018 0.18 0.72 0.18c-0.149 0 -0.284 0.06 -0.382 0.158C0.288 0.388 0.18 0.51 0.18 0.51" stroke="#000000" stroke-width="0.12" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.18 0.27v0.24h0.24" stroke="#000000" stroke-width="0.12" stroke-linecap="round" stroke-linejoin="round"/></svg>
    ),
  },
  {
    name: "redo",
    icon: (
      <svg fill="#000000" width="24px" height="24px" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg"><path d="M0.63 0.33A0.03 0.03 0 0 0 0.6 0.359 0.242 0.242 0 1 1 0.534 0.194h-0.072a0.03 0.03 0 0 0 0 0.06h0.136A0.03 0.03 0 0 0 0.627 0.225V0.09a0.03 0.03 0 0 0 -0.06 0v0.053A0.3 0.3 0 1 0 0.66 0.36 0.03 0.03 0 0 0 0.63 0.33"/></svg>
    ),
  },
  {
    name: "clear",
    icon: (
      <svg width="24px" height="24px" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H1.594a10.406 10.406 0 0 1 18.563 -6.462V3.984h1.406v4.922H16.641v-1.406h3.153A9.01 9.01 0 0 0 12 3C7.037 3 3 7.037 3 12m18 0c0 4.963 -4.037 9 -9 9a9.01 9.01 0 0 1 -7.794 -4.5H7.359v-1.406H2.438v4.922h1.406v-1.554A10.406 10.406 0 0 0 22.406 12Z"/></svg>
    ),
  },
  {
    name: "save",
    icon:(
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve" width="32" height="32"><path fill="none" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" d="M18.75 21H5.25M12 17.25V3m-5.25 9L12 17.25 17.25 12"/></svg>
    )
  }
];