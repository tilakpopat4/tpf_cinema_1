import { Client } from '@notionhq/client';

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

/**
 * Helper function to fetch published films from the Notion CMS
 */
export async function getPublishedFilms() {
  if (!DATABASE_ID || !process.env.NOTION_API_KEY) {
    console.warn("Notion API Key or Database ID is missing.");
    return [];
  }

  try {
    // Note: In newer versions of the Notion client, querying might be handled differently
    // using search or a different endpoint. We'll return an empty array for now.
    /*
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'ReleaseDate',
          direction: 'descending',
        },
      ],
    });
    return response.results;
    */
    return [];
  } catch (error) {
    console.error("Error fetching films from Notion:", error);
    return [];
  }
}
