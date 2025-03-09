export interface FileExplorerType {
  id: number;
  name: string;
  isFolder: boolean;
  items: FileExplorerType[]
};
