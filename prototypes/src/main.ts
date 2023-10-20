import { quote } from "./libs/quote";


async function main() {
  const s = await quote();
  console.log('quote: ', s);
}

main().catch(e => console.log(e))