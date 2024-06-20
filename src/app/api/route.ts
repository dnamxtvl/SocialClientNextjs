import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { execa } from "execa";

export async function GET(req: NextApiRequest) {
  await execa('npx', ['playwright', 'test']);
  // console.log(stdout);
  console.log("testabc");
  // await execa('npx', ['playwright', 'show-report']);

  return NextResponse.json({ message: "OK!" }, { status: 200 });
}
