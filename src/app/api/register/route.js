// import fs from "fs";
// import path from "path";

// export async function POST(request) {
//   const body = await request.json();
//   const name = body.name;
//   const email = body.email;
//   const password = body.password;
//   const confirmPassword = body.confirmPassword;

//   const filePath = path.join(process.cwd(), "data", "users.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const users = JSON.parse(fileData);
//   const userExists = users.find((user) => user.email === email);

//   if (!name || !email || !password || !confirmPassword) {
//     return new Response(
//       JSON.stringify({ message: "All fields are required" }),
//       { status: 400 }
//     );
//   } else if (password !== confirmPassword) {
//     return new Response(JSON.stringify({ message: "Passwords do not match" }), {
//       status: 400,
//     });
//   } else if (userExists) {
//     return new Response(
//       JSON.stringify({ message: "User Already Registered" }),
//       { status: 400 }
//     );
//   }

//   users.push({ name, email, password });

//   fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
//   return new Response(
//     JSON.stringify({ message: "User Registered Successfully" }),
//     { status: 200 }
//   );
// }
