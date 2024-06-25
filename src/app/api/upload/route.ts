import { google } from "googleapis"
import { NextResponse} from "next/server"
import { Readable } from "node:stream"

export async function POST(request: Request) {
  console.log("request : " , "ahihihi");
  const formData = await request.formData();
  console.log("da vao dc day");
  const file:any = formData.get('file');
  console.log("file : " , file);
  const filename : any = formData.get("fileName")
  console.log("filename : " , filename);
  const fileBuffer = file.stream();
  

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_SERECT_KEY,
    process.env.GOOGLE_DRIVE_TOKEN_URI
  )
  oauth2Client.setCredentials({refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN})

  // const auth = new google.auth.GoogleAuth({
  //   scopes: "https://www.googleapis.com/auth/drive",
  //   projectId:process.env.GOOGLE_DRIVE_PROJECT_ID,
  //   credentials:{
  //     client_id:process.env.GOOGLE_DRIVE_CLIENT_ID,
  //     client_email: "nam.dovan1@vti.com.vn",
  //     private_key:process.env.GOOGLE_DRIVE_SERECT_KEY
  //   }
  // })

  const uploadToGooglDrive = async()=>{
    const fileMetadata = {
      name: filename,  
      parents: ["1lC8qQ8PB6zCwGhQuO9PT_rmT7Wa2wYP6"], 
    };

    const driveService = google.drive({ version: "v3", auth:oauth2Client });
    const response = await driveService.files.create({
      requestBody: {
        name: "iloveyou_cr7_ahihi.jpg",
        mimeType: '"image/png"'
      },
      media: {
        mimeType : "image/png" , 
        body:Readable.from(fileBuffer)
      },
      fields: "id",
    });
    console.log("res : " , response.data.id);
      return {docId :response.data.id , success : true}
    
  }
  try {
    const res = await uploadToGooglDrive()
    console.log("res : " , res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error : " , error);
    return NextResponse.json({success : false})
  }
}