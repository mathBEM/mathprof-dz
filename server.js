import express from "express";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req,res) => {
  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
  res.json({ ok:true, service:"MathProf DZ", version:"alpha-v7", databaseConfigured:configured });
});

app.get("/api/config-status", (_req,res) => {
  res.json({
    supabaseUrl: Boolean(process.env.SUPABASE_URL),
    supabaseAnonKey: Boolean(process.env.SUPABASE_ANON_KEY),
    serviceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  });
});

app.get("/api/me", (_req,res) => res.status(401).json({authenticated:false}));

app.use(express.static(path.join(__dirname,"public")));
app.get("*splat", (_req,res)=>res.sendFile(path.join(__dirname,"public/index.html")));
app.listen(PORT,()=>console.log(`MathProf DZ listening on ${PORT}`));
