import "./styles.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2>MyApp</h2>
        <nav className="dashboard-nav">
          <a href="#">Dashboard</a>
          <a href="#">Users</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {/* Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Users</h3>
            <p>1,245</p>
          </div>
        </div>
      </main>
    </div>
  );
}