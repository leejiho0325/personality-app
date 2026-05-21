"use client";
import { useState, useEffect } from "react";

const questions = [
  { category: "내면 심리", text: "당신이 가장 숨기고 싶은 것은?", context: "아무도 모른다고 가정했을 때, 당신 안에 있는 것.", choices: ["내가 생각만큼 괜찮은 사람이 아닐 수도 있다는 두려움", "진심으로 원하는 게 뭔지 사실 잘 모른다는 것", "누군가를 깊이 필요로 하면서도 드러내지 못한다는 것", "지금 이 삶이 내가 진짜 원하던 삶이 아닐 수 있다는 감각"] },
  { category: "내면 심리", text: "타인에게 어떤 사람으로 기억되고 싶나요?", context: "사회적으로 올바른 답 말고, 진짜로 원하는 것.", choices: ["존경받는 사람. 능력 있고 흔들리지 않는.", "따뜻한 사람. 곁에 있으면 편안해지는.", "자유로운 사람. 자기 방식대로 사는.", "의미 있는 사람. 무언가를 남긴."] },
  { category: "내면 심리", text: "스스로를 가장 자책할 때는?", context: "잘못이 아니어도 자책하게 되는 패턴.", choices: ["누군가에게 실망을 줬거나 기대에 못 미쳤을 때", "감정적으로 반응해서 내가 원하는 모습이 아니었을 때", "해야 할 일을 미루거나 흐지부지 넘긴 것 같을 때", "타인의 감정보다 내 것을 먼저 챙겼다는 느낌이 들 때"] },
  { category: "관계와 애착", text: "가까운 사람이 갑자기 연락을 끊었습니다.", context: "며칠째 답장이 없고, 이유도 모르는 상황.", choices: ["내가 뭔가 잘못한 건지 자꾸 되짚어본다", "연락해서 무슨 일인지 직접 물어본다", "상대방 사정이 있겠지 생각하고 기다린다", "서운하지만 먼저 다가가지 않기로 한다"] },
  { category: "관계와 애착", text: "누군가와 함께 있을 때 외로움을 느끼는 순간은?", context: "혼자 있을 때가 아닌, 함께 있을 때.", choices: ["내 진짜 감정을 말했는데 상대가 이해 못 한다고 느낄 때", "상대는 편해 보이는데 나만 애쓰고 있다는 느낌이 들 때", "깊은 대화 없이 표면적인 말만 오갈 때", "내가 어떤 역할을 해야 하는지만 신경 쓰일 때"] },
  { category: "관계와 애착", text: "누군가를 아낄 때 가장 먼저 하는 행동은?", context: "의식하지 않아도 자연스럽게 나오는 것.", choices: ["그 사람에게 필요한 게 뭔지 파악하고 도우려 한다", "함께 있는 시간을 자꾸 만들려 한다", "솔직한 말을 해주려 한다. 듣기 불편해도.", "그 사람이 잘 되도록 뒤에서 응원한다"] },
  { category: "자아상", text: "스스로에 대해 가장 확신하지 못하는 것은?", context: "성취나 능력이 아닌, 존재 자체에 대한 이야기.", choices: ["나는 충분히 사랑받을 자격이 있는가", "나는 타인에게 진짜로 중요한 존재인가", "나는 나 자신을 제대로 알고 있는가", "나는 지금 올바른 방향으로 살고 있는가"] },
  { category: "자아상", text: "누군가 진심으로 칭찬했을 때 내면의 첫 반응은?", context: "외부에 드러내는 반응이 아닌, 내면에서 먼저 일어나는 것.", choices: ["기쁘지만 '다 알지는 못해서'라는 생각이 든다", "진심으로 기쁘게 받아들인다", "뭔가 돌려줘야 할 것 같은 느낌이 든다", "칭찬의 진의를 먼저 파악하려 한다"] },
  { category: "삶의 태도", text: "삶이 뜻대로 안 될 때, 이유를 어디서 찾나요?", context: "의식적이든 무의식적이든, 먼저 향하는 곳.", choices: ["나 자신에게서. 내가 뭘 놓쳤는지 돌아본다", "상황이나 환경에서. 조건이 달랐다면 달랐을 것", "타이밍에서. 때가 아니었다", "이유보다 다음을 먼저 생각한다"] },
  { category: "삶의 태도", text: "'잘 살고 있다'는 감각은 언제 오나요?", context: "남들 기준이 아닌, 스스로 느끼는 기준.", choices: ["무언가를 해냈거나 성장했다는 느낌이 들 때", "소중한 사람들과 깊이 연결되어 있다는 느낌이 들 때", "내 방식대로 하루를 보냈다는 느낌이 들 때", "지금 이 순간이 충분하다는 느낌이 들 때"] },
  { category: "연애", text: "연애에서 가장 힘든 순간은?", context: "상대 잘못이 아닌, 나로 인해 생기는 어려움.", choices: ["내 감정을 있는 그대로 표현하는 것", "상대가 나를 진짜로 좋아하는지 확신 못 하는 것", "가까워질수록 오히려 불안해지는 것", "너무 많이 맞춰주다 지치는 것"] },
  { category: "연애", text: "연인과 크게 다퉜을 때 첫 반응은?", context: "감정이 격해진 직후, 가장 먼저 하고 싶은 것.", choices: ["혼자 있고 싶다. 생각을 정리할 시간이 필요하다", "바로 화해하고 싶다. 이 불편함을 빨리 끝내고 싶다", "내가 뭘 잘못했는지 계속 되짚어본다", "상대가 먼저 연락해오길 기다린다"] },
  { category: "핵심", text: "가장 용기 내기 어려운 것은?", context: "하고 싶지만 아직 못 하고 있거나 계속 미루는 것.", choices: ["내가 원하는 것을 원한다고 말하는 것", "관계에서 진짜 감정을 드러내는 것", "지금의 삶을 바꾸는 것", "나 자신을 있는 그대로 받아들이는 것"] },
  { category: "스트레스", text: "많이 지치거나 힘들 때 당신은 어떻게 하나요?", context: "의식적으로 선택하는 게 아닌, 자동으로 하게 되는 것.", choices: ["혼자만의 시간을 갖는다. 조용히 충전이 필요하다", "누군가와 대화하거나 만나서 풀린다", "뭔가에 몰두한다. 운동, 게임, 유튜브 등", "그냥 버티다 보면 지나간다"] },
  { category: "스트레스", text: "극도로 스트레스받을 때 나오는 나쁜 습관은?", context: "알면서도 하게 되는 것.", choices: ["폭식하거나 아예 못 먹는다", "모든 걸 미루고 누워만 있는다", "필요 이상으로 남 눈치를 보거나 예민해진다", "혼자 삭이다가 갑자기 폭발한다"] },
  { category: "여행", text: "여행을 간다면 어떤 스타일인가요?", context: "진짜 선호하는 방식.", choices: ["빼곡한 계획을 세우고 그대로 움직인다", "큰 틀만 잡고 즉흥적으로 움직인다", "아무 계획 없이 그냥 떠난다", "혼자보다 누군가와 함께 가는 게 중요하다"] },
];

