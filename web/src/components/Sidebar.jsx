function Sidebar() {
  return (
    <aside className="product-sidebar">
      <header className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">
          S
        </span>
        <div>
          <strong>Satoshi</strong>
          <p>Conversational Workspace</p>
        </div>
      </header>

      <section className="sidebar-section">
        <h2>Workspace</h2>
        <nav className="sidebar-nav">
          <button type="button" className="sidebar-item is-active">
            Conversas
          </button>
          <button type="button" className="sidebar-item">
            Insights
          </button>
          <button type="button" className="sidebar-item">
            Configuracoes
          </button>
        </nav>
      </section>

      <section className="sidebar-section">
        <h2>Operacao</h2>
        <div className="status-card">
          <p>Disponibilidade da plataforma</p>
          <span>
            <i />
            Operacional
          </span>
        </div>
      </section>

      <footer className="sidebar-footer">
        <p>OpenAI Responses API</p>
        <p>Node + React</p>
      </footer>
    </aside>
  );
}

export default Sidebar;
