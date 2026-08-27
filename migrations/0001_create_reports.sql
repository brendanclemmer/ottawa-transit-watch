CREATE TABLE reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  issue_type TEXT NOT NULL,
  route TEXT NOT NULL,
  direction TEXT,
  location TEXT,
  description TEXT NOT NULL,

  verification_level TEXT NOT NULL DEFAULT 'reported',
  moderation_status TEXT NOT NULL DEFAULT 'pending',
  confirmations INTEGER NOT NULL DEFAULT 0,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);