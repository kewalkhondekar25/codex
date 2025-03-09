import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { fileExplorerData } from "@/utils/data";

// Function to return default content based on file extension
const getFileContent = (fileName: string) => {
  if (fileName.endsWith(".tsx")) return `export default function App() { return <h1>Hello World</h1>; }`;
  if (fileName.endsWith(".ts")) return `export const config = {};`;
  if (fileName.endsWith(".js")) return `module.exports = {};`;
  if (fileName.endsWith(".json")) return `{}`;
  if (fileName.endsWith(".css")) return `body { margin: 0; padding: 0; }`;
  return ""; // Default empty content for other files
};

// Helper function to convert fileExplorerData into Sandpack-compatible format
const convertToSandpackFiles = (node: any, path = ""): Record<string, { code: string }> => {
  let files: Record<string, { code: string }> = {};

  for (const item of node.items) {
    const itemPath = `${path}/${item.name}`;

    if (item.isFolder) {
      files = { ...files, ...convertToSandpackFiles(item, itemPath) }; // Recursively process folders
    } else {
      files[itemPath] = { code: getFileContent(item.name) }; // Use dynamic content based on file type
    }
  }

  return files;
};

// Convert fileExplorerData to Sandpack format
const sandpackFiles = convertToSandpackFiles(fileExplorerData);

const CodeView = () => {
  return (
    <SandpackProvider template="react" theme="dark" files={sandpackFiles}>
      <SandpackLayout>
        <SandpackFileExplorer style={{ height: "80vh" }} />
        <SandpackCodeEditor style={{ height: "80vh" }} />
        {/* <SandpackPreview /> */}
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CodeView;
