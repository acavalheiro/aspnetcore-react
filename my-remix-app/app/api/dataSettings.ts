

export type SettingsRecord = {
  id: string;
  guid: string;
};




export async function getAllSettings(query?: string | null) {
  const data = await fetch("https://localhost:7092/api/Settings/Data");
  return await data.json() as SettingsRecord[];
}

export async function getSettings(id?: string) {
  const data = await fetch(`https://localhost:7092/api/Settings/Get/${id}`);
  return await data.json() as SettingsRecord
}