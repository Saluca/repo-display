import GridDisplay from "./gridDisplay";
import { RepoFetchResult } from "./types";

async function getRepos(username: string): Promise<RepoFetchResult> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      { next: { revalidate: 3600 } },
    );
    if (response.status === 404) {
      return { status: "not-found" };
    }
    if (!response.ok) {
      const message = `Failed to fetch repositories (${response.status})`;
      return { status: "error", message };
    }
    const repos = await response.json();
    return { status: "ok", repos };
  } catch {
    return { status: "error", message: "Error fetching repositories" };
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user } = await searchParams;
  const username = typeof user === "string" ? user.trim() : "";

  if (!username) {
    return (
      <main>
        <div style={{ maxWidth: "500px", margin: "4rem auto", padding: "2rem" }}>
          <h1 style={{ fontFamily: "Geist", marginBottom: "0.5rem" }}>
            GitHub Card
          </h1>
          <p
            style={{ fontFamily: "Geist", color: "#555", marginBottom: "1.5rem" }}
          >
            Enter a GitHub username to browse their repositories.
          </p>
          <form method="GET" style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              name="user"
              placeholder="GitHub username"
              style={{
                flex: 1,
                padding: "0.6rem 1rem",
                fontSize: "0.9rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                fontFamily: "Geist",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.6rem 1.2rem",
                fontSize: "0.9rem",
                backgroundColor: "#2d2828",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "Geist",
              }}
            >
              Search
            </button>
          </form>
        </div>
      </main>
    );
  }

  const result = await getRepos(username);

  if (result.status === "not-found") {
    return (
      <main>
        <p style={{ fontFamily: "Geist" }}>
          GitHub user &quot;{username}&quot; not found. Check the username and
          try again.
        </p>
      </main>
    );
  }

  if (result.status === "error") {
    return (
      <main>
        <p style={{ fontFamily: "Geist" }}>
          Unable to load repositories: {result.message}
        </p>
      </main>
    );
  }

  if (result.repos.length === 0) {
    return (
      <main>
        <p style={{ fontFamily: "Geist" }}>
          No repositories available for {username} yet.
        </p>
      </main>
    );
  }

  return (
    <main>
      <GridDisplay repos={result.repos} username={username} />
    </main>
  );
}
