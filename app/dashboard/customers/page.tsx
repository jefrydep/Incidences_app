"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CusomersPage = () => {
  const router = useRouter();
  const [isProtected, setIsProtected] = useState(true);

  // if (isProtected) {
  //   return router.push("/dashboard/home");
  // }

  return <div>CusomersPage</div>;
};

export default CusomersPage;
