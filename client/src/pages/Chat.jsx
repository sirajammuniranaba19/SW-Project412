import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { getAuth } from "../auth";


export default function Chat() {
const { id } = useParams(); // conversationId
const auth = getAuth();
const [msgs, setMsgs] = useState([]);
const [text, setText] = useState("");
const [last, setLast] = useState(null);
const timer = useRef(null);


const load = async () => {
const { data } = await api.get("/api/chat/messages", {
params: { conversationId: id, since: last || "" },
headers: { Authorization: `Bearer ${auth.token}` }
});
if (Array.isArray(data) && data.length) {
setMsgs(prev => [...prev, ...data]);
const lastDate = data[data.length - 1]?.createdAt;
if (lastDate) setLast(lastDate);
}
};


useEffect(()=>{
if (!auth?.token) { alert("Login required"); location.href="/login"; return; }
load();
timer.current = setInterval(load, 3000);
return ()=> clearInterval(timer.current);
}, [id]);


const send = async (e) => {
e.preventDefault();
if (!text.trim()) return;
await api.post("/api/chat/message", { conversationId: id, text }, { headers: { Authorization: `Bearer ${auth.token}` }});
setText("");
await load();
};


return (
<div className="container">
<h1>Chat</h1>
<div className="card" style={{height:420, overflowY:"auto", marginBottom:12, padding:12}}>
{msgs.map((m,i)=>(
<div key={i} style={{margin:"8px 0"}}>
<b>{m.sender === auth.id ? "You" : "Other"}:</b> {m.text}
</div>
))}
</div>
<form className="card" onSubmit={send} style={{display:"flex", gap:8}}>
<input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." />
<button className="btn">Send</button>
</form>
</div>
)
}