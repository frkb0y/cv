import { useState } from "react";
import html2pdf from "html2pdf.js";
import cvData from "./cv-data.json";

const defaultCV = cvData;

export default function CVBuilder() {
  const [cv, setCV] = useState(defaultCV);
  const [view, setView] = useState("preview"); // "preview" | "json"
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultCV, null, 2));
  const [jsonError, setJsonError] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleJsonChange = (val) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      setCV(parsed);
      setJsonError("");
    } catch (e) {
      setJsonError("Invalid JSON: " + e.message);
    }
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      if (view !== "preview") {
        setView("preview");
        // Wait a moment for preview DOM to render before capturing.
        await new Promise((resolve) => setTimeout(resolve, 180));
      }

      const preview = document.getElementById("cv-preview");
      if (!preview) {
        throw new Error("CV preview is not ready yet.");
      }

      const safeName = (cv.name || "cv").trim().replace(/\s+/g, "_");
      await html2pdf()
        .set({
          margin: [8, 8, 8, 8],
          filename: `${safeName}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(preview)
        .save();
    } catch (e) {
      window.alert("Could not generate PDF: " + e.message);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f5f0eb", minHeight: "100vh", padding: "0" }}>
      {/* Top Bar */}
      <div className="no-print" style={{ background: "#1a1a2e", color: "#e8d5b7", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: 2 }}>CV BUILDER</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setView("preview")} style={{ padding: "6px 18px", borderRadius: 4, border: "none", background: view === "preview" ? "#e8d5b7" : "transparent", color: view === "preview" ? "#1a1a2e" : "#e8d5b7", cursor: "pointer", fontFamily: "monospace", fontSize: 12 }}>PREVIEW</button>
          <button onClick={() => setView("json")} style={{ padding: "6px 18px", borderRadius: 4, border: "none", background: view === "json" ? "#e8d5b7" : "transparent", color: view === "json" ? "#1a1a2e" : "#e8d5b7", cursor: "pointer", fontFamily: "monospace", fontSize: 12 }}>EDIT JSON</button>
          <button onClick={handleDownloadPdf} disabled={isGeneratingPdf} style={{ padding: "6px 18px", borderRadius: 4, border: "1px solid #e8d5b7", background: "transparent", color: "#e8d5b7", cursor: isGeneratingPdf ? "not-allowed" : "pointer", fontFamily: "monospace", fontSize: 12, opacity: isGeneratingPdf ? 0.6 : 1 }}>{isGeneratingPdf ? "GENERATING..." : "DOWNLOAD PDF"}</button>
          <button onClick={() => window.print()} style={{ padding: "6px 18px", borderRadius: 4, border: "1px solid #e8d5b7", background: "transparent", color: "#e8d5b7", cursor: "pointer", fontFamily: "monospace", fontSize: 12 }}>PRINT</button>
        </div>
      </div>

      {view === "json" ? (
        <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
          {jsonError && <div style={{ color: "red", marginBottom: 8, fontFamily: "monospace", fontSize: 12 }}>{jsonError}</div>}
          <textarea
            value={jsonText}
            onChange={e => handleJsonChange(e.target.value)}
            style={{ width: "100%", height: "80vh", fontFamily: "monospace", fontSize: 13, padding: 16, borderRadius: 8, border: "1px solid #ccc", background: "#1a1a2e", color: "#e8d5b7", resize: "vertical" }}
          />
        </div>
      ) : (
        <div id="cv-preview" style={{ maxWidth: 820, margin: "0.5px auto", background: "white", boxShadow: "0 4px 40px rgba(0,0,0,0.13)", padding: "12px 56px 36px", borderTop: "none" }}>
          
          {/* Header */}
          <div style={{ borderBottom: "2px solid #1a1a2e", paddingBottom: 14, marginBottom: 18 }}>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#1a1a2e", letterSpacing: 1 }}>{cv.name}</h1>
            <div style={{ color: "#8b5e3c", fontFamily: "monospace", fontSize: 13, marginTop: 4, letterSpacing: 1 }}>{cv.title}</div>
            <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
              {[
                { icon: "✉", val: cv.email },
                { icon: "☏", val: cv.phone },
                { icon: "in", val: cv.linkedin },
                { icon: "⌂", val: cv.portfolio }
              ].map((item, i) => item.val && (
                <span key={i} style={{ fontFamily: "monospace", fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ color: "#1a1a2e", fontWeight: 700 }}>{item.icon}</span> {item.val}
                </span>
              ))}
            </div>
          </div>

          {/* Summary */}
          {cv.summary && (
            <Section title="PROFILE">
              <p style={{ margin: 0, color: "#333", lineHeight: 1.7, fontSize: 14 }}>{cv.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {cv.experience?.length > 0 && (
            <Section title="EXPERIENCE">
              {cv.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 15 }}>{exp.role}</div>
                      <div style={{ color: "#8b5e3c", fontSize: 13, fontStyle: "italic" }}>{exp.company} · {exp.location}</div>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", whiteSpace: "nowrap" }}>{exp.period}</div>
                  </div>
                  <ul style={{ margin: "8px 0 0 0", paddingLeft: 18 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ color: "#444", fontSize: 13, lineHeight: 1.6, marginBottom: 3 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {cv.projects?.length > 0 && (
            <Section title="PROJECTS">
              {cv.projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{p.name}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "#8b5e3c" }}>{p.tech}</span>
                  </div>
                  <div style={{ color: "#444", fontSize: 13, marginTop: 3, lineHeight: 1.6 }}>{p.description}</div>
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {cv.education?.length > 0 && (
            <Section title="EDUCATION">
              {cv.education.map((ed, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{ed.degree}</div>
                    <div style={{ color: "#555", fontSize: 13 }}>{ed.school}</div>
                    {ed.gpa && <div style={{ color: "#8b5e3c", fontSize: 12, fontFamily: "monospace" }}>GPA: {ed.gpa}</div>}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888" }}>{ed.period}</div>
                </div>
              ))}
            </Section>
          )}

          {/* Skills */}
          {cv.skills?.length > 0 && (
            <Section title="SKILLS">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 32px" }}>
                {cv.skills.map((s, i) => (
                  <div key={i} style={{ fontSize: 13, lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 700, color: "#1a1a2e" }}>{s.category}: </span>
                    <span style={{ color: "#444" }}>{s.values}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {cv.certifications?.length > 0 && (
            <Section title="CERTIFICATIONS">
              {cv.certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>• {c}</div>
              ))}
            </Section>
          )}

          {/* Languages */}
          {cv.languages?.length > 0 && (
            <Section title="LANGUAGES">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px" }}>
                {cv.languages.map((l, i) => (
                  <div key={i} style={{ minWidth: 7, fontSize: 13, color: "#444", lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 700, color: "#1a1a2e" }}>{l.lang}: </span>{l.level}
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>
      )}

      <style>{`\n        @media print {\n          body { background: white !important; }\n          .no-print { display: none !important; }\n          #cv-preview { box-shadow: none !important; margin: 0 !important; padding: 8px 32px 24px !important; }\n          div[style*="background: #1a1a2e"] { display: none !important; }\n        }\n      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, color: "#8b5e3c", borderBottom: "1px solid #e0d5c5", paddingBottom: 4, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
