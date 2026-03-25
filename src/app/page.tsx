import GridDisplay from "./gridDisplay";
import { Repo } from "./types";

async function getRepo(): Promise<Repo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/Saluca/repos`, {
      next: { revalidate: 3600 }, // refresh data every hour
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const repoData: Repo[] = await response.json();
    return repoData;
  } catch (error) {
    console.error("Error fetching repository:", error);
    throw error;
  }
}

export default async function Page() {
  const repos = await getRepo();

  return (
    <main>
      <GridDisplay repos={repos} />
    </main>
  );
}
