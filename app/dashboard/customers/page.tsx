"use client";
import { useIdeEjeStore } from "@/zustanstore/ideEje/ideEje.store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CusomersPage = () => {
  const router = useRouter();
  const [isProtected, setIsProtected] = useState(true);

  if (isProtected) {
    return router.push("/dashboard/home");
  }
  return <div>CusomersPage</div>;
};

export default CusomersPage;
