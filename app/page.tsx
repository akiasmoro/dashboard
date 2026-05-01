
async function getRows(){
  const res = await fetch('https://opensheet.elk.sh/1dnf40QK7gWxDxifolX1ryvMJoW0NQlMKgq-J63ycT28/External',{cache:'no-store'});
  return res.json();
}
export default async function Page(){
  const rows = await getRows();
  return (
    <main style={{padding:24}}>
      <h1>ATR/BPN Monitoring Dashboard</h1>
      <p>Total Berkas: {rows.length}</p>
      <table border={1} cellPadding={6} style={{borderCollapse:'collapse',width:'100%'}}>
        <thead>
          <tr><th>No Hak</th><th>Pemilik</th><th>Kecamatan</th></tr>
        </thead>
        <tbody>
          {rows.slice(0,20).map((r:any,i:number)=>(
            <tr key={i}>
              <td>{r['Nomor Hak']}</td>
              <td>{r['Nama Pemilik']}</td>
              <td>{r['Nama Kecamatan']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
