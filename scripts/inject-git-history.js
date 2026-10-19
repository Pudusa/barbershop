import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Inject Git History script: Extracts recent git commits and repository status
 * to provide contextual history for agents and developer workflow.
 */
try {
  let gitLog = 'No git history (not a git repository)';
  let gitStatus = 'No git status';
  
  try {
    gitLog = execSync('git log -n 10 --oneline --no-merges', { encoding: 'utf-8' }).trim();
    gitStatus = execSync('git status --short', { encoding: 'utf-8' }).trim();
  } catch (e) {
    // Git repo not initialized yet
  }
  
  const content = `# Git History Context\n\n## Recent Commits\n\`\`\`\n${gitLog}\n\`\`\`\n\n## Working Directory Status\n\`\`\`\n${gitStatus || 'Clean'}\n\`\`\`\n`;
  
  const dir = path.resolve('.gemini');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dir, 'git-history.md'), content, 'utf-8');
  console.log('Successfully generated .gemini/git-history.md context.');
} catch (error) {
  console.error('Failed to generate git history context:', error);
}
