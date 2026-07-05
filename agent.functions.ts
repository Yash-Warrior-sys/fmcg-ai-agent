import { createServerFn } from "@tanstack/react-start";
import { tool } from "ai";
import { z } from "zod";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const chatWithAgent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    
const { callGroq } = await import("../ai-gateway.server");

    const { filterRows, aggregate, schemaSummary, METRICS } = await import("../fmcg-data.server");

    const schema = schemaSummary();

    const queryTool = tool({
      description:
        "Query the FMCG Beverages weekly x SKU x region dataset. Use this for any factual question about sales, units, promotions, uplift, stock or regions. Returns aggregated rows.",
      inputSchema: z.object({
        filters: z
          .object({
            region: z.string().optional().describe("North, South, East, or West"),
            brand: z.string().optional(),
            sku: z.string().optional().describe("SKU id like SKU-003"),
            category: z.string().optional().describe("CARB_SD, NRG_DRK, JUICE, etc."),
            subCategory: z.string().optional(),
            promoFlag: z.enum(["Y", "N"]).optional(),
            promoName: z.string().optional().describe("e.g. 'B1G1', 'New Year'"),
            weekFrom: z.number().int().optional(),
            weekTo: z.number().int().optional(),
          })
          .optional(),
        groupBy: z
          .array(
            z.enum([
              "Region",
              "Brand Name",
              "Sku Id",
              "Sku Description",
              "Category Code",
              "Sub Category",
              "Promo Name",
              "Promo Mechanic",
              "Week Num",
              "Promo Flag",
            ]),
          )
          .optional(),
        metrics: z
          .array(z.enum(METRICS as unknown as [string, ...string[]]))
          .optional()
          .describe("Defaults to Total Sales Gbp + Total Units"),
        agg: z.enum(["sum", "avg"]).optional(),
        limit: z.number().int().min(1).max(200).optional(),
        sortBy: z.string().optional(),
        sortDir: z.enum(["asc", "desc"]).optional(),
      }),
      execute: async ({ filters, groupBy, metrics, agg, limit, sortBy, sortDir }) => {
        const rows = filterRows(filters ?? {});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result = aggregate(rows, (groupBy ?? []) as any, (metrics as any) ?? ["Total Sales Gbp", "Total Units"], agg ?? "sum");
        if (sortBy) {
          result = [...result].sort((a, b) => {
            const av = Number(a[sortBy as keyof typeof a]) || 0;
            const bv = Number(b[sortBy as keyof typeof b]) || 0;
            return sortDir === "asc" ? av - bv : bv - av;
          });
        }
        if (limit) result = result.slice(0, limit);
        return { rowsScanned: rows.length, resultCount: result.length, result };
      },
    });

    const system = `You are the FMCG Beverages BI Agent for Yash's Data & AI team. You answer business questions about promotions, sales, inventory and regional performance using ONLY the queryFmcg tool against the company's Q1 2024 weekly dataset.

DATASET CONTEXT
- ${schema.rowCount} rows: Weekly x SKU x Region, weeks ${schema.weekRange[0]}-${schema.weekRange[1]} (Q1 2024)
- Regions: ${schema.regions.join(", ")}
- Brands: ${schema.brands.join(", ")}
- Categories: ${schema.categories.join(", ")}
- Promotions: ${schema.promos.join(" | ")}
- Currency: GBP. Stock metrics: Avg Weekly Stock, End Week Stock, Stockout Days, Inv Eff Score (lower = more efficient).

RESPONSE STYLE
- Always call queryFmcg at least once before answering factual questions. Make multiple calls if needed (compare promo vs baseline, region vs region, etc).
- Lead with a direct Yes/No or headline answer in bold.
- Follow with a 2-3 line plain-English summary.
- Include a compact markdown table for figures when relevant.
- End with a one-line recommendation or motivational note for positive results.
- Show a confidence score (e.g. *Confidence: 92%*) — flag for human review if below 75%.
- Be concise. No filler.`;

    const lastMessage = data.messages[data.messages.length - 1].content;
const result = await callGroq(system + "\n\nUser: " + lastMessage);

return {
  text: result,
  steps: 1,
};
  });
