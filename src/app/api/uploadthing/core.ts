import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { pinecone } from "@/lib/pinecone";

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {

      const {getUser} = getKindeServerSession()
      const user = await getUser()

      if(!user || !user.id) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          // url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          url: `https://utfs.io/f/${file.key}`,
          uploadStatus: "PROCESSING"
        }
      })
      try {
        const response = await fetch(`https://utfs.io/f/${file.key}`)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)

        const pageLevelDocs = await loader.load()

        const pagesAmt = pageLevelDocs.length

        // vectorixze and index entire doc
        const pineconeIndex = pinecone.Index("corpus")

        const embeddings = new OpenAIEmbeddings({
          apiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
          // batchSize: 512, // Default value if omitted is 512. Max is 2048
          // model: "text-embedding-3-large",
        })

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex,
          namespace: createdFile.id
        })

        await db.file.update({
          data: {
            uploadStatus: "SUCCESS"
          },
          where: {
            id: createdFile.id
          }
        })
      } catch (err) {
        await db.file.update({
          data: {
            uploadStatus: "FAILED"
          },
          where: {
            id: createdFile.id
          }
        })
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
