import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import path from "path";
import bucketJsonRaw from "@/data/bucket.json";
import { Readable } from "stream";

const serviceKeyPath = path.join(process.cwd(), "dvweb-469712-4f84557634a2.json");

const storage = new Storage({
  keyFilename: serviceKeyPath,
  projectId: "dvweb-469712",
});

export const runtime = "nodejs"; // important pour les streams

function webStreamToNodeStream(webStream: ReadableStream<Uint8Array>) {
  const reader = webStream.getReader();

  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(Buffer.from(value));
      }
    }
  });
}


export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const bucketJson: Record<string, string> = bucketJsonRaw as Record<string, string>;

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const timestamp = Date.now();

    const bucketName = bucketJson[userId];
    const bucket = storage.bucket(bucketName);

    // Convertir Web ReadableStream → Node Readable
    const nodeStream = webStreamToNodeStream(file.stream());

    let uploadStream;
    let uploadName;

    if (file.type.startsWith("image/")) {
        uploadName = `${name}-${timestamp}.webp`;

        uploadStream = bucket.file(uploadName).createWriteStream({
        contentType: "image/webp",
        resumable: false,
        });

        nodeStream.pipe(sharp().webp({ quality: 90 })).pipe(uploadStream);
    } else {
        uploadName = `${name}-${timestamp}`;

        uploadStream = bucket.file(uploadName).createWriteStream({
        contentType: file.type,
        resumable: false,
        });

        nodeStream.pipe(uploadStream);
    }

    await new Promise((resolve, reject) => {
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
    });

    return NextResponse.json({
        success: true,
        message: "Upload réussi",
        file: uploadName,
    });
}


