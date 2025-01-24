import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

export async function getBase64(imagePathOrUrl: string) {
  try {
    // Sprawdź, czy obrazek jest lokalny
    if (imagePathOrUrl.startsWith('/')) {
      const filePath = path.join(process.cwd(), 'public', imagePathOrUrl);
      const buffer = await fs.readFile(filePath);
      const { base64 } = await getPlaiceholder(buffer);
      return base64;
    } else {
      // Obrazek zdalny
      const response = await fetch(imagePathOrUrl);
      const buffer = await response.arrayBuffer();
      const { base64 } = await getPlaiceholder(Buffer.from(buffer));
      return base64;
    }
  } catch (error) {
    console.error('Error generating Blur Data URL:', error);
    return null; // Zwróć null w przypadku błędu
  }
}
