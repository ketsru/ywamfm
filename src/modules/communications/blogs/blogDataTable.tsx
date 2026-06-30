"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { articles } from "@/components/data/admin/blogs.data";
import { CreateBlogDialog } from "./blogFormDialog";

export function BlogsDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={articles}
      filterColumn="title"
      actions={<CreateBlogDialog />}
    />
  );
}