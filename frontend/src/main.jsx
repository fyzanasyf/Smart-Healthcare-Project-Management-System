import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import axios from "axios";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,Cell} from "recharts";
import "./styles.css";

const API="http://localhost:5000/api";
const api=axios.create({baseURL:API});
const sample={
 name:"Smart Healthcare Project Management System",
 objective:"Develop an integrated healthcare platform for five hospitals covering appointments, laboratory reports, doctor schedules, online consultations and billing.",
 stakeholders:["Project Manager","Hospital Management","Doctors","Patients","QA Team"],
 scopeIn:["Patient appointments","Laboratory reports","Doctor schedules","Online consultations","Hospital billing"],
 scopeOut:["Hospital hardware replacement","Non-software infrastructure"],
 approvedBudget:5000000,
 deadline:"2026-12-01"
};
function App(){
 const [projects,setProjects]=useState([]),[project,setProject]=useState(null),[dash,setDash]=useState(null),[tab,setTab]=useState("Dashboard"),[loading,setLoading]=useState(true);
 const [form,setForm]=useState({title:"",description:"",priority:"High"});
 async function load(){
  setLoading(true); const r=await api.get("/projects"); setProjects(r.data);
  let p=r.data[0]; if(!p){const x=await api.post("/projects",sample); p=x.data;}
  setProject(p); const d=await api.get("/dashboard/"+p._id); setDash(d.data); setLoading(false);
 }
 useEffect(()=>{load().catch(e=>alert(e.message))},[]);
 async function addRequirement(e){e.preventDefault(); if(!form.title.trim())return alert("Requirement title is required"); await api.post("/requirements",{...form,projectId:project._id}); setForm({title:"",description:"",priority:"High"}); alert("Requirement saved"); load();}
 async function addChange(){const title=prompt("Change title (e.g. AI diagnosis + mobile app)"); if(!title)return; await api.post("/changes",{projectId:project._id,title,justification:"Hospital management requested additional capabilities.",costImpact:800000,scheduleImpact:21,requestedBy:"Hospital Management"}); alert("Change request created. Approve it from Change Requests."); load();}
 async function approve(id){await api.post("/changes/"+id+"/approve"); alert("Approved change applied to scope decision. Cost +PKR 800,000 and schedule +21 days."); load();}
 if(loading||!project||!dash)return <div className="center">Loading Smart Healthcare PMS...</div>;
 const s=dash.stats;
 const nav=["Dashboard","Project Charter","Requirements","WBS & Schedule","Cost & EVM","Quality & Risks","Change Requests"];
 return <div className="app">
  <aside><h2>SmartCare PMS</h2><p className="muted">Healthcare Project Control</p>{nav.map(n=><button className={tab===n?"nav active":"nav"} onClick={()=>setTab(n)} key={n}>{n}</button>)}<div className="sidebox"><b>Budget</b><div>PKR {project.approvedBudget.toLocaleString()}</div><b>Deadline</b><div>{new Date(project.deadline).toLocaleDateString()}</div></div></aside>
  <main><header><div><h1>{tab}</h1><span className="muted">{project.name}</span></div><button className="primary" onClick={addChange}>+ Change Request</button></header>
   {tab==="Dashboard"&&<Dashboard s={s} dash={dash}/>}
   {tab==="Project Charter"&&<Charter p={project}/>}
   {tab==="Requirements"&&<Requirements dash={dash} form={form} setForm={setForm} addRequirement={addRequirement}/>}
   {tab==="WBS & Schedule"&&<Schedule tasks={dash.tasks}/>}
   {tab==="Cost & EVM"&&<EVM s={s} budget={project.approvedBudget}/>}
   {tab==="Quality & Risks"&&<Quality dash={dash}/>}
   {tab==="Change Requests"&&<Changes changes={dash.changes} approve={approve}/>}
  </main>
 </div>
}
function Dashboard({s,dash}){return <><div className="cards">{[["PV",s.PV],["EV",s.EV],["AC",s.AC],["CPI",s.CPI.toFixed(2)],["SPI",s.SPI.toFixed(2)],["Delayed",s.delayedTasks],["Pending Changes",s.pendingChanges],["Critical Defects",s.criticalDefects]].map(([a,b])=><div className="card" key={a}><span>{a}</span><strong>{typeof b==="number"&&["PV","EV","AC"].includes(a)?"PKR "+b.toLocaleString():b}</strong></div>)}</div><div className="grid2"><section className="panel"><h3>Project Health</h3><ResponsiveContainer width="100%" height={260}><BarChart data={[{name:"PV",value:s.PV},{name:"EV",value:s.EV},{name:"AC",value:s.AC}]}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value"/></BarChart></ResponsiveContainer></section><section className="panel"><h3>Management Alerts</h3>{s.delayedTasks>0&&<div className="alert">⚠ {s.delayedTasks} delayed activity/activities.</div>}{s.pendingChanges>0&&<div className="alert">⚠ {s.pendingChanges} change request(s) awaiting approval.</div>}{s.criticalDefects>0&&<div className="danger">✕ {s.criticalDefects} unresolved critical defect(s).</div>}{s.CPI<0.9&&<div className="danger">Cost performance below 0.90.</div>}{s.SPI<0.9&&<div className="danger">Schedule performance below 0.90.</div>}{!s.delayedTasks&&!s.pendingChanges&&!s.criticalDefects&&<div className="success">✓ No major alerts.</div>}</section></div></>}
function Charter({p}){return <div className="panel"><h3>Project Charter & Management Plan</h3><div className="detail"><b>Objective</b><p>{p.objective}</p><b>Stakeholders</b><p>{p.stakeholders?.join(" • ")}</p><b>In Scope</b><p>{p.scopeIn?.join(" • ")}</p><b>Out of Scope</b><p>{p.scopeOut?.join(" • ")}</p><div className="cards mini"><div className="card"><span>Approved Budget</span><strong>PKR {p.approvedBudget.toLocaleString()}</strong></div><div className="card"><span>Deadline</span><strong>{new Date(p.deadline).toLocaleDateString()}</strong></div><div className="card"><span>Status</span><strong>{p.status}</strong></div></div></div></div>}
function Requirements({dash,form,setForm,addRequirement}){return <div className="grid2"><section className="panel"><h3>Add Requirement</h3><form onSubmit={addRequirement}><input placeholder="Requirement title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select><button className="primary">Save Requirement</button></form></section><section className="panel"><h3>Scope Control</h3><p>Only requirements with <b>Approved</b> status are allowed into the approved scope.</p><table><thead><tr><th>Requirement</th><th>Priority</th><th>Status</th></tr></thead><tbody>{(dash.requirements||[]).map(x=><tr key={x._id}><td>{x.title}</td><td>{x.priority}</td><td>{x.status}</td></tr>)}</tbody></table></section></div>}
function Schedule({tasks}){return <div className="panel"><h3>Gantt-style Activity Timeline</h3>{tasks.length===0?<p>No activities yet. Use the API or add tasks through the backend.</p>:<div className="gantt">{tasks.map(t=><div className="grow" key={t._id}><div className="taskname">{t.name}<small>{t.assignee||"Unassigned"} • {t.percentComplete}%</small></div><div className="track"><div className="bar" style={{width:Math.max(8,t.percentComplete)+"%"}}></div></div><div>{new Date(t.startDate).toLocaleDateString()}</div><div>{new Date(t.endDate).toLocaleDateString()}</div></div>)}</div>}</div>}
function EVM({s,budget}){return <div className="grid2"><section className="panel"><h3>Earned Value Management</h3><table><tbody><tr><th>Approved Budget</th><td>PKR {budget.toLocaleString()}</td></tr><tr><th>PV</th><td>PKR {s.PV.toLocaleString()}</td></tr><tr><th>EV</th><td>PKR {s.EV.toLocaleString()}</td></tr><tr><th>AC</th><td>PKR {s.AC.toLocaleString()}</td></tr><tr><th>CPI</th><td>{s.CPI.toFixed(2)}</td></tr><tr><th>SPI</th><td>{s.SPI.toFixed(2)}</td></tr></tbody></table></section><section className="panel"><h3>Threshold Monitoring</h3><div className={s.CPI<0.9?"danger":"success"}>{s.CPI<0.9?"⚠ CPI below 0.90":"✓ CPI acceptable"}</div><div className={s.SPI<0.9?"danger":"success"}>{s.SPI<0.9?"⚠ SPI below 0.90":"✓ SPI acceptable"}</div></section></div>}
function Quality({dash}){return <div className="grid2"><section className="panel"><h3>Defect Tracking</h3><table><thead><tr><th>Defect</th><th>Severity</th><th>Module</th><th>Status</th></tr></thead><tbody>{dash.defects.map(d=><tr key={d._id}><td>{d.title}</td><td>{d.severity}</td><td>{d.module}</td><td>{d.status}</td></tr>)}</tbody></table></section><section className="panel"><h3>Risk Prioritization / PDPC</h3>{dash.risks.map(r=><div className="risk" key={r._id}><b>{r.title}</b><span>Score: {r.likelihood*r.impact}/25</span><p>Preventive/Corrective action: {r.response}</p></div>)}</section></div>}
function Changes({changes,approve}){return <div className="panel"><h3>Change Control Board</h3><table><thead><tr><th>Change</th><th>Cost</th><th>Schedule</th><th>Status</th><th></th></tr></thead><tbody>{changes.map(c=><tr key={c._id}><td>{c.title}<small>{c.justification}</small></td><td>PKR {c.costImpact.toLocaleString()}</td><td>+{c.scheduleImpact} days</td><td>{c.status}</td><td>{c.status==="Pending"&&<button className="small" onClick={()=>approve(c._id)}>Approve</button>}</td></tr>)}</tbody></table></div>}

createRoot(document.getElementById("root")).render(<App/>);
