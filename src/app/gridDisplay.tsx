"use client";
import { useState } from "react";
import { Repo } from "./types";
export default function GridDisplay({ repos }: { repos: Repo[] }) {
  const [query, setQuery] = useState("");

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>
        Saluca repos
      </h1>
      <p style={{ color: "#888", marginBottom: "1.5rem" }}>
        {repos.length} public repositories
      </p>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "0.6rem 1rem",
          fontSize: "0.9rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "2rem",
          outline: "none",
        }}
      />

      {filteredRepos.length === 0 && (
        <p style={{ color: "#888" }}> No repos match: {query}</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {filteredRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                backgroundColor: "#fff",
              }}
            >
              <h2 style={{ fontSize: "1rem", margin: 0 }}>{repo.name}</h2>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#555",
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {repo.description ?? "No description"}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  color: "#888",
                  marginTop: "0.5rem",
                }}
              >
                <span>⭐ {repo.stargazers_count}</span>
                <span>{repo.language ?? "Unknown"}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
