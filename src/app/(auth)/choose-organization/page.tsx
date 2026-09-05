import { TaskChooseOrganization } from "@clerk/nextjs";
export default function ChooseOrganizationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <TaskChooseOrganization redirectUrlComplete="/" />
    </div>
  );
}
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export default async function ChooseOrganizationPage() {
//   // The session is `pending` while the `choose-organization` task is open, so
//   // opt out of `treatPendingAsSignedOut` to read the real session state here.
//   const { userId, sessionStatus, redirectToSignIn } = await auth({
//     treatPendingAsSignedOut: false,
//   });

//   if (!userId) {
//     return redirectToSignIn();
//   }

//   // `TaskChooseOrganization` throws when there is no pending task, so send
//   // users who already resolved it (or never had one) back to the app.
//   if (sessionStatus !== "pending") {
//     redirect("/");
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <TaskChooseOrganization redirectUrlComplete="/" />
//     </div>
//   );
// }
