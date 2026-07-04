export default function PageHeader({ title, subtitle, action }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Student Portal</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action ? <div className="header-action">{action}</div> : null}
    </header>
  );
}
