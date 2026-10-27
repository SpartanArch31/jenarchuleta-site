'use client';

// On phones the category chips become one tidy dropdown.
export default function CategorySelect({ options, active }) {
  return (
    <div className="category-select">
      <label htmlFor="journal-category" className="visually-hidden">Category</label>
      <select
        id="journal-category"
        value={options.find((o) => o.label === active)?.href || '/journal'}
        onChange={(event) => {
          window.location.href = event.target.value;
        }}
      >
        {options.map((o) => (
          <option key={o.label} value={o.href}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
