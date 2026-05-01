
'use client';
import React,{useEffect,useState} from 'react';
export default function Page(){
 const [rows,setRows]=useState<any[]>([]);
 useEffect(()=>{fetch('https://opensheet.elk.sh/1dnf40QK7gWxDxifolX1ryvMJoW0NQlMKgq-J63ycT28/External').then(r=>r.json()).then(setRows)},[]);
 return <main style={{padding:24,fontFamily:'Arial'}}>
 <h1>ATR/BPN Monitoring Dashboard</h1>
 <p>Total Berkas: {rows.length}</p>
 <table border={1} cellPadding={6}><thead><tr><th>No Hak</th><th>Pemilik</th></tr></thead>
 <tbody>{rows.slice(0,20).map((r,i)=><tr key={i}><td>{r['Nomor Hak']}</td><td>{r['Nama Pemilik']}</td></tr>)}</tbody></table>
 </main>
}
