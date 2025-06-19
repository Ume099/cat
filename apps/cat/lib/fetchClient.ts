import createClient, { type Middleware } from "openapi-fetch";
import {
  createQueryHook,
  createImmutableHook,
  createInfiniteHook,
  createMutateHook,
} from "swr-openapi";
import { isMatch } from "lodash-es";
import type { paths } from "@repo/api-contracts/d_calendar_svc/type";
// import { auth } from "./firebase";

// let accessToken: string | undefined = undefined;

// const authMiddleware: Middleware = {
//   async onRequest({ request }) {
//     // FirebaseのIDトークンを取得
//     const user = auth.currentUser;
//     if (user) {
//       try {
//         const idToken = await user.getIdToken();
//         request.headers.set("Authorization", `Bearer ${idToken}`);
//       } catch (error) {
//         console.error("Failed to get ID token:", error);
//         // 認証エラーの場合、リクエストを中断せずに続行
//         // 必要に応じて認証ページにリダイレクトする処理を追加
//       }
//     }
//     return request;
//   },
//   async onResponse({ response }) {
//     if (!response.ok) {
//       // レスポンスが401の場合、認証エラーとして処理
//       if (response.status === 401) {
//         console.error("Authentication failed - redirecting to login");
//         // 必要に応じて認証ページにリダイレクト
//       }

//       // レコメンデーションエンドポイントのエラーの場合、詳細をログ出力
//       if (response.url.includes("/get/recommendation/")) {
//         try {
//           const errorBody = await response.clone().text();
//           console.warn(
//             `Recommendation API Error: ${response.status} ${response.statusText} for ${response.url}`
//           );
//           console.warn(`Error Body:`, errorBody);
//         } catch (err) {
//           console.warn(
//             `Could not read recommendation error response body:`,
//             err
//           );
//         }
//       }

//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//   },
// };

const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
});
// apiClient.use(authMiddleware);

// 実際のリクエストURLには含まれない
const prefix = "my-unique-api";

export const useQuery = createQueryHook(apiClient, prefix); // GET:自動再検証あり
export const useImmutable = createImmutableHook(apiClient, prefix); // GET:自動再検証なし(1回のみ)
export const useInfinite = createInfiniteHook(apiClient, prefix); // GET:無限スクロール
export const useMutate = createMutateHook(
  // POST,PUT,DELETE:キャッシュ更新＋リモート Mutation
  apiClient,
  prefix,
  isMatch // Or any comparision function
);

export default apiClient;
