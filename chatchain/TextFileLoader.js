import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";

export const TextFileLoader = new DirectoryLoader(
  "@/transcripts",
  {
    ".txt": (path) => new TextLoader(path),
  }
);
