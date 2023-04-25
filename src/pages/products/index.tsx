import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function ProductList() {
  return (
    <div>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>商品一覧</h2>
        <ul>
            <li>
                <Link href="/products/smartphone">
                    スマートフォン
                </Link>
            </li>
        </ul>

      </main>
    </div>
  );
}
