import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    console.log("ahihi");
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const filePath = files.file.filepath;
      const fileMetadata = {
        name: files.file.originalFilename,
      };
      const media = {
        mimeType: files.file.mimetype,
        body: fs.createReadStream(filePath),
      };

      try {
        const response = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id, webViewLink, webContentLink',
        });

        res.status(200).json({
          fileId: response.data.id,
          webViewLink: response.data.webViewLink,
          webContentLink: response.data.webContentLink,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
