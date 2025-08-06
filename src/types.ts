import { z } from 'zod';

// Enums for the API
export enum QueryFixType {
  QUERY_REWRITE = 'query_rewrite',
  INDEX_MISSING = 'index_missing',
}

export enum QueryFixSeverity {
  CRITICAL = 'critical',
  IMPORTANT = 'important',
  TO_CONSIDER = 'to_consider',
}

// Zod schemas based on the API DTOs
export const getDatabaseFixesDtoOutSchema = z.object({
  fixes: z.array(
    z.object({
      uuid: z.string(),
      createdAt: z.string(),
      queryFixType: z.nativeEnum(QueryFixType),
      fixDescription: z.string(),
      severity: z.nativeEnum(QueryFixSeverity),
      guessMissingIndex: z
        .object({
          indexName: z.string(),
          indexDefinition: z.string(),
          qsTableName: z.string(),
        })
        .nullable(),
      guessQueryRewrite: z
        .object({
          originalQuery: z.string(),
          fixedQuery: z.string(),
        })
        .nullable(),
    }),
  ),
});

export const getProjectsDtoOutSchema = z.array(
  z.object({
    uuid: z.string(),
    name: z.string(),
    tableNames: z.array(z.string()),
  }),
);

export type GetDatabaseFixesDtoOut = z.infer<
  typeof getDatabaseFixesDtoOutSchema
>;
export type GetProjectsDtoOut = z.infer<typeof getProjectsDtoOutSchema>;
export type Project = GetProjectsDtoOut[0];
export type DatabaseFix = GetDatabaseFixesDtoOut['fixes'][0];

export interface QuerysharpConfig {
  apiKey: string;
}
