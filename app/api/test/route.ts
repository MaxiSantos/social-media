import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
const handler = async function (
  req: Request,
  res: NextResponse<ResponseData>
) {
  const { userId } = await auth();
  console.log({userId})
  console.log("url: "+req.url)
  return NextResponse.json({ status: 'ok' });
}

export { handler as GET };


















