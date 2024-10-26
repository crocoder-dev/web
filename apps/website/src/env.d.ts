/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_TOKEN: string;
  readonly SLACK_CHANNEL: string;
  readonly IS_OFFLINE: string;
  readonly SLACK_BOT_TOKEN: string;
  readonly MENTION_EMAILS: string;
  readonly MENTION_IDS: string;
  readonly NOTION_DATABASE_ID: string;
  readonly UPSTASH_REDIS_REST_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
