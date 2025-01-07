import { client } from ".";

async function init() {
  const result = await client.set("name:1", "Prite Dey Srabonti");
  await client.expire("count", 10)
  const mresult = await client.mget(["name:1", "name:2", "user:1", "count"])
  console.log(mresult);
}

init();
