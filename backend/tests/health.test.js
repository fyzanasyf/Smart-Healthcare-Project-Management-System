const request=require("supertest");
const app=require("../server");
test("health endpoint",async()=>{const r=await request(app).get("/api/health");expect(r.statusCode).toBe(200);expect(r.body.ok).toBe(true);});