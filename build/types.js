import { z } from 'zod';
// Enums for the API
export var QueryFixType;
(function (QueryFixType) {
    QueryFixType["QUERY_REWRITE"] = "query_rewrite";
    QueryFixType["INDEX_MISSING"] = "index_missing";
})(QueryFixType || (QueryFixType = {}));
export var QueryFixSeverity;
(function (QueryFixSeverity) {
    QueryFixSeverity["CRITICAL"] = "critical";
    QueryFixSeverity["IMPORTANT"] = "important";
    QueryFixSeverity["TO_CONSIDER"] = "to_consider";
})(QueryFixSeverity || (QueryFixSeverity = {}));
// Zod schemas based on the API DTOs
export const getDatabaseFixesDtoOutSchema = z.object({
    fixes: z.array(z.object({
        uuid: z.string(),
        createdAt: z.string(),
        queryFixType: z.enum(QueryFixType),
        fixDescription: z.string(),
        severity: z.enum(QueryFixSeverity),
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
    })),
});
export const getProjectsDtoOutSchema = z.array(z.object({
    uuid: z.string(),
    name: z.string(),
    tableNames: z.array(z.string()),
}));
//# sourceMappingURL=types.js.map