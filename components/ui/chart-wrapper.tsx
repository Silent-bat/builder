"use client";

import { ResponsiveContainer } from "recharts";
import { ReactElement } from "react";

interface ChartWrapperProps {
  children: ReactElement;
  className?: string;
}

export function ChartWrapper({ children, className }: ChartWrapperProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {children}
    </ResponsiveContainer>
  );
}
