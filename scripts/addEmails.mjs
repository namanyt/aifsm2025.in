import fs from "fs";
import csv from "csv-parser";
import fetch from "node-fetch"; // npm install node-fetch@2

const PB_URL = "http://127.0.0.1:8090";
const ADMIN_EMAIL = "me@ciderboi.xyz";
const ADMIN_PASSWORD = "naman@ciderboi.xyz";
const USERS_CSV = "users.csv";
const USERS_COLLECTION = "users";

async function getAdminToken() {
  const res = await fetch(`${PB_URL}/api/admins/auth-with-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data.token;
}

async function readUsersFromCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          email: row["E-mail ID"]?.split(",")[0].trim(),
          username: row["Username"]?.trim(),
          password: row["Password"]?.trim(),
        });
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

async function createUsers(token, users) {
  const results = { success: [], failed: [] };

  for (const user of users) {
    try {
      const res = await fetch(`${PB_URL}/api/collections/${USERS_COLLECTION}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          passwordConfirm: user.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));

      console.log(`✓ Created user: ${user.username} (${user.email})`);
      results.success.push(user.email);
    } catch (err) {
      console.error(`✗ Failed: ${user.username} (${user.email}):`, err.message);
      results.failed.push({ email: user.email, error: err.message });
    }
  }

  console.log("\n========== SUMMARY ==========");
  console.log(`Total users: ${users.length}`);
  console.log(`Successfully created: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log("Failed users:", results.failed);
  }
}

async function main() {
  const token = await getAdminToken();
  console.log("✅ Admin authenticated, token received");

  const users = await readUsersFromCSV(USERS_CSV);
  await createUsers(token, users);
}

main().catch(console.error);
