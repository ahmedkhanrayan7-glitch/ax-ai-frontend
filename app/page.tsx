"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [count, setCount] = useState<number | "">("");

  function handleExtract() {
    console.log({ city, niche, count });
    alert("Extraction Started");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AX Lead Engine</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium tracking-wide uppercase">
            High-Quality Lead Extraction System
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">System Ready</span>
          </div>

          <div className="space-y-5">

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Brooklyn, New York"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            {/* Business Type / Niche */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Business Type / Niche
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Dental Clinics, Law Firms"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            {/* Number of Leads */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Number of Leads
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 10"
                min={1}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleExtract}
              disabled={!city || !niche || !count}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all duration-150"
            >
              Start Extraction
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Phone-mandatory filter &nbsp;&middot;&nbsp; Direct decision-maker contacts only
          </p>
        </div>

        {/* Bottom tag */}
        <p className="text-center text-xs text-gray-400 mt-5">
          AX Lead Engine &nbsp;&middot;&nbsp; Powered by AX AI Ventures
        </p>
      </div>
    </main>
  );
}
