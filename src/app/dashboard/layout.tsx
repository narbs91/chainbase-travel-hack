"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Dashboard from "./page";
import { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user } = useGlobalContext();
    const router = useRouter();
    useEffect(() => {
        if (!user || Object.keys(user).length == 0) {
          router.push('/login')
        }
      }, []); 


  return (
    <Dashboard />
  );
}
