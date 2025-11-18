export default function Sidebar(){
  return (
    <aside className="fixed w-64 h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Jarvis</h1>

      <nav className="flex flex-col gap-2">
        <button className="text-left p-2 rounded hover:bg-neutral-800">داشبورد</button>
        <button className="text-left p-2 rounded bg-neutral-800">کارها</button>
        <button className="text-left p-2 rounded hover:bg-neutral-800">دستیار</button>
      </nav>
    </aside>
  );
}
