// 수정, 삭제 드롭다운 메뉴

'use client';

import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function WorkActions({ onEdit, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-gray-500 hover:text-gray-700">
        <MoreVertical className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-[120px] border-[#d4d4d4] bg-white p-0"
      >
        <DropdownMenuItem 
          onClick={onEdit}
          className="cursor-pointer justify-center py-3 text-center text-sm font-medium text-[#737373] focus:text-[#262626]"
        >
          수정하기
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="m-0 bg-[#d4d4d4]" />
        
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer justify-center py-3 text-center text-sm font-medium text-[#737373] focus:text-[#ef4444]"
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}