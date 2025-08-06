import { z } from 'zod';
export declare enum QueryFixType {
    QUERY_REWRITE = "query_rewrite",
    INDEX_MISSING = "index_missing"
}
export declare enum QueryFixSeverity {
    CRITICAL = "critical",
    IMPORTANT = "important",
    TO_CONSIDER = "to_consider"
}
export declare const getDatabaseFixesDtoOutSchema: z.ZodObject<{
    fixes: z.ZodArray<z.ZodObject<{
        uuid: z.ZodString;
        createdAt: z.ZodString;
        queryFixType: z.ZodEnum<typeof QueryFixType>;
        fixDescription: z.ZodString;
        severity: z.ZodEnum<typeof QueryFixSeverity>;
        guessMissingIndex: z.ZodNullable<z.ZodObject<{
            indexName: z.ZodString;
            indexDefinition: z.ZodString;
            qsTableName: z.ZodString;
        }, z.core.$strip>>;
        guessQueryRewrite: z.ZodNullable<z.ZodObject<{
            originalQuery: z.ZodString;
            fixedQuery: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const getProjectsDtoOutSchema: z.ZodArray<z.ZodObject<{
    uuid: z.ZodString;
    name: z.ZodString;
    tableNames: z.ZodArray<z.ZodString>;
}, z.core.$strip>>;
export type GetDatabaseFixesDtoOut = z.infer<typeof getDatabaseFixesDtoOutSchema>;
export type GetProjectsDtoOut = z.infer<typeof getProjectsDtoOutSchema>;
export type Project = GetProjectsDtoOut[0];
export type DatabaseFix = GetDatabaseFixesDtoOut['fixes'][0];
export interface QuerysharpConfig {
    apiKey: string;
}
//# sourceMappingURL=types.d.ts.map