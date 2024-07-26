import { NextRequest, NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { io } from "socket.io-client";
import {
  S3Client,
  ListObjectsCommand,
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

export async function POST(req: NextRequest, res: NextApiResponseWithSocket) {
  try {
    const socket = io('http://localhost:3005');
    const formData = await req.formData();
    const files: any = formData.getAll("file");
    const userId: string = formData.get("userId") as string;
    socket.emit("uploadProgress", {message: "uploading ahihi", userId: userId});
    let responses = [];
    for (const file of files) {
      let key = 'conversation/' + file.name + '_' + Date.now();
      let Body = Buffer.from(await file.arrayBuffer());
      let parallelUploads3 = new Upload({
        client: s3,
        queueSize: 4, // optional concurrency configuration
        partSize: 5 * 1024 * 1024, // optional size of each part
        leavePartsOnError: false, // optional manually handle dropped parts
        params: { Bucket, Key: key, Body },
      });
  console.log(parallelUploads3);
      // parallelUploads3.on("httpUploadProgress", async (progress: any) => {
      //   callScoket();
      //   socket.emit("uploadProgress", {message: "uploading ahihi", userId: userId});
      // });
      // let response = await parallelUploads3.done();
      //responses.push(response);
    }
  
    return NextResponse.json([]);
  } catch (error) {
    console.log("error : " , error);
    return NextResponse.json({success : false})
  }
}

export const callScoket = () => {
  console.log('test call socket');
}