import GridDisplay from "./gridDisplay";
import { RepoFetchResult } from "./types";

async function getRepo(): Promise<RepoFetchResult> {
  try {
    const response = await fetch(`https://api.github.com/users/Saluca/repos`, {
      next: { revalidate: 3600 }, // refresh data every hour
    });
    if (response.status === 404) {
      console.warn("GitHub user not found");
      return { status: "not-found" };
    }
    if (!response.ok) {
      const message = `Failed to fetch repositories (${response.status})`;
      console.error(message);
      return { status: "error", message };
    }
    const repos = await response.json();
    return { status: "ok", repos };
  } catch (error) {
    console.error("Error fetching repository:", error);
    return { status: "error", message: "Error fetching repositories" };
  }
}

export default async function Page() {
  const result = await getRepo();

  if (result.status === "not-found") {
    return (
      <main>
        <p style={{ fontFamily: "Geist" }}>
          GitHub user not found. Check the username and try again.
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
          No repositories available for this user yet.
        </p>
      </main>
    );
  }

  return (
    <main>
      <GridDisplay repos={result.repos} />
    </main>
  );
}
