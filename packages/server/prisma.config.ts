import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

// Load .env manually
dotenv.config();

export default defineConfig({
   schema: 'prisma/schema.prisma',
   migrations: {
      path: 'prisma/migrations',
   },
});
