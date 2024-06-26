import { google } from "googleapis"
import { NextResponse} from "next/server"
import { Readable } from "node:stream"

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log(formData);
  const file: any = formData.get('file');
  const filename: any = formData.get("fileName");
  const fileBuffer = file.stream();

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_SERECT_KEY,
    process.env.GOOGLE_DRIVE_TOKEN_URI
  )
  oauth2Client.setCredentials({refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN})

  const uploadToGooglDrive = async () =>{
    const driveService = google.drive({ version: "v3", auth:oauth2Client });
    const response = await driveService.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: ["1hIfIb-YL7k33UPC9zGskS7u4FK8aF2iJ"]
      },
      media: {
        mimeType : file.type, 
        body:Readable.from(fileBuffer)
      },
      fields: "id",
    });

    return {docId :response.data.id , success : true}
  }
  try {
    const res = await uploadToGooglDrive()
    return NextResponse.json(res);
  } catch (error) {
    console.log("error : " , error);
    return NextResponse.json({success : false})
  }
}