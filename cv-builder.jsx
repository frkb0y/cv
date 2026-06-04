import { useState } from "react";

const INITIAL_DATA = {
  name: "Arslen Mohamed",
  phone: "+216-25255542",
  email: "arslenmohamed2001@gmail.com",
  linkedin: "arslen-mohamed",
  portfolio: "arslen-profile.netlify.app",
  title: "Data Science & Software Development",
  summary: "",
  education: [
    {
      degree: "B.Sc. in Big Data and Software Development",
      school: "Higher Institute of Computer Science and Multimedia, Sfax",
      period: "2021–2025",
      gpa: "",
    },
  ],
  experience: [
    {
      role: "Data / Backend Intern",
      company: "Twinkle-IT",
      location: "Online",
      period: "Jan – Jul 2025",
      bullets: [
        "Designed and optimized SQL Server data workflows for school management system.",
        "Improved reporting dashboards & analytics with .NET + Power BI.",
      ],
    },
    {
      role: "Data Management Intern",
      company: "Tunisie Telecom",
      location: "Online",
      period: "Jun – Aug 2022",
      bullets: [
        "Managed large-scale data using MongoDB for telecom applications.",
        "Contributed to backend systems ensuring reliable data flow & storage.",
      ],
    },
  ],
  projects: [
    {
      name: "Document Management System",
      description: "Reduced document retrieval time by ~50% via advanced search & filtering.",
      tech: "Java, SQLite",
      link: "",
    },
    {
      name: "Data Visualization Dashboards",
      description: "Built interactive charts for analytics projects.",
      tech: "Tableau, Power BI, Spark",
      link: "",
    },
  ],
  skills: [
    { category: "Databases", values: "SQL Server, MySQL, MongoDB, SQLite, PostgreSQL" },
    { category: "Big Data", values: "Apache Spark, Hadoop, HDFS" },
    { category: "Analytics & BI", values: "Power BI, Tableau" },
    { category: "Programming", values: "Python, Java, SQL, Scala" },
    { category: "Core", values: "Data Cleaning, Warehousing, Visualization, Algorithms" },
  ],
  certifications: [
    "EF SET English Certificate (B2 Upper Intermediate)",
    "Coursera – Management Fundamentals",
  ],
  languages: [
    { lang: "Arabic", level: "Native" },
    { lang: "English", level: "B2 Upper Intermediate" },
    { lang: "French", level: "Intermediate" },
  ],
};

const cardStyle = {
  background: "#fff", borderRadius: "10px", padding: "20px",
  marginBottom: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
  border: "1px solid #e8edf3",
};

const inputStyle = {
  width: "100%", padding: "8px 10px", borderRadius: "6px",
  border: "1px solid #dce3ec", fontSize: "13px", boxSizing: "border-box",
  outline: "none", fontFamily: "Arial, sans-serif", color: "#222", background: "#fafbfc",
};

const labelStyle = {
  fontSize: "11px", fontWeight: "700", color: "#556",
  textTransform: "uppercase", letterSpacing: "0.5px",
  marginBottom: "4px", display: "block",
};

const btnPrimary = {
  padding: "7px 14px", background: "#1a3a5c", color: "#fff",
  border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600",
};

const btnDanger = {
  padding: "4px 10px", background: "#fee2e2", color: "#b91c1c",
  border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "11px", fontWeight: "600",
};

const sectionHeader = {
  fontSize: "13px", fontWeight: "700", color: "#1a3a5c",
  marginBottom: "14px", paddingBottom: "8px", borderBottom: "2px solid #e8edf3",
  display: "flex", justifyContent: "space-between", alignItems: "center",
};

// CV Preview Components
const CVSection = ({ title, children }) => (
  <div style={{ marginBottom: "16px" }}>
    <div style={{
      fontSize: "10.5px", fontWeight: "700", letterSpacing: "1.5px",
      textTransform: "uppercase", color: "#1a3a5c",
      borderBottom: "2px solid #1a3a5c", paddingBottom: "3px", marginBottom: "7px",
      fontFamily: "'Georgia', serif",
    }}>{title}</div>
    {children}
  </div>
);

