import { execSync } from 'child_process';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ You must provide a migration name!');
  process.exit(1);
}

const migrationName = args[0];
const fullPath = `src/migrations/${migrationName}`;

const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/config/database.ts ${fullPath}`;

console.log(`📦 Running: ${command}`);
execSync(command, { stdio: 'inherit' });
