import React, { useState } from 'react';
import { FileExplorerType } from '@/types/fileExplorer.types';
import { FolderCode, FileCode, ChevronRight, ChevronDown } from 'lucide-react';

const Folder = ({ fileExplorerData }: { fileExplorerData: FileExplorerType }) => {

  const [isExpand, setIsExpand] = useState(true);

  if (fileExplorerData.isFolder) {
    return (
      <div className='cursor-pointer p-1'>
        <div>
          <span 
            className='flex gap-2 hover:underline'
            onClick={() => {setIsExpand(prev => !prev); alert(fileExplorerData.name)}}>
            { isExpand ? <ChevronDown/> : <ChevronRight/>}
            <FolderCode />
            <p className='hover:underline'>
              {fileExplorerData.name}
            </p>
          </span>
          <div className={`${isExpand ? "block" : "hidden"} ml-3 mt-2`}>
            {
              fileExplorerData.items.map((item, i) => {
                return (
                  <Folder key={i} fileExplorerData={item} />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (<div>
      <span className='flex gap-2 ml-9 mt-2 mb-2' onClick={() => alert(fileExplorerData.name)}>
        <FileCode />
        <p className='hover:underline'>
          {fileExplorerData.name}
        </p>
      </span>
    </div>)
  }
}

export default Folder