// Copyright 2025 vitech
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  return (
    <div className="font-medium flex items-center h-10">
      {session ? (
        <Button onClick={() => signOut()}>Logout</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Login</Button>
      )}
    </div>
  );
}