const catColor = { "내면 심리": "#b8976a", "관계와 애착": "#6a8ab8", "자아상": "#8a6ab8", "삶의 태도": "#6ab88a", "연애": "#c46a8a", "핵심": "#c0bdb8", "스트레스": "#b86a6a", "여행": "#6ab8a8" };
const letters = ["A", "B", "C", "D"];
const C = { bg: "#090909", card: "#141414", border: "#252525", accent: "#b8976a", accent2: "#6a8ab8", love: "#c46a8a", text: "#ddd8d0", muted: "#666260", highlight: "#ede8e0", soft: "#a09c98" };

function Intro({ onStart }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:"2rem 1.4rem", textAlign:"center" }}>
      <p style={{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.35em", color:C.accent, marginBottom:"1.8rem" }}>DEEP · SELF · PORTRAIT</p>
      <h1 style={{ fontFamily:"Georgia,serif", fontSize:"2.8rem", fontWeight:300, lineHeight:1.15, color:C.highlight, marginBottom:"0.2rem" }}>
        당신은<br /><em style={{ color:C.accent }}>진짜로</em><br />누구인가
      </h1>
      <div style={{ width:1, height:48, background:`linear-gradient(to bottom,${C.accent},transparent)`, margin:"1.8rem auto" }} />
      <p style={{ color:C.muted, lineHeight:1.95, fontSize:"0.88rem", marginBottom:"0.6rem" }}>
        MBTI가 아닙니다.<br />
        당신이 무엇을 두려워하고, 무엇을 원하며,<br />
        어떻게 사랑하고, 어떻게 자신을 바라보는지.<br />
        <span style={{ color:C.soft }}>내면의 패턴</span>으로 읽습니다.
      </p>
      <p style={{ fontFamily:"monospace", fontSize:"0.58rem", color:C.muted, letterSpacing:"0.1em", margin:"1.6rem 0 2rem" }}>
        16개 질문 · 솔직할수록 정확합니다
      </p>
      <button onClick={onStart} style={{ width:"100%", maxWidth:300, padding:"1rem", background:"transparent", border:`1px solid ${C.accent}`, color:C.accent, fontFamily:"Georgia,serif", fontSize:"1rem", cursor:"pointer" }}>
        시작하기
      </button>
      <p style={{ fontFamily:"Georgia,serif", fontSize:"0.82rem", color:C.accent, margin:"1.5rem 0 0", lineHeight:1.7 }}>
        이채연씨는 나온 결과를 꼭 보내주세요 🙏
      </p>
      <p style={{ fontFamily:"monospace", fontSize:"0.58rem", color:C.muted, letterSpacing:"0.1em", marginTop:"1rem" }}>
        made by 이지호
      </p>
    </div>
  );
}

