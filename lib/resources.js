const FALLBACK_RESOURCES = [
  {
    title: "Funding and grants",
    description:
      "Apply for club and student funding with templates and submission guidance.",
    cta: "View funding docs",
    href: "mailto:contact@aus.org.au?subject=Funding%20support",
  },
  {
    title: "Event planning",
    description:
      "Use event checklists, room booking support, and safety requirements.",
    cta: "Get event support",
    href: "mailto:contact@aus.org.au?subject=Event%20support",
  },
  {
    title: "Club operations",
    description:
      "Access constitutional templates, transition kits, and governance policies.",
    cta: "Request toolkit",
    href: "mailto:contact@aus.org.au?subject=Club%20toolkit",
  },
  {
    title: "Academic advocacy",
    description:
      "Read advocacy guidance and learn where to get help with academic issues.",
    cta: "Contact advocacy",
    href: "mailto:contact@aus.org.au?subject=Advocacy%20support",
  },
];

function normalizeGoogleSheetsCsvUrl(rawUrl) {
  if (!rawUrl) return "";

  try {
    const url = new URL(rawUrl);
    const gidFromHash = url.hash.match(/gid=(\d+)/)?.[1];
    const gid = url.searchParams.get("gid") || gidFromHash || "0";

    if (!url.hostname.includes("docs.google.com")) {
      return rawUrl;
    }

    if (url.pathname.includes("/spreadsheets/d/e/")) {
      const publishedMatch = url.pathname.match(
        /\/spreadsheets\/d\/e\/([^/]+)/,
      );
      if (!publishedMatch) return rawUrl;

      const publishedId = publishedMatch[1];
      return `${url.origin}/spreadsheets/d/e/${publishedId}/pub?gid=${gid}&single=true&output=csv`;
    }

    const pathParts = url.pathname.split("/");
    const spreadsheetIdIndex = pathParts.findIndex((part) => part === "d");
    const spreadsheetId =
      spreadsheetIdIndex >= 0 ? pathParts[spreadsheetIdIndex + 1] : "";

    if (!spreadsheetId) return rawUrl;

    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
  } catch {
    return rawUrl;
  }
}

function parseCsv(csvText) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i += 1;
      }
      row.push(current.trim());
      current = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function firstValue(record, keys) {
  for (const key of keys) {
    const value = record[key];
    if (value) return value;
  }
  return "";
}

function normalizeKey(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findHeaderRowIndex(rows) {
  return rows.findIndex((row) => {
    const keys = row.map((cell) => normalizeKey(cell));
    const hasNameLike = keys.some((key) => key.includes("name"));
    const hasPositionLike = keys.some(
      (key) => key.includes("position") || key.includes("role"),
    );
    const hasLinkLike = keys.some(
      (key) =>
        key.includes("link") ||
        key.includes("url") ||
        key.includes("href") ||
        key.includes("email") ||
        key.includes("courriel"),
    );

    return (hasNameLike || hasPositionLike) && hasLinkLike;
  });
}

function buildRecords(rows) {
  const headerRowIndex = findHeaderRowIndex(rows);
  if (headerRowIndex < 0 || headerRowIndex === rows.length - 1) return [];

  const header = rows[headerRowIndex].map((column) => normalizeKey(column));
  const dataRows = rows.slice(headerRowIndex + 1);

  return dataRows.map((row) => {
    const record = {};
    header.forEach((key, index) => {
      if (key) {
        record[key] = (row[index] || "").trim();
      }
    });
    return record;
  });
}

function mapRowToResource(record) {
  const title = firstValue(record, [
    "name",
    "title",
    "resource",
    "resource name",
    "resource title",
  ]);
  const href = firstValue(record, ["link", "url", "href", "resource link"]);
  const description = firstValue(record, [
    "description",
    "summary",
    "details",
    "notes",
  ]);
  const cta = firstValue(record, ["cta", "button", "button_text", "action"]);
  const position = firstValue(record, ["position", "role", "poste"]);
  const personName = firstValue(record, ["name nom", "name", "full name"]);
  const email = firstValue(record, [
    "aus email courriel a fa",
    "email",
    "courriel",
  ]);
  const officeHours = firstValue(record, [
    "office hours heures de bureau",
    "office hours",
    "hours",
  ]);

  if (title && href) {
    return {
      title,
      href,
      description:
        description || "Open this resource for current AUS guidance.",
      cta: cta || "Open resource",
    };
  }

  if (email && (position || personName)) {
    const contactTitle =
      position && personName ? `${position} - ${personName}` : position || personName;
    const sanitizedEmail = email.replace(/^mailto:/i, "");

    return {
      title: contactTitle,
      href: `mailto:${sanitizedEmail}`,
      description:
        officeHours
          ? `Office hours: ${officeHours}`
          : "Reach out directly for support and follow-up.",
      cta: personName ? `Email ${personName}` : "Send email",
    };
  }

  return null;
}

export async function getResources() {
  const rawCsvUrl =
    process.env.RESOURCES_CSV_URL || process.env.NEXT_PUBLIC_RESOURCES_CSV_URL;
  if (!rawCsvUrl) return FALLBACK_RESOURCES;

  const csvUrl = normalizeGoogleSheetsCsvUrl(rawCsvUrl);

  try {
    const response = await fetch(csvUrl, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return FALLBACK_RESOURCES;

    const csvText = await response.text();
    const rows = parseCsv(csvText);
    if (rows.length < 2) return FALLBACK_RESOURCES;

    const resources = buildRecords(rows)
      .map((record) => mapRowToResource(record))
      .filter(Boolean);

    return resources.length > 0 ? resources : FALLBACK_RESOURCES;
  } catch {
    return FALLBACK_RESOURCES;
  }
}
