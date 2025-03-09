"use client"

import React, { useState } from 'react'
import Folder from './Folder';
import { fileExplorerData } from '@/utils/data';
import { FileExplorerType } from '@/types/fileExplorer.types';

const Editor = () => {

  const [tree, setTree] = useState<FileExplorerType>(fileExplorerData);
  
  return (
    <div>
      <Folder fileExplorerData={fileExplorerData}/>
    </div>
  )
}

export default Editor