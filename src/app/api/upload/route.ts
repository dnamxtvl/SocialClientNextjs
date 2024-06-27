import { NextRequest, NextResponse } from "next/server";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ID as string,
  },
});

export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: any = formData.get("file");
    const key = `${`conversation`}/${file.name}`;
    const Body = (await file.arrayBuffer()) as Buffer;
    const response = await s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
console.log("response : " , response);
    return NextResponse.json(response);
  } catch (error) {
    console.log("error : " , error);
    return NextResponse.json({success : false})
  }
}