import { NextRequest, NextResponse } from "next/server";
import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

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
    const key = 'conversation/' + file.name + '_' + Date.now();
    const Body = Buffer.from(await file.arrayBuffer());
    // const response = await s3.send(new PutObjectCommand({ Bucket, Key: key, Body }));
    const parallelUploads3 = new Upload({
      client: s3,
      queueSize: 4, // optional concurrency configuration
      partSize: 5 * 1024 * 1024, // optional size of each part
      leavePartsOnError: false, // optional manually handle dropped parts
      params: { Bucket, Key: key, Body },
    });
  
    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });
  
    const response = await parallelUploads3.done();
    return NextResponse.json(response);
  } catch (error) {
    console.log("error : " , error);
    return NextResponse.json({success : false})
  }
}