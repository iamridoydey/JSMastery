import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function createUser() {
  try {
    await client.user.create({
      data: {
        username: "Prite",
        password: "iamprite",
        age: 25,
        city: "Dhaka",
      },
    });
    console.log("User created successfully.");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function deleteUser() {
  try {
    await client.user.delete({
      where: { username: "Prite" },
      
    });
    console.log("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

async function updateUser() {
  try {
    await client.user.update({
      where: {
        username: "Prite",
      },
      data: {
        username: "iampritedey",
      },
    });
    console.log("User updated successfully.");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function findUser() {
  try {
    const users = await client.user.findMany({
      select: {
        username: true,
        todos: true
      }
    });
    console.log(JSON.stringify(users));
  } catch (error) {
    console.error("Error finding users:", error);
  }
}

// Uncomment the desired function calls to test them out
// createUser();
// deleteUser();
// updateUser();
findUser();
