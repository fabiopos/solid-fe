"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const capitalizeLinks = true;
const listClasses = "hover:underline mx-2 font-bold";
const activeClasses = "text-primary";

function AppBreadcumbs() {
  const paths = usePathname();

  const pathNames = useMemo(
    () => paths.split("/").filter((path) => path),
    [paths]
  );
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const itemClasses =
              paths === href ? `${listClasses} ${activeClasses}` : listClasses;
            const itemLink = capitalizeLinks
              ? link[0].toUpperCase() + link.slice(1, link.length)
              : link;

            if (itemLink.length > 30) return null;

            return (
              <React.Fragment key={`bc-${index}`}>
                <BreadcrumbItem
                  className={cn("hidden md:block", activeClasses, itemClasses)}
                >
                  <BreadcrumbLink asChild>
                    <Link href={href}>{itemLink}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== pathNames.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            );
          })}

          {/* <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">ui</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>button.tsx</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}

export default AppBreadcumbs;
