'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Row = Record<string,string>;

export default function Page(){
 const [rows,setRows]=useState<Row[]>([]);
 const [loading,setLoading]=useState(true);
 const [q,setQ]=useState('');

 useEffect(()=>{
   async function load(){
     const res = await fetch('https://opensheet.elk.sh/1dnf40QK7gWxDxifolX1ryvMJoW0NQlMKgq-J63ycT28/External');
     const data = await res.json();
     setRows(data);
     setLoading(false);
   }
   load();
 },[]);

 const filtered=useMemo(()=>rows.filter(r=>JSON.stringify(r).toLowerCase().includes(q.toLowerCase())),[rows,q]);
 const total=rows.length;
 const selesai=rows.filter(r=>(r['Status SU']||'').toLowerCase().includes('selesai')).length;
 const proses=rows.filter(r=>(r['Status SU']||'').toLowerCase().includes('proses')).length;
 const pending=rows.filter(r=>(r['Status BT']||'').toLowerCase().includes('pending')).length;
 const progress=Math.round((selesai/Math.max(total,1))*100);
 const pie=[{name:'Selesai',value:selesai},{name:'Proses',value:proses},{name:'Pending',value:pending},{name:'Lainnya',value:Math.max(total-selesai-proses-pending,0)}];
 const colors=['#16a34a','#2563eb','#eab308','#94a3b8'];

 return <main className='min-h-screen bg-gradient-to-br from-sky-50 to-white p-6 space-y-6'>
   <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
     <div><h1 className='text-4xl font-bold text-sky-900'>ATR/BPN Monitoring Dashboard</h1><p className='text-slate-500'>Next.js Realtime Monitoring System</p></div>
     <Badge className='text-sm px-4 py-2'>{new Date().toLocaleDateString()}</Badge>
   </div>

   <div className='grid md:grid-cols-4 gap-4'>
     {box('Total Berkas',total)}{box('Selesai',selesai)}{box('Proses',proses)}{box('Pending',pending)}
   </div>

   <Card><CardContent className='p-5'><div className='font-semibold mb-2'>Progress Penyelesaian</div><Progress value={progress}/><div className='mt-2 text-sm text-slate-500'>{progress}% selesai</div></CardContent></Card>

   <div className='grid md:grid-cols-2 gap-4'>
     <Card><CardContent className='p-4 h-80'><ResponsiveContainer width='100%' height='100%'><PieChart><Pie data={pie} dataKey='value' label outerRadius={110}>{pie.map((e,i)=><Cell key={i} fill={colors[i]} />)}</Pie></PieChart></ResponsiveContainer></CardContent></Card>
     <Card><CardContent className='p-4 h-80'><ResponsiveContainer width='100%' height='100%'><BarChart data={pie}><XAxis dataKey='name'/><YAxis/><Tooltip/><Bar dataKey='value'/></BarChart></ResponsiveContainer></CardContent></Card>
   </div>

   <Card><CardContent className='p-5 space-y-4'>
     <Input placeholder='Cari nomor hak / pemilik / kecamatan...' value={q} onChange={e=>setQ(e.target.value)} />
     {loading ? <div>Loading data...</div> : <div className='overflow-auto max-h-[520px]'>
       <table className='w-full text-sm'>
         <thead><tr className='border-b bg-slate-50'><th className='text-left p-2'>No Hak</th><th className='text-left p-2'>Pemilik</th><th className='text-left p-2'>Layanan</th><th className='text-left p-2'>Kecamatan</th><th className='text-left p-2'>Status</th></tr></thead>
         <tbody>{filtered.slice(0,100).map((r,i)=><tr key={i} className='border-b hover:bg-sky-50'><td className='p-2'>{r['Nomor Hak']}</td><td className='p-2'>{r['Nama Pemilik']}</td><td className='p-2'>{r['Jenis Proses Pelayanan']}</td><td className='p-2'>{r['Nama Kecamatan']}</td><td className='p-2'><Badge>{r['Status SU']||r['Status BT']||'-'}</Badge></td></tr>)}</tbody>
       </table>
     </div>}
   </CardContent></Card>
 </main>
}

function box(t:string,v:any){return <Card><CardContent className='p-5'><div className='text-slate-500 text-sm'>{t}</div><div className='text-4xl font-bold text-sky-900'>{v}</div></CardContent></Card>}