const CVPreview = ({ data }) => (
  <div style={{
    fontFamily: "'Arial', sans-serif", fontSize: "10.5px", color: "#111",
    lineHeight: "1.55", padding: "40px 48px", background: "#fff",
    width: "210mm", minHeight: "297mm", boxSizing: "border-box",
  }}>
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <div style={{
        fontSize: "22px", fontWeight: "700", letterSpacing: "2px",
        fontFamily: "'Georgia', serif", color: "#1a3a5c", textTransform: "uppercase",
      }}>{data.name}</div>
      {data.title && <div style={{ fontSize: "11px", color: "#555", marginTop: "2px", fontStyle: "italic" }}>{data.title}</div>}
      <div style={{ fontSize: "9.5px", color: "#333", marginTop: "6px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
        {data.phone && <span>📞 {data.phone}</span>}
        {data.email && <span>✉ {data.email}</span>}
        {data.linkedin && <span>🔗 linkedin.com/in/{data.linkedin}</span>}
        {data.portfolio && <span>🌐 {data.portfolio}</span>}
      </div>
    </div>

    {data.summary && (
      <CVSection title="Professional Summary">
        <p style={{ margin: 0, color: "#333" }}>{data.summary}</p>
      </CVSection>
    )}

    {data.experience.length > 0 && (
      <CVSection title="Work Experience">
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "11px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "700", fontSize: "11px" }}>{exp.role}</span>
              <span style={{ color: "#555", fontSize: "9.5px" }}>{exp.period}</span>
            </div>
            <div style={{ color: "#1a3a5c", fontSize: "10px", marginBottom: "3px" }}>
              {exp.company}{exp.location ? ` · ${exp.location}` : ""}
            </div>
            {exp.bullets.filter(b => b.trim()).length > 0 && (
              <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
                {exp.bullets.filter(b => b.trim()).map((b, j) => (
                  <li key={j} style={{ marginBottom: "2px" }}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CVSection>
    )}

    {data.education.length > 0 && (
      <CVSection title="Education">
        {data.education.map((edu, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
            <div>
              <span style={{ fontWeight: "700" }}>{edu.degree}</span>
              {edu.gpa && <span style={{ color: "#555", fontSize: "9.5px" }}> · GPA: {edu.gpa}</span>}
              <div style={{ color: "#555", fontSize: "10px" }}>{edu.school}</div>
            </div>
            <span style={{ color: "#555", fontSize: "9.5px", whiteSpace: "nowrap", marginLeft: "10px" }}>{edu.period}</span>
          </div>
        ))}
      </CVSection>
    )}

    {data.projects.length > 0 && (
      <CVSection title="Projects">
        {data.projects.map((p, i) => (
          <div key={i} style={{ marginBottom: "7px" }}>
            <span style={{ fontWeight: "700" }}>{p.name}</span>
            {p.tech && <span style={{ color: "#555", fontSize: "9.5px" }}> — {p.tech}</span>}
            {p.link && <span style={{ color: "#1a3a5c", fontSize: "9.5px" }}> · {p.link}</span>}
            {p.description && <div>{p.description}</div>}
          </div>
        ))}
      </CVSection>
    )}

    {data.skills.length > 0 && (
      <CVSection title="Technical Skills">
        {data.skills.filter(s => s.category && s.values).map((s, i) => (
          <div key={i} style={{ marginBottom: "3px" }}>
            <span style={{ fontWeight: "700" }}>{s.category}: </span>
            <span style={{ color: "#333" }}>{s.values}</span>
          </div>
        ))}
      </CVSection>
    )}

    {data.certifications.filter(c => c.trim()).length > 0 && (
      <CVSection title="Certifications">
        {data.certifications.filter(c => c.trim()).map((c, i) => (
          <div key={i} style={{ marginBottom: "2px" }}>• {c}</div>
        ))}
      </CVSection>
    )}

    {data.languages && data.languages.filter(l => l.lang).length > 0 && (
      <CVSection title="Languages">
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {data.languages.filter(l => l.lang).map((l, i) => (
            <span key={i}><strong>{l.lang}</strong>{l.level ? ` — ${l.level}` : ""}</span>
          ))}
        </div>
      </CVSection>
    )}
  </div>
);

// Field helpers
const Field = ({ label, value, onChange, multiline, placeholder }) => (
  <div style={{ marginBottom: "10px" }}>
    {label && <label style={labelStyle}>{label}</label>}
    {multiline
      ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""}
          style={{ ...inputStyle, minHeight: "72px", resize: "vertical" }} />
      : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""}
          style={inputStyle} />
    }
  </div>
);

const Row2 = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>{children}</div>
);

export default function CVBuilder() {
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [targetRole, setTargetRole] = useState("Data Scientist / Data Engineer Master's in Italy");
  const [status, setStatus] = useState("");
  const [editSection, setEditSection] = useState("personal");

  const update = (field, value) => setData(d => ({ ...d, [field]: value }));

  const enhanceWithAI = async () => {
    setLoading(true);
    setStatus("🤖 AI is enhancing your CV...");
    try {
      const prompt = `You are a professional CV writer for European university applications and tech jobs.
Enhance this CV for: "${targetRole}"

CV: ${JSON.stringify(data, null, 2)}

Return ONLY valid JSON (no markdown, no backticks) with EXACTLY the same structure, but with:
- "summary": strong 2-3 sentence professional summary
- "experience": improved bullet points with action verbs and quantified impact  
- "title": improved professional title
- All other fields stay exactly the same`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const result = await response.json();
      const text = result.content.map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
      const enhanced = JSON.parse(text);
      setData(enhanced);
      setStatus("✅ CV enhanced! Check the Preview tab.");
      setActiveTab("preview");
    } catch (e) {
      setStatus("❌ Error: " + e.message);
    }
    setLoading(false);
  };

  const tabStyle = (t) => ({
    padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "13px",
    fontWeight: activeTab === t ? "700" : "400",
    color: activeTab === t ? "#1a3a5c" : "#666",
    borderBottom: activeTab === t ? "3px solid #1a3a5c" : "3px solid transparent",
    background: "none",
  });

  const sideBtn = (s) => ({
    display: "block", width: "100%", textAlign: "left",
    padding: "9px 14px", marginBottom: "4px",
    background: editSection === s ? "#e8f0f8" : "transparent",
    color: editSection === s ? "#1a3a5c" : "#444",
    fontWeight: editSection === s ? "700" : "400",
    border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px",
  });

  // ── Edit Sections ─────────────────────────────────────────────────────────
  const EditPersonal = () => (
    <div style={cardStyle}>
      <div style={sectionHeader}>👤 Personal Information</div>
      <Row2>
        <Field label="Full Name" value={data.name} onChange={v => update("name", v)} />
        <Field label="Job Title / Headline" value={data.title} onChange={v => update("title", v)} />
      </Row2>
      <Row2>
        <Field label="Phone" value={data.phone} onChange={v => update("phone", v)} />
        <Field label="Email" value={data.email} onChange={v => update("email", v)} />
      </Row2>
      <Row2>
        <Field label="LinkedIn Username" value={data.linkedin} onChange={v => update("linkedin", v)} placeholder="e.g. arslen-mohamed" />
        <Field label="Portfolio / Website" value={data.portfolio} onChange={v => update("portfolio", v)} placeholder="e.g. mysite.netlify.app" />
      </Row2>
      <Field label="Professional Summary" value={data.summary} onChange={v => update("summary", v)}
        multiline placeholder="Write 2-3 sentences or use ✨ Enhance with AI above..." />
    </div>
  );

  const EditExperience = () => (
    <div>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ ...cardStyle, borderLeft: "4px solid #1a3a5c" }}>
          <div style={sectionHeader}>
            <span>💼 Experience #{i + 1}</span>
            <button style={btnDanger} onClick={() => update("experience", data.experience.filter((_, idx) => idx !== i))}>✕ Remove</button>
          </div>
          <Row2>
            <Field label="Job Title / Role" value={exp.role} onChange={v => {
              const arr = [...data.experience]; arr[i] = { ...arr[i], role: v }; update("experience", arr);
            }} />
            <Field label="Company Name" value={exp.company} onChange={v => {
              const arr = [...data.experience]; arr[i] = { ...arr[i], company: v }; update("experience", arr);
            }} />
          </Row2>
          <Row2>
            <Field label="Location" value={exp.location || ""} onChange={v => {
              const arr = [...data.experience]; arr[i] = { ...arr[i], location: v }; update("experience", arr);
            }} placeholder="e.g. Tunis / Remote / Online" />
            <Field label="Period" value={exp.period} onChange={v => {
              const arr = [...data.experience]; arr[i] = { ...arr[i], period: v }; update("experience", arr);
            }} placeholder="e.g. Jan 2024 – Jul 2024" />
          </Row2>
          <label style={labelStyle}>Bullet Points (achievements & responsibilities)</label>
          {exp.bullets.map((b, j) => (
            <div key={j} style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
              <textarea value={b} rows={2} onChange={e => {
                const arr = [...data.experience];
                arr[i] = { ...arr[i], bullets: arr[i].bullets.map((x, k) => k === j ? e.target.value : x) };
                update("experience", arr);
              }} style={{ ...inputStyle, resize: "vertical", flex: 1 }} placeholder="e.g. Reduced processing time by 40% by optimizing SQL queries..." />
              <button style={{ ...btnDanger, alignSelf: "flex-start", marginTop: "2px" }} onClick={() => {
                const arr = [...data.experience];
                arr[i] = { ...arr[i], bullets: arr[i].bullets.filter((_, k) => k !== j) };
                update("experience", arr);
              }}>✕</button>
            </div>
          ))}
          <button style={{ ...btnPrimary, fontSize: "11px", marginTop: "4px" }} onClick={() => {
            const arr = [...data.experience];
            arr[i] = { ...arr[i], bullets: [...arr[i].bullets, ""] };
            update("experience", arr);
          }}>+ Add Bullet Point</button>
        </div>
      ))}
      <button style={{ ...btnPrimary, width: "100%", padding: "12px" }} onClick={() =>
        update("experience", [...data.experience, { role: "", company: "", location: "", period: "", bullets: [""] }])
      }>+ Add New Experience</button>
    </div>
  );

  const EditEducation = () => (
    <div>
      {data.education.map((edu, i) => (
        <div key={i} style={{ ...cardStyle, borderLeft: "4px solid #2563eb" }}>
          <div style={sectionHeader}>
            <span>🎓 Education #{i + 1}</span>
            <button style={btnDanger} onClick={() => update("education", data.education.filter((_, idx) => idx !== i))}>✕ Remove</button>
          </div>
          <Field label="Degree / Program Name" value={edu.degree} onChange={v => {
            const arr = [...data.education]; arr[i] = { ...arr[i], degree: v }; update("education", arr);
          }} placeholder="e.g. M.Sc. in Data Science" />
          <Field label="School / University" value={edu.school} onChange={v => {
            const arr = [...data.education]; arr[i] = { ...arr[i], school: v }; update("education", arr);
          }} placeholder="e.g. Politecnico di Milano, Italy" />
          <Row2>
            <Field label="Period" value={edu.period} onChange={v => {
              const arr = [...data.education]; arr[i] = { ...arr[i], period: v }; update("education", arr);
            }} placeholder="e.g. 2025–2027" />
            <Field label="GPA (optional)" value={edu.gpa || ""} onChange={v => {
              const arr = [...data.education]; arr[i] = { ...arr[i], gpa: v }; update("education", arr);
            }} placeholder="e.g. 15.8/20 or 3.8/4.0" />
          </Row2>
        </div>
      ))}
      <button style={{ ...btnPrimary, width: "100%", padding: "12px" }} onClick={() =>
        update("education", [...data.education, { degree: "", school: "", period: "", gpa: "" }])
      }>+ Add New Education</button>
    </div>
  );

  const EditProjects = () => (
    <div>
      {data.projects.map((p, i) => (
        <div key={i} style={{ ...cardStyle, borderLeft: "4px solid #059669" }}>
          <div style={sectionHeader}>
            <span>🚀 Project #{i + 1}</span>
            <button style={btnDanger} onClick={() => update("projects", data.projects.filter((_, idx) => idx !== i))}>✕ Remove</button>
          </div>
          <Row2>
            <Field label="Project Name" value={p.name} onChange={v => {
              const arr = [...data.projects]; arr[i] = { ...arr[i], name: v }; update("projects", arr);
            }} />
            <Field label="Technologies Used" value={p.tech} onChange={v => {
              const arr = [...data.projects]; arr[i] = { ...arr[i], tech: v }; update("projects", arr);
            }} placeholder="e.g. Python, FastAPI, PostgreSQL" />
          </Row2>
          <Field label="Description / Impact" value={p.description} onChange={v => {
            const arr = [...data.projects]; arr[i] = { ...arr[i], description: v }; update("projects", arr);
          }} multiline placeholder="What did you build? What was the impact or result?" />
          <Field label="Link (GitHub / Demo — optional)" value={p.link || ""} onChange={v => {
            const arr = [...data.projects]; arr[i] = { ...arr[i], link: v }; update("projects", arr);
          }} placeholder="e.g. github.com/arslen/project-name" />
        </div>
      ))}
      <button style={{ ...btnPrimary, width: "100%", padding: "12px" }} onClick={() =>
        update("projects", [...data.projects, { name: "", description: "", tech: "", link: "" }])
      }>+ Add New Project</button>
    </div>
  );

  const EditSkills = () => (
    <div style={cardStyle}>
      <div style={sectionHeader}>⚡ Technical Skills</div>
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "14px" }}>Each row is a skill category. Separate skills with commas.</div>
      {data.skills.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
          <input value={s.category} onChange={e => {
            const arr = [...data.skills]; arr[i] = { ...arr[i], category: e.target.value }; update("skills", arr);
          }} style={{ ...inputStyle, width: "150px", flexShrink: 0 }} placeholder="Category name" />
          <input value={s.values} onChange={e => {
            const arr = [...data.skills]; arr[i] = { ...arr[i], values: e.target.value }; update("skills", arr);
          }} style={{ ...inputStyle, flex: 1 }} placeholder="skill1, skill2, skill3..." />
          <button style={btnDanger} onClick={() => update("skills", data.skills.filter((_, idx) => idx !== i))}>✕</button>
        </div>
      ))}
      <button style={{ ...btnPrimary, marginTop: "6px" }} onClick={() =>
        update("skills", [...data.skills, { category: "", values: "" }])
      }>+ Add Skill Category</button>
    </div>
  );

  const EditCertLang = () => (
    <div>
      <div style={cardStyle}>
        <div style={sectionHeader}>🏅 Certifications</div>
        {data.certifications.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <input value={c} onChange={e => {
              const arr = [...data.certifications]; arr[i] = e.target.value; update("certifications", arr);
            }} style={{ ...inputStyle, flex: 1 }} placeholder="e.g. Google Data Analytics Professional Certificate" />
            <button style={btnDanger} onClick={() => update("certifications", data.certifications.filter((_, idx) => idx !== i))}>✕</button>
          </div>
        ))}
        <button style={btnPrimary} onClick={() => update("certifications", [...data.certifications, ""])}>+ Add Certification</button>
      </div>

      <div style={cardStyle}>
        <div style={sectionHeader}>🌍 Languages</div>
        {(data.languages || []).map((l, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <input value={l.lang} onChange={e => {
              const arr = [...data.languages]; arr[i] = { ...arr[i], lang: e.target.value }; update("languages", arr);
            }} style={{ ...inputStyle, width: "140px", flexShrink: 0 }} placeholder="Language" />
            <input value={l.level} onChange={e => {
              const arr = [...data.languages]; arr[i] = { ...arr[i], level: e.target.value }; update("languages", arr);
            }} style={{ ...inputStyle, flex: 1 }} placeholder="Level e.g. Native / B2 / Fluent / Intermediate" />
            <button style={btnDanger} onClick={() => update("languages", data.languages.filter((_, idx) => idx !== i))}>✕</button>
          </div>
        ))}
        <button style={btnPrimary} onClick={() => update("languages", [...(data.languages || []), { lang: "", level: "" }])}>+ Add Language</button>
      </div>
    </div>
  );

  const sections = [
    { key: "personal", label: "👤 Personal Info" },
    { key: "experience", label: "💼 Experience" },
    { key: "education", label: "🎓 Education" },
    { key: "projects", label: "🚀 Projects" },
    { key: "skills", label: "⚡ Skills" },
    { key: "certlang", label: "🏅 Certs & Languages" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f0f4f8" }}>
      {/* Top Bar */}
      <div style={{ background: "#1a3a5c", color: "#fff", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px" }}>🎓 AI CV Builder</div>
          <div style={{ fontSize: "11px", opacity: 0.65 }}>ATS-Optimized · Italy Scholarship Ready</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <input value={targetRole} onChange={e => setTargetRole(e.target.value)}
            style={{ padding: "7px 12px", borderRadius: "6px", border: "none", fontSize: "12px", width: "250px", background: "rgba(255,255,255,0.15)", color: "#fff", outline: "none" }}
            placeholder="Target role / program..." />
          <button onClick={enhanceWithAI} disabled={loading}
            style={{ padding: "8px 16px", background: loading ? "#555" : "#f0a500", color: "#111", border: "none", borderRadius: "6px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", fontSize: "13px", whiteSpace: "nowrap" }}>
            {loading ? "⏳ Enhancing..." : "✨ Enhance with AI"}
          </button>
          <button onClick={() => { setActiveTab("preview"); setTimeout(() => window.print(), 300); }}
            style={{ padding: "8px 16px", background: "#fff", color: "#1a3a5c", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>
            🖨️ Print / PDF
          </button>
        </div>
      </div>

      {status && (
        <div style={{ background: status.includes("✅") ? "#d4edda" : status.includes("❌") ? "#f8d7da" : "#fff3cd", padding: "10px 24px", fontSize: "13px", color: "#333", borderBottom: "1px solid #ddd" }}>
          {status}
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ddd", display: "flex", paddingLeft: "20px" }}>
        <button style={tabStyle("edit")} onClick={() => setActiveTab("edit")}>✏️ Edit CV</button>
        <button style={tabStyle("preview")} onClick={() => setActiveTab("preview")}>📄 Preview</button>
        <button style={tabStyle("tips")} onClick={() => setActiveTab("tips")}>💡 Italy Tips</button>
      </div>

      {/* Edit Tab */}
      {activeTab === "edit" && (
        <div style={{ display: "flex", minHeight: "calc(100vh - 120px)" }}>
          <div style={{ width: "195px", flexShrink: 0, background: "#fff", borderRight: "1px solid #e8edf3", padding: "16px 10px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#999", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "4px" }}>Sections</div>
            {sections.map(s => (
              <button key={s.key} style={sideBtn(s.key)} onClick={() => setEditSection(s.key)}>{s.label}</button>
            ))}
            <div style={{ marginTop: "20px", padding: "10px", background: "#f0f7ff", borderRadius: "8px", fontSize: "11px", color: "#1a3a5c", lineHeight: "1.6" }}>
              💡 Every change updates the <strong>Preview</strong> instantly. Click <strong>Preview</strong> tab to see your CV!
            </div>
          </div>
          <div style={{ flex: 1, padding: "24px", overflowY: "auto", maxHeight: "calc(100vh - 120px)" }}>
            {editSection === "personal" && <EditPersonal />}
            {editSection === "experience" && <EditExperience />}
            {editSection === "education" && <EditEducation />}
            {editSection === "projects" && <EditProjects />}
            {editSection === "skills" && <EditSkills />}
            {editSection === "certlang" && <EditCertLang />}
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === "preview" && (
        <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
          <div style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)", borderRadius: "4px", overflow: "hidden" }}>
            <CVPreview data={data} />
          </div>
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === "tips" && (
        <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "680px", width: "100%" }}>
            {[
              { icon: "🏛️", title: "Italian Government Scholarship (MAECI)", tips: ["Apply at universitaly.it — deadline usually March–May", "Covers tuition + €900/month allowance", "Requires B2 Italian OR English for English-taught programs", "Your B2 English certificate (EF SET) is already an asset!"] },
              { icon: "🎓", title: "Best Italian Universities for Data Science", tips: ["Politecnico di Milano — Top engineering school", "Università di Bologna — Oldest in Europe, great CS programs", "Sapienza Roma — Large research university", "Università di Trento — Strong in Data Science (English track)"] },
              { icon: "📋", title: "CV Tips for Italy", tips: ["Keep it to 1 page for Master's applications", "Add a professional photo (common in Italy)", "Include your GPA if it's above average", "Mention motivation for studying in Italy specifically"] },
              { icon: "🌍", title: "Erasmus+ Option", tips: ["If enrolled at a Tunisian university, ask your international office", "Can get 6–12 months in Italy fully funded", "Great way to get Italian university experience before a full degree"] },
            ].map((card, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "10px", padding: "20px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: "4px solid #1a3a5c" }}>
                <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "10px", color: "#1a3a5c" }}>{card.icon} {card.title}</div>
                {card.tips.map((t, j) => <div key={j} style={{ padding: "4px 0", fontSize: "13px", color: "#333" }}>✓ {t}</div>)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
