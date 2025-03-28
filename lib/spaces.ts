import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "nyc3",
  endpoint: `https://${process.env.DO_SPACE_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY || "",
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY || "",
  },
  forcePathStyle: false,
});

export async function uploadImage(file: File): Promise<string> {
  try {
    const buffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const directory = process.env.DO_SPACE_DIRECTORY || "";
    const key = directory ? `${directory}/${fileName}` : fileName;
    const bucket = process.env.DO_SPACE_BUCKET;

    if (!bucket) {
      throw new Error("DO_SPACE_BUCKET environment variable is not set");
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: file.type,
        ACL: "public-read",
      })
    );

    const cdnUrl = process.env.DO_SPACE_CDN;
    if (!cdnUrl) {
      throw new Error("DO_SPACE_CDN environment variable is not set");
    }

    const finalUrl = `https://${cdnUrl}/${key}`;
    return finalUrl;
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    throw error;
  }
}
