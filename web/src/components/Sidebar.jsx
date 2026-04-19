function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-dot" />
        <strong>chatgpt-clone-dio</strong>
      </div>

      <nav className="sidebar-nav">
        <button type="button" className="sidebar-item active">
          Novo chat
        </button>
        <button type="button" className="sidebar-item">
          Historico local
        </button>
        <button type="button" className="sidebar-item">
          Sobre o projeto
        </button>
      </nav>

      <footer className="sidebar-footer">
        <p>Node + Express + OpenAI Responses API</p>
        <p>React + Vite</p>
      </footer>
    </aside>
  );
}

export default Sidebar;