function Quiz({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const q = questions[current];
  const color = catColor[q.category] || C.accent;
  const pct = Math.round((current / questions.length) * 100);

  const next = () => {
    if (selected === null) return;
    const na = [...answers, { q: current, c: selected }];
    if (current + 1 >= questions.length) { onFinish(na); }
    else { setAnswers(na); setCurrent(current + 1); setSelected(null); }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <div style={{ padding:"1rem 1.4rem 0.8rem", background:C.bg, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.65rem" }}>
          <span style={{ fontFamily:"monospace", fontSize:"0.6rem", color }}>{q.category.toUpperCase()}</span>
          <span style={{ fontFamily:"monospace", fontSize:"0.6rem", color:C.muted }}>{current + 1} / {questions.length}</span>
        </div>
        <div style={{ height:2, background:C.border, borderRadius:1 }}>
          <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:1, transition:"width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ flex:1, padding:"1.6rem 1.4rem 1rem", overflowY:"auto" }}>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"1.12rem", lineHeight:1.72, color:C.highlight, marginBottom:"0.8rem" }}>{q.text}</p>
        <p style={{ fontSize:"0.8rem", color:C.muted, lineHeight:1.65, fontStyle:"italic", borderLeft:`2px solid ${C.border}`, paddingLeft:"0.85rem", marginBottom:"1.6rem" }}>{q.context}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
          {q.choices.map((choice, i) => {
            const sel = selected === i;
            return (
              <button key={i} onClick={() => setSelected(i)} style={{ background:sel?`${color}18`:"transparent", border:`1px solid ${sel?color:C.border}`, color:sel?C.highlight:C.soft, padding:"1rem 1.1rem", textAlign:"left", cursor:"pointer", fontFamily:"Georgia,serif", fontSize:"0.9rem", lineHeight:1.6, display:"flex", gap:"0.85rem", alignItems:"flex-start", transition:"all 0.15s", borderRadius:0 }}>
                <span style={{ fontFamily:"monospace", fontSize:"0.6rem", color, flexShrink:0, marginTop:"0.22rem" }}>{letters[i]}</span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding:"1rem 1.4rem", background:C.bg, borderTop:`1px solid ${C.border}` }}>
        <button onClick={next} disabled={selected === null} style={{ width:"100%", padding:"1rem", background:selected!==null?color:"transparent", border:`1px solid ${selected!==null?color:C.border}`, color:selected!==null?C.bg:C.border, fontFamily:"Georgia,serif", fontSize:"0.95rem", cursor:selected!==null?"pointer":"not-allowed", transition:"all 0.2s", borderRadius:0 }}>
          {current + 1 === questions.length ? "분석 시작" : "다음"}
        </button>
      </div>
    </div>
  );
}

function Loading() {
  const steps = ["두려움과 욕구의 패턴을 읽는 중…","관계 방식을 분석하는 중…","자아상의 윤곽을 그리는 중…","연애 패턴을 파악하는 중…","당신만의 초상화를 완성하는 중…"];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:"2rem 1.4rem", textAlign:"center" }}>
      <div style={{ width:52, height:52, border:`1px solid ${C.border}`, borderTop:`1px solid ${C.accent}`, borderRadius:"50%", animation:"spin 1.3s linear infinite", marginBottom:"2rem" }} />
      <p style={{ color:C.soft, fontSize:"0.9rem", fontFamily:"Georgia,serif", lineHeight:1.7, minHeight:"3rem" }}>{steps[step]}</p>
      <p style={{ fontFamily:"monospace", fontSize:"0.55rem", color:C.border, letterSpacing:"0.2em", marginTop:"0.6rem" }}>// AI ANALYSIS</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Card({ label, color, children }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, padding:"1.4rem", marginBottom:"0.75rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1rem" }}>
        <span style={{ fontFamily:"monospace", fontSize:"0.57rem", letterSpacing:"0.18em", color:color||C.accent, whiteSpace:"nowrap" }}>{label}</span>
        <div style={{ flex:1, height:1, background:C.border }} />
      </div>
      {children}
    </div>
  );
}

function Result({ data, onRetry }) {
  const [copied, setCopied] = useState(false);

  const copyResult = () => {
    const strengths = data.strengths?.map(s => `  ◆ ${s}`).join("\n") || "";
    const shadows = data.shadows?.map(s => `  ◇ ${s}`).join("\n") || "";
    const growth = data.growth?.map(g => `  → ${g}`).join("\n") || "";

    const text = `✦ ${data.title}
${data.subtitle || ""}

[ 당신이라는 사람 ]
${data.portrait}

[ 내면의 패턴 ]
${data.inner_pattern}
핵심 두려움: ${data.core_fear || ""}

[ 관계 방식 ]
${data.relationship}
${data.attachment_note || ""}

[ 자아상과 자존감 ]
${data.self_image}

[ 연애 방식 ]
${data.love_style || ""}
${data.love_pattern || ""}

[ 강점 ]
${strengths}

[ 그림자 ]
${shadows}

[ 당신에게 ]
"${data.message}"

[ 성장 방향 ]
${growth}

━━━━━━━━━━━━━━━━━━
personality-app-nu.vercel.app`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
    <div style={{ padding:"1.6rem 1.4rem 3rem" }}>
      <div style={{ textAlign:"center", marginBottom:"1.8rem", paddingTop:"0.4rem" }}>
        <p style={{ fontFamily:"monospace", fontSize:"0.57rem", letterSpacing:"0.28em", color:C.accent, marginBottom:"0.75rem" }}>// YOUR INNER PORTRAIT</p>
        <h2 style={{ fontFamily:"Georgia,serif", fontSize:"1.6rem", fontWeight:300, color:C.highlight, lineHeight:1.3 }}>{data.title}</h2>
        {data.subtitle && <p style={{ color:C.muted, fontSize:"0.8rem", marginTop:"0.5rem", fontStyle:"italic" }}>{data.subtitle}</p>}
      </div>

      <Card label="당신이라는 사람" color={C.accent}>
        <p style={{ fontSize:"0.9rem", lineHeight:1.95, color:C.text }}>{data.portrait}</p>
      </Card>

      <Card label="내면의 패턴" color={catColor["내면 심리"]}>
        <p style={{ fontSize:"0.9rem", lineHeight:1.9, color:C.text, marginBottom:data.core_fear?"1rem":0 }}>{data.inner_pattern}</p>
        {data.core_fear && (
          <div style={{ borderLeft:`2px solid ${catColor["내면 심리"]}55`, paddingLeft:"0.85rem" }}>
            <p style={{ fontFamily:"monospace", fontSize:"0.54rem", color:C.muted, letterSpacing:"0.14em", marginBottom:"0.3rem" }}>CORE FEAR</p>
            <p style={{ fontSize:"0.85rem", color:C.soft, fontStyle:"italic", lineHeight:1.7 }}>{data.core_fear}</p>
          </div>
        )}
      </Card>

      <Card label="관계 방식" color={catColor["관계와 애착"]}>
        <p style={{ fontSize:"0.9rem", lineHeight:1.9, color:C.text, marginBottom:data.attachment_note?"1rem":0 }}>{data.relationship}</p>
        {data.attachment_note && (
          <div style={{ background:`${catColor["관계와 애착"]}0e`, padding:"0.85rem", borderLeft:`2px solid ${catColor["관계와 애착"]}44` }}>
            <p style={{ fontSize:"0.84rem", color:C.soft, lineHeight:1.7 }}>{data.attachment_note}</p>
          </div>
        )}
      </Card>

      <Card label="자아상과 자존감" color={catColor["자아상"]}>
        <p style={{ fontSize:"0.9rem", lineHeight:1.9, color:C.text }}>{data.self_image}</p>
      </Card>

      {data.love_style && (
        <Card label="연애 방식" color={C.love}>
          <p style={{ fontSize:"0.9rem", lineHeight:1.9, color:C.text, marginBottom:data.love_pattern?"1rem":0 }}>{data.love_style}</p>
          {data.love_pattern && (
            <div style={{ background:`${C.love}0e`, padding:"0.85rem", borderLeft:`2px solid ${C.love}44` }}>
              <p style={{ fontFamily:"monospace", fontSize:"0.54rem", color:C.love, letterSpacing:"0.13em", marginBottom:"0.3rem" }}>LOVE PATTERN</p>
              <p style={{ fontSize:"0.84rem", color:C.soft, lineHeight:1.7 }}>{data.love_pattern}</p>
            </div>
          )}
        </Card>
      )}

      {data.bad_habits && (
        <Card label="나쁜 습관과 방어기제" color="#b86a6a">
          <p style={{ fontSize:"0.9rem", lineHeight:1.9, color:C.text, marginBottom:data.stress_pattern?"1rem":0 }}>{data.bad_habits}</p>
          {data.stress_pattern && (
            <div style={{ background:"rgba(184,106,106,0.08)", padding:"0.85rem", borderLeft:"2px solid rgba(184,106,106,0.3)" }}>
              <p style={{ fontFamily:"monospace", fontSize:"0.54rem", color:"#b86a6a", letterSpacing:"0.13em", marginBottom:"0.3rem" }}>STRESS PATTERN</p>
              <p style={{ fontSize:"0.84rem", color:C.soft, lineHeight:1.7 }}>{data.stress_pattern}</p>
            </div>
          )}
        </Card>
      )}

      {data.relationship_type && (
        <Card label="나에게 맞는 관계 유형" color="#6ab8a8">
          <p style={{ fontSize:"0.9rem", lineHeight:1.9, color:C.text, marginBottom:data.relationship_advice?"1rem":0 }}>{data.relationship_type}</p>
          {data.relationship_advice && (
            <div style={{ background:"rgba(106,184,168,0.08)", padding:"0.85rem", borderLeft:"2px solid rgba(106,184,168,0.3)" }}>
              <p style={{ fontSize:"0.84rem", color:C.soft, lineHeight:1.7 }}>{data.relationship_advice}</p>
            </div>
          )}
        </Card>
      )}

      <Card label="강점과 그림자" color={C.soft}>
        <p style={{ fontFamily:"monospace", fontSize:"0.54rem", color:C.accent, letterSpacing:"0.14em", marginBottom:"0.75rem" }}>STRENGTHS</p>
        {data.strengths?.map((s, i) => (
          <div key={i} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.75rem", alignItems:"flex-start" }}>
            <span style={{ color:C.accent, flexShrink:0, marginTop:"0.15rem" }}>◆</span>
            <p style={{ fontSize:"0.9rem", color:C.text, lineHeight:1.65 }}>{s}</p>
          </div>
        ))}
        <div style={{ height:1, background:C.border, margin:"1rem 0" }} />
        <p style={{ fontFamily:"monospace", fontSize:"0.54rem", color:"#777", letterSpacing:"0.14em", marginBottom:"0.75rem" }}>SHADOWS</p>
        {data.shadows?.map((s, i) => (
          <div key={i} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.75rem", alignItems:"flex-start" }}>
            <span style={{ color:"#777", flexShrink:0, marginTop:"0.15rem" }}>◇</span>
            <p style={{ fontSize:"0.9rem", color:"#aaa49e", lineHeight:1.65 }}>{s}</p>
          </div>
        ))}
      </Card>

      <Card label="당신에게" color={C.accent2}>
        <p style={{ fontFamily:"Georgia,serif", fontSize:"0.9rem", lineHeight:2, color:C.text, fontStyle:"italic", marginBottom:data.growth?"1.2rem":0 }}>"{data.message}"</p>
        {data.growth && (
          <>
            <p style={{ fontFamily:"monospace", fontSize:"0.54rem", color:C.accent2, letterSpacing:"0.14em", marginBottom:"0.7rem" }}>GROWTH EDGE</p>
            {data.growth.map((g, i) => (
              <div key={i} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.65rem", alignItems:"flex-start" }}>
                <span style={{ color:C.accent2, flexShrink:0 }}>→</span>
                <p style={{ fontSize:"0.88rem", color:C.soft, lineHeight:1.65 }}>{g}</p>
              </div>
            ))}
          </>
        )}
      </Card>

      <button onClick={copyResult} style={{ width:"100%", padding:"1rem", background:copied?"#2a2a2a":"transparent", border:`1px solid ${copied?C.accent:C.border}`, color:copied?C.accent:C.soft, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor:"pointer", marginTop:"0.75rem", borderRadius:0, transition:"all 0.2s" }}>
        {copied ? "✓ 복사됐어요!" : "결과 복사하기"}
      </button>
      <button onClick={onRetry} style={{ width:"100%", padding:"1rem", background:"transparent", border:`1px solid ${C.border}`, color:C.muted, fontFamily:"Georgia,serif", fontSize:"0.88rem", cursor:"pointer", marginTop:"0.5rem", borderRadius:0 }}>
        다시 시작하기
      </button>
    </div>
  );
}

export default function PersonalityApp() {
  const [phase, setPhase] = useState("intro");
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const callAPI = async (prompt) => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    if (d.error) throw new Error(d.error.message || "API 오류");
    if (!d.content || !Array.isArray(d.content)) throw new Error("응답 오류: " + JSON.stringify(d).slice(0, 200));
    return d.content.map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
  };

  const handleFinish = async (answers) => {
    setPhase("loading");
    const summary = answers.map(a => `[${questions[a.q].category}] ${questions[a.q].text} → "${questions[a.q].choices[a.c]}"`).join("\n");
    const base = `심리 분석가. MBTI 라벨 금지. 이해하는 시선으로. 선택 결과:\n\n${summary}\n\n순수 JSON만 출력. 마크다운 없이. 각 값 1-2문장:\n`;
    try {
      const t1 = await callAPI(base + `{"title":"시적인 제목","subtitle":"한 줄 설명","portrait":"핵심 성격 2문장","inner_pattern":"내면 패턴 2문장","core_fear":"핵심 두려움 1문장","relationship":"관계 패턴 2문장","attachment_note":"관계 주의점 1문장","self_image":"자아상 2문장"}`);
      const t2 = await callAPI(base + `{"strengths":["강점1","강점2","강점3"],"shadows":["그림자1","그림자2"],"love_style":"연애 방식 2문장","love_pattern":"연애 반복 패턴 1문장","message":"따뜻한 말 2문장","growth":["제안1","제안2","제안3"]}`);
      const t3 = await callAPI(base + `{"bad_habits":"나쁜 습관과 방어기제 2문장","stress_pattern":"스트레스 반응 패턴 1문장","relationship_type":"나에게 맞는 관계 유형 2문장","relationship_advice":"관계에서 주의할 점 1문장"}`);
      setResult({ ...JSON.parse(t1), ...JSON.parse(t2), ...JSON.parse(t3) });
      setPhase("result");
    } catch (e) {
      setErrMsg(e.message || "알 수 없는 오류");
      setPhase("error");
    }
  };

  return (
    <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif" }}>
      {phase === "intro" && <Intro onStart={() => setPhase("quiz")} />}
      {phase === "quiz" && <Quiz onFinish={handleFinish} />}
      {phase === "loading" && <Loading />}
      {phase === "result" && result && <Result data={result} onRetry={() => { setResult(null); setPhase("intro"); }} />}
      {phase === "error" && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:"2rem 1.4rem", textAlign:"center" }}>
          <p style={{ color:"#b86a6a", marginBottom:"1rem", fontSize:"0.95rem" }}>분석 중 오류가 발생했습니다</p>
          <p style={{ fontFamily:"monospace", fontSize:"0.7rem", color:C.muted, background:C.card, padding:"1rem", marginBottom:"1.5rem", textAlign:"left", lineHeight:1.7, border:`1px solid ${C.border}`, width:"100%" }}>{errMsg}</p>
          <button onClick={() => setPhase("intro")} style={{ padding:"0.9rem 2rem", background:"transparent", border:`1px solid ${C.accent}`, color:C.accent, fontFamily:"Georgia,serif", fontSize:"0.9rem", cursor:"pointer" }}>다시 시작하기</button>
        </div>
      )}
    </div>
  );
}
