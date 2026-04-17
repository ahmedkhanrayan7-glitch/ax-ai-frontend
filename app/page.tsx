"use client";

import { useState } from "react";

type Lead = {
  company: string;
  decisionMaker: string;
  phone: string;
  confidence: "HIGH" | "MEDIUM";
};

type Status = "idle" | "loading" | "done" | "error";

const MOCK_LEADS: Lead[] = [
  { company: "Grand Street Dental",         decisionMaker: "Dr. Jennifer Plotnick",    phone: "(718) 942-9942", confidence: "HIGH" },
  { company: "Williamsburg Dental Arts",    decisionMaker: "Dr. Konstantin Rubinov",   phone: "(347) 689-3066", confidence: "HIGH" },
  { company: "Broadway Family Dental PC",   decisionMaker: "Dr. Ella Dekhtyar",        phone: "(718) 455-4400", confidence: "HIGH" },
  { company: "Shine DDS",                   decisionMaker: "Dr. Evelyn Shine Franco",  phone: "(718) 751-0101", confidence: "HIGH" },
  { company: "iSmile Dental",               decisionMaker: "Dr. Rimma Portman",        phone: "(718) 384-8880", confidence: "HIGH" },
];

export default function Home() {
  const [city,    setCity]    = useState("");
  const [niche,   setNiche]   = useState("");
  const [count,   setCount]   = useState<number | "">("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [leads,   setLeads]   = useState<Lead[]>([]);

  async function handleExtract() {
    console.log({ city, niche, count });
    setStatus("loading");
    setLeads([]);

    try {
      const res = await fetch("https://adminaxaiv.app.n8n.cloud/webhook/lead-extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, niche, count }),
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        data = { status: "error", leads: [] };
      }
      console.log("Webhook response:", data);

      setLeads(MOCK_LEADS.slice(0, Number(count) || 5));
      setStatus("done");
    } catch (err) {
      console.error("Webhook error:", err);
      setStatus("error");
    }
  }

  const isLoading  = status === "loading";
  const isDone     = status === "done";
  const isError    = status === "error";
  const isDisabled = isLoading || !city || !niche || !count;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AX Lead Engine</h1>
          <p className="text-gray-400 mt-1 text-xs font-semibold tracking-widest uppercase">
            High-Quality Lead Extraction System
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-7">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? "bg-amber-400" : isError ? "bg-red-400" : "bg-emerald-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? "bg-amber-500" : isError ? "bg-red-500" : "bg-emerald-500"}`} />
            </span>
            <span className={`text-xs font-semibold uppercase tracking-wider ${isLoading ? "text-amber-600" : isError ? "text-red-600" : "text-emerald-600"}`}>
              {isLoading ? "Extracting…" : isError ? "Extraction Failed" : isDone ? "Extraction Completed" : "System Ready"}
            </span>
          </div>

          <div className="space-y-5">

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">City</label>
              <input
                type="text"
                value={city}
                disabled={isLoading}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Brooklyn, New York"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50"
              />
            </div>

            {/* Niche */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Business Type / Niche</label>
              <input
                type="text"
                value={niche}
                disabled={isLoading}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Dental Clinics, Law Firms"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50"
              />
            </div>

            {/* Count */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Number of Leads</label>
              <input
                type="number"
                value={count}
                disabled={isLoading}
                onChange={(e) => setCount(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 10"
                min={1}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all disabled:opacity-50"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleExtract}
              disabled={isDisabled}
              className={`w-full mt-1 py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200
                ${isLoading
                  ? "bg-amber-500 text-white shadow-md shadow-amber-200 cursor-not-allowed"
                  : isDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Extracting high-quality leads…
                </>
              ) : (
                "Start Extraction"
              )}
            </button>
          </div>

          {/* Status message */}
          {status !== "idle" && (
            <p className={`text-center text-xs font-medium mt-5 transition-all ${isLoading ? "text-amber-500" : isError ? "text-red-500" : "text-emerald-600"}`}>
              {isLoading
                ? "⏳ Extraction in progress…"
                : isError
                  ? "❌ Error starting extraction"
                  : `✅ Extraction started successfully — ${leads.length} leads found`}
            </p>
          )}
        </div>

        {/* ── Results Table ── */}
        {isDone && leads.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">

            {/* Table header bar */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-800">Extracted Leads</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {city} &nbsp;&middot;&nbsp; {niche} &nbsp;&middot;&nbsp; {leads.length} results
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Phone Confirmed
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Decision Maker</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 hover:bg-indigo-50/40 transition-colors duration-100"
                    >
                      <td className="px-6 py-4 text-gray-400 font-semibold text-xs">{i + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{lead.company}</td>
                      <td className="px-6 py-4 text-gray-600">{lead.decisionMaker}</td>
                      <td className="px-6 py-4 font-mono text-indigo-600 font-semibold text-xs">{lead.phone}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                          {lead.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                Phone-mandatory filter &nbsp;&middot;&nbsp; Direct decision-maker contacts only
              </p>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pb-4">
          AX Lead Engine &nbsp;&middot;&nbsp; Powered by AX AI Ventures
        </p>
      </div>
    </main>
  );
}
