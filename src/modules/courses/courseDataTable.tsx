"use client";

import { useQuery } from "@tanstack/react-query";

import { columns } from "./columnDef";
import { SharedDataTable } from "@/modules/shared/sharedDataTable";
import { coursMock } from "@/components/data/admin/cours.data";
import { CreateCourseDialog } from "./courseFormDIalog";

export function CourseDataTable () {

  return (
    <SharedDataTable
      columns={columns}
      data={coursMock}
      filterColumn="name"
      actions={<CreateCourseDialog />}
    />
  );
}