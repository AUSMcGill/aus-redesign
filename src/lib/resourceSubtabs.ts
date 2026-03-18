export interface ResourceSubtab {
  name: string;
  gid: string;
  slug: string;
}

const RESOURCE_PUBHTML_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTdYqXi8L_HjdpcpOCwG8tUiXIP5VMRQlHr9uU3FEWfm6ST2DODWTlemCQdcnQQF3LvPBibxJPwx23D/pubhtml';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function fetchResourceSubtabs(): Promise<ResourceSubtab[]> {
  const res = await fetch(RESOURCE_PUBHTML_URL, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch resource subtabs: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  const itemRegex = /items\.push\(\{name:\s*"([^"]+)",\s*pageUrl:\s*"[^"]*gid=([0-9]+)"/g;
  const subtabs: ResourceSubtab[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null = itemRegex.exec(html);

  while (match) {
    const name = match[1]?.trim();
    const gid = match[2]?.trim();
    if (name && gid && gid !== '0') {
      const slug = slugify(name);
      const key = `${slug}-${gid}`;
      if (slug && !seen.has(key)) {
        seen.add(key);
        subtabs.push({ name, gid, slug });
      }
    }
    match = itemRegex.exec(html);
  }

  return subtabs;
}
